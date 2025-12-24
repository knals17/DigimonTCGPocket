import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/status', authenticateToken, async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.sendStatus(404);

    const now = new Date();
    const lastOpen = user.lastPackOpen ? new Date(user.lastPackOpen) : new Date(0);
    const diff = now - lastOpen;
    const hours = diff / (1000 * 60 * 60);

    res.json({
        canOpen: hours >= 12,
        nextOpen: user.lastPackOpen ? new Date(lastOpen.getTime() + 12 * 60 * 60 * 1000) : null
    });
});

router.post('/open', authenticateToken, async (req, res) => {
    const { expansion } = req.body;

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const now = new Date();
    const lastOpen = user.lastPackOpen ? new Date(user.lastPackOpen) : new Date(0);
    const diff = now - lastOpen;

    if (diff < 12 * 60 * 60 * 1000) {
        // Dev backdoor for testing? No, stick to rules.
        return res.status(403).json({ error: 'Wait for cooldown' });
    }

    const allCards = await prisma.card.findMany({
        where: { setName: { contains: expansion || "BT-01" } }
    });

    if (allCards.length === 0) return res.status(500).json({ error: 'No cards found in DB' });

    const pack = [];
    for (let i = 0; i < 6; i++) {
        pack.push(pickRandomCard(allCards));
    }

    // Check which cards are new (user didn't have them before)
    const userCards = await prisma.userCard.findMany({
        where: {
            userId: user.id,
            cardId: { in: pack.map(c => c.id) }
        }
    });

    const userCardMap = new Map(userCards.map(uc => [uc.cardId, uc.count]));

    await prisma.$transaction(async (tx) => {
        for (const card of pack) {
            await tx.userCard.upsert({
                where: { userId_cardId: { userId: user.id, cardId: card.id } },
                update: { count: { increment: 1 } },
                create: { userId: user.id, cardId: card.id, count: 1 }
            });
        }
        await tx.user.update({
            where: { id: user.id },
            data: { lastPackOpen: now }
        });
    });

    // Mark cards as new if user didn't have them before
    const cardsWithNewFlag = pack.map(card => ({
        ...card,
        isNew: !userCardMap.has(card.id) || userCardMap.get(card.id) === 0
    }));

    res.json({ cards: cardsWithNewFlag });
});

function pickRandomCard(cards) {
    const rand = Math.random();
    let rarity = 'C';
    // Adjust these weights as per "Pokemon TCG Pocket" feel
    if (rand > 0.999) rarity = 'SEC';
    else if (rand > 0.96) rarity = 'SR';
    else if (rand > 0.85) rarity = 'R';
    else if (rand > 0.60) rarity = 'U';

    const candidates = cards.filter(c => c.rarity === rarity);

    // Determine fallback logic if no cards of that rarity exist in the set
    if (candidates.length === 0) {
        // Fallback to random card from set
        return cards[Math.floor(Math.random() * cards.length)];
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
}

export default router;
