import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    const { expansion } = req.query;

    const targetUserId = req.query.userId ? parseInt(req.query.userId) : req.user.id;

    const allCards = await prisma.card.findMany({
        where: { setName: { contains: expansion || "BT-01" } },
        orderBy: { id: 'asc' }
    });

    const userCards = await prisma.userCard.findMany({
        where: {
            userId: targetUserId,
            card: { setName: { contains: expansion || "BT-01" } }
        }
    });

    const result = allCards.map(c => {
        const owned = userCards.find(uc => uc.cardId === c.id);
        return {
            ...c,
            count: owned ? owned.count : 0
        };
    });

    res.json(result);
});

export default router;
