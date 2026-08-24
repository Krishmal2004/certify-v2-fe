/**
 * authFetch – a thin wrapper around fetch() that automatically attaches
 * the `Authorization: Bearer <token>` header using the JWT stored in
 * accounts.sliitmozilla.org's localStorage (key: "token").
 *
 * Because the accounts site and certify share the sliitmozilla.org domain,
 * the token is accessible via localStorage if the apps share origin. In
 * cross-origin cases (e.g. localhost dev), falls back to null (no token sent).
 *
 * Usage:
 *   import authFetch from "@/lib/authFetch";
 *   const res = await authFetch("/admin/add/badge", { method: "POST", body: ... });
 */

const TOKEN_KEY = "certify_token";

function getToken(): string | null {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}

export default function authFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = getToken();

    const headers = new Headers(options.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    // Don't override Content-Type when sending FormData (browser sets it with boundary)
    if (!(options.body instanceof FormData)) {
        if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
        }
    }

    return fetch(url, { ...options, headers });
}
