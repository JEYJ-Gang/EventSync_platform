import { verifyToken } from "./jwt";

export async function verifyAdminToken(request) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== "ADMIN") {
        return null;
    }

    return decoded;
}