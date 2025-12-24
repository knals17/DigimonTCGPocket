import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    const trades = await prisma.trade.findMany({
        where: {
            OR: [
                { senderId: req.user.id },
                { receiverId: req.user.id }
            ]
        },
        include: { sender: true, receiver: true, offeredCard: true, respondedCard: true },
        orderBy: { updatedAt: 'desc' }
    });
    res.json(trades);
});

router.post('/propose', authenticateToken, async (req, res) => {
    const { receiverId, offeredCardId } = req.body;

    const pendingCount = await prisma.trade.count({
        where: { receiverId, status: 'PENDING' }
    });
    if (pendingCount >= 3) return res.status(400).json({ error: 'User has max pending trades' });

    const owned = await prisma.userCard.findUnique({
        where: { userId_cardId: { userId: req.user.id, cardId: offeredCardId } }
    });
    if (!owned || owned.count < 1) return res.status(400).json({ error: "You don't own this card" });

    await prisma.trade.create({
        data: {
            senderId: req.user.id,
            receiverId,
            offeredCardId,
            status: 'PENDING'
        }
    });

    res.json({ message: 'Trade sent' });
});

router.post('/respond', authenticateToken, async (req, res) => {
    const { tradeId, responseCardId, reject } = req.body;

    const trade = await prisma.trade.findUnique({ where: { id: tradeId }, include: { offeredCard: true } });
    if (!trade || trade.receiverId !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

    if (reject) {
        await prisma.trade.update({ where: { id: tradeId }, data: { status: 'REJECTED' } });
        return res.json({ message: 'Trade rejected' });
    }

    const responseCard = await prisma.card.findUnique({ where: { id: responseCardId } });
    if (responseCard.rarity !== trade.offeredCard.rarity) return res.status(400).json({ error: 'Rarity mismatch' });

    const owned = await prisma.userCard.findUnique({
        where: { userId_cardId: { userId: req.user.id, cardId: responseCardId } }
    });

    // Prompt: "con un mayor a 1 unidad".
    if (!owned || owned.count <= 1) return res.status(400).json({ error: "Need duplicate to trade" });

    await prisma.trade.update({
        where: { id: tradeId },
        data: {
            respondedCardId: responseCardId,
            status: 'RESPONDED'
        }
    });

    res.json({ message: 'Response sent' });
});

router.post('/finalize', authenticateToken, async (req, res) => {
    const { tradeId, accept } = req.body;
    const trade = await prisma.trade.findUnique({ where: { id: tradeId } });
    if (!trade || trade.senderId !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
    if (trade.status !== 'RESPONDED') return res.status(400).json({ error: 'Invalid trade status' });

    if (accept) {
        try {
            await prisma.$transaction([
                prisma.userCard.update({ where: { userId_cardId: { userId: trade.senderId, cardId: trade.offeredCardId } }, data: { count: { decrement: 1 } } }),
                prisma.userCard.upsert({ where: { userId_cardId: { userId: trade.receiverId, cardId: trade.offeredCardId } }, create: { userId: trade.receiverId, cardId: trade.offeredCardId, count: 1 }, update: { count: { increment: 1 } } }),

                prisma.userCard.update({ where: { userId_cardId: { userId: trade.receiverId, cardId: trade.respondedCardId } }, data: { count: { decrement: 1 } } }),
                prisma.userCard.upsert({ where: { userId_cardId: { userId: trade.senderId, cardId: trade.respondedCardId } }, create: { userId: trade.senderId, cardId: trade.respondedCardId, count: 1 }, update: { count: { increment: 1 } } }),

                prisma.trade.update({ where: { id: tradeId }, data: { status: 'ACCEPTED' } })
            ]);
            res.json({ message: 'Trade completed' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Trade failed (Card counts changed?)' });
        }
    } else {
        await prisma.trade.update({ where: { id: tradeId }, data: { status: 'REJECTED' } });
        res.json({ message: 'Trade rejected' });
    }
});

export default router;
