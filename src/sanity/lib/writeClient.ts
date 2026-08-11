import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const writeToken = process.env.SANITY_API_WRITE_TOKEN;
if (!writeToken) {
    throw new Error("SANITY_API_WRITE_TOKEN is not set — check .env.local.");
}

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token: writeToken,
    useCdn: false,
});