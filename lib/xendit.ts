import { env } from "@/lib/env";

export const XENDIT_BASE_URL = "https://api.xendit.co/v2/invoices";

export const XENDIT_HEADERS = {
  Authorization: `Basic ${Buffer.from(env.XENDIT_API_KEY + ":").toString(
    "base64"
  )}`,
  "Content-Type": "application/json",
};
