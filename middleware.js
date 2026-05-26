import { createHash, timingSafeEqual } from "node:crypto";
import { next } from "@vercel/functions";

const USERNAME_HASH = "76b51942104838b84503afad9a86bf161ccb01e9197eb2efd545cf1fa628c7aa";
const PASSWORD_HASH = "bf66525e272bb68ec6047257b4e7456e2c99e5cbf680274a51596963a56c21d5";

export const config = {
    matcher: "/bs-admin/:path*",
    runtime: "nodejs",
};

function sha256(value) {
    return createHash("sha256").update(value).digest();
}

function matchesHash(value, expectedHex) {
    const actual = sha256(value);
    const expected = Buffer.from(expectedHex, "hex");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function unauthorized() {
    return new Response("Authentication required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="BlackStack Admin"',
            "Cache-Control": "no-store",
        },
    });
}

export default function middleware(request) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return unauthorized();
    }

    let decoded = "";
    try {
        decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
    } catch (error) {
        return unauthorized();
    }

    const separatorIdx = decoded.indexOf(":");
    if (separatorIdx === -1) {
        return unauthorized();
    }

    const username = decoded.slice(0, separatorIdx);
    const password = decoded.slice(separatorIdx + 1);

    if (!matchesHash(username, USERNAME_HASH) || !matchesHash(password, PASSWORD_HASH)) {
        return unauthorized();
    }

    return next({
        headers: {
            "Cache-Control": "no-store",
            "X-Robots-Tag": "noindex, nofollow",
        },
    });
}
