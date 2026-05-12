import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
}

export function generateToken(organizer) {
    return jwt.sign(
        {
            id: organizer.id,
            email: organizer.email,
            role: organizer.role,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
    );
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        console.error("JWT VERIFY ERROR:", err.message);
        throw err;
    }
}