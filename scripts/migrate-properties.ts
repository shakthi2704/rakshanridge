import fs from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../src/sanity/env";
import { properties } from "../src/lib/properties";

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

function slugifyRoomKey(key: string): string {
    return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

async function uploadImage(localPath: string) {
    const absolutePath = path.join(process.cwd(), "public", localPath.replace(/^\//, ""));
    const buffer = fs.readFileSync(absolutePath);
    const asset = await client.assets.upload("image", buffer, {
        filename: path.basename(absolutePath),
    });
    return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function migrate() {
    const en = readMessages("en");
    const ru = readMessages("ru");
    const de = readMessages("de");

    for (const property of properties) {
        console.log(`Migrating: ${property.slug}`);

        const heroImage = await uploadImage(property.image);
        const gallery = [];
        for (let i = 0; i < property.gallery.length; i++) {
            const image = await uploadImage(property.gallery[i]);
            gallery.push({ ...image, _key: `gallery-${i}` });
        }

        const rooms = [];
        for (const room of property.rooms) {
            rooms.push({
                _type: "room",
                _key: room.key,
                name: {
                    en: get(en, "properties", "items", property.key, "rooms", room.key, "name"),
                    ru: get(ru, "properties", "items", property.key, "rooms", room.key, "name"),
                    de: get(de, "properties", "items", property.key, "rooms", room.key, "name"),
                },
                slug: { _type: "slug", current: slugifyRoomKey(room.key) },
                description: {
                    en: get(en, "properties", "items", property.key, "rooms", room.key, "description"),
                    ru: get(ru, "properties", "items", property.key, "rooms", room.key, "description"),
                    de: get(de, "properties", "items", property.key, "rooms", room.key, "description"),
                },
                longDescription: {
                    en: get(en, "properties", "items", property.key, "rooms", room.key, "longDescription"),
                    ru: get(ru, "properties", "items", property.key, "rooms", room.key, "longDescription"),
                    de: get(de, "properties", "items", property.key, "rooms", room.key, "longDescription"),
                },
                occupancy: room.occupancy,
                sizeSqm: room.sizeSqm,
                beds: room.beds,
                bathrooms: room.bathrooms,
                priceFrom: room.priceFrom,
            });
        }

        const doc = {
            _id: `property-${property.slug}`,
            _type: "property",
            name: {
                en: get(en, "properties", "items", property.key, "name"),
                ru: get(ru, "properties", "items", property.key, "name"),
                de: get(de, "properties", "items", property.key, "name"),
            },
            slug: { _type: "slug", current: property.slug },
            tagline: {
                en: get(en, "properties", "items", property.key, "tagline"),
                ru: get(ru, "properties", "items", property.key, "tagline"),
                de: get(de, "properties", "items", property.key, "tagline"),
            },
            location: {
                en: get(en, "properties", "items", property.key, "location"),
                ru: get(ru, "properties", "items", property.key, "location"),
                de: get(de, "properties", "items", property.key, "location"),
            },
            description: {
                en: get(en, "properties", "items", property.key, "description"),
                ru: get(ru, "properties", "items", property.key, "description"),
                de: get(de, "properties", "items", property.key, "description"),
            },
            type: property.type,
            region: property.region,
            priceFrom: property.priceFrom,
            address: property.address,
            amenityKeys: property.amenityKeys,
            featured: property.featured ?? false,
            heroImage,
            gallery,
            rooms,
        };

        await client.createOrReplace(doc);
        console.log(`  done: ${rooms.length} rooms, ${gallery.length} gallery images`);
    }

    console.log("Migration complete.");
}

migrate().catch((err) => {
    console.error(err);
    process.exit(1);
});