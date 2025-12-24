import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    const friends = await prisma.friendship.findMany({
        where: {
            OR: [
                { senderId: req.user.id, status: 'ACCEPTED' },
                { receiverId: req.user.id, status: 'ACCEPTED' }
            ]
        },
        include: { sender: true, receiver: true }
    });

    const list = friends.map(f => {
        return f.senderId === req.user.id ? f.receiver : f.sender;
    });

    res.json(list.map(u => ({ id: u.id, username: u.username })));
});

router.get('/requests', authenticateToken, async (req, res) => {
    const requests = await prisma.friendship.findMany({
        where: { receiverId: req.user.id, status: 'PENDING' },
        include: { sender: true }
    });
    res.json(requests.map(r => ({ id: r.id, sender: { id: r.sender.id, username: r.sender.username } })));
});

router.post('/request', authenticateToken, async (req, res) => {
    const { username } = req.body;
    const target = await prisma.user.findUnique({ where: { username } });

    if (!target) return res.status(404).json({ error: 'User not found' });
    if (target.id === req.user.id) return res.status(400).json({ error: 'Cannot add self' });

    const existing = await prisma.friendship.findFirst({
        where: {
            OR: [
                { senderId: req.user.id, receiverId: target.id },
                { senderId: target.id, receiverId: req.user.id }
            ]
        }
    });

    if (existing) return res.status(400).json({ error: 'Request/Friendship already exists' });

    await prisma.friendship.create({
        data: {
            senderId: req.user.id,
            receiverId: target.id,
            status: 'PENDING'
        }
    });

    res.json({ message: 'Request sent' });
});

router.post('/respond', authenticateToken, async (req, res) => {
    const { requestId, accept } = req.body;

    const friendship = await prisma.friendship.findUnique({ where: { id: requestId } });
    if (!friendship || friendship.receiverId !== req.user.id) return res.status(403).json({ error: 'Invalid request' });

    if (accept) {
        await prisma.friendship.update({
            where: { id: requestId },
            data: { status: 'ACCEPTED' }
        });
        res.json({ message: 'Accepted' });
    } else {
        await prisma.friendship.delete({ where: { id: requestId } });
        res.json({ message: 'Rejected' });
    }
});

export default router;
