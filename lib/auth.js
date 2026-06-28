import { verifyToken } from '@/lib/jwt';

export async function verifyAdminToken(request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        if (!decoded || decoded.role !== 'admin') return null;
        return decoded;
    } catch {
        return null;
    }
}