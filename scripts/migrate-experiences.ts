import fs from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../src/sanity/env";
import { experiences } from "../src/lib/experiences";

const writeToken = process.env.SANITY_API_WRITE_TOKEN;
if (!writeToken) {
    throw new Error("SANITY_API_WRITE_TOKEN is not set — check .env.local.");
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: writeToken,
    useCdn: false,
});

type LocaleJson = Record<string, unknown>;

function readMessages(locale: string): LocaleJson {
    const filePath = path.join(process.cwd(), "messages", `${locale}.json`);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function get(obj: unknown, ...keys: string[]): string {
    let current: unknown = obj;
    for (const key of keys) {
        current = (current as Record<string, unknown> | undefined)?.[key];
    }
    return typeof current === "string" ? current : "";
}

function getArray(obj: unknown, ...keys: string[]): string[] {
    let current: unknown = obj;
    for (const key of keys) {
        current = (current as Record<string, unknown> | undefined)?.[key];
    }
    return Array.isArray(current) ? current.filter((v) => typeof v === "string") : [];
}

async function uploadImageFromUrl(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${url} (${res.status})`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const filename = path.basename(new URL(url).pathname) || "image.jpg";
    const asset = await client.assets.upload("image", buffer, { filename });
    return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function migrate() {
    const en = readMessages("en");
    const ru = readMessages("ru");
    const de = readMessages("de");

    for (const experience of experiences) {
        const docId = `experience-${experience.slug}`;
        const existing = await client.fetch(`*[_id == $id][0]{_id}`, { id: docId });
        if (existing) {
            console.log(`Skipping (already migrated): ${experience.slug}`);
            continue;
        }

        console.log(`Migrating: ${experience.slug}`);

        const image = await uploadImageFromUrl(experience.image);
        const detailImage = await uploadImageFromUrl(experience.detailImage);

        const enHighlights = getArray(en, "experiences", "items", experience.key, "highlights");
        const ruHighlights = getArray(ru, "experiences", "items", experience.key, "highlights");
        const deHighlights = getArray(de, "experiences", "items", experience.key, "highlights");

        const highlights = enHighlights.map((_, i) => ({
            _type: "localeString",
            _key: `highlight-${i}`,
            en: enHighlights[i] ?? "",
            ru: ruHighlights[i] ?? "",
            de: deHighlights[i] ?? "",
        }));

        const doc = {
            _id: docId,
            _type: "experience",
            title: {
                en: get(en, "experiences", "items", experience.key, "title"),
                ru: get(ru, "experiences", "items", experience.key, "title"),
                de: get(de, "experiences", "items", experience.key, "title"),
            },
            slug: { _type: "slug", current: experience.slug },
            description: {
                en: get(en, "experiences", "items", experience.key, "description"),
                ru: get(ru, "experiences", "items", experience.key, "description"),
                de: get(de, "experiences", "items", experience.key, "description"),
            },
            duration: {
                en: get(en, "experiences", "items", experience.key, "duration"),
                ru: get(ru, "experiences", "items", experience.key, "duration"),
                de: get(de, "experiences", "items", experience.key, "duration"),
            },
            location: {
                en: get(en, "experiences", "items", experience.key, "location"),
                ru: get(ru, "experiences", "items", experience.key, "location"),
                de: get(de, "experiences", "items", experience.key, "location"),
            },
            highlights,
            featured: experience.featured ?? false,
            storyOpening: {
                en: get(en, "experiences", "items", experience.key, "storyOpening"),
                ru: get(ru, "experiences", "items", experience.key, "storyOpening"),
                de: get(de, "experiences", "items", experience.key, "storyOpening"),
            },
            storyQuote: {
                en: get(en, "experiences", "items", experience.key, "storyQuote"),
                ru: get(ru, "experiences", "items", experience.key, "storyQuote"),
                de: get(de, "experiences", "items", experience.key, "storyQuote"),
            },
            storyClosing: {
                en: get(en, "experiences", "items", experience.key, "storyClosing"),
                ru: get(ru, "experiences", "items", experience.key, "storyClosing"),
                de: get(de, "experiences", "items", experience.key, "storyClosing"),
            },
            image,
            detailImage,
        };

        await client.createOrReplace(doc);
        console.log(`  done: ${highlights.length} highlights`);
    }

    console.log("Migration complete.");
    console.log(
        "NOTE: storyOpening text was migrated as-is from messages/en.json, which is missing its first letter on every entry (leftover from a drop-cap CSS treatment) — fix in Studio, not here."
    );
}

migrate().catch((err) => {
    console.error(err);
    process.exit(1);
});