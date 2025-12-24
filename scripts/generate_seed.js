import fs from 'fs';

async function generate() {
    console.log("Fetching cards...");
    try {
        const res = await fetch('https://digimoncard.io/api-public/search.php?pack=BT-01');
        const data = await res.json();

        if (!Array.isArray(data)) {
            console.error("API returned non-array:", data);
            return;
        }

        console.log(`Found ${data.length} cards.`);

        const cards = data.map(c => ({
            id: c.id,
            name: c.name || 'Unknown',
            rarity: c.rarity || 'C',
            setName: 'BT-01: Booster New Evolution', // Exact name requested 
            imageUrl: `https://digicartas.click/cards/${c.id}.webp`
        }));

        const rarityMap = {
            'Common': 'C',
            'Uncommon': 'U',
            'Rare': 'R',
            'Super Rare': 'SR',
            'Secret Rare': 'SEC',
            'Promo': 'P'
        };

        cards.forEach(c => {
            if (rarityMap[c.rarity]) c.rarity = rarityMap[c.rarity];
        });

        const fileContent = `import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const cards = ${JSON.stringify(cards, null, 2)};

async function main() {
    console.log('Seeding ' + cards.length + ' cards...');
    
    for (const card of cards) {
        // Validation check before insert
        if(!card.id || !card.name) {
             console.warn('Skipping invalid card:', card);
             continue;
        }

        await prisma.card.upsert({
            where: { id: card.id },
            update: {
                name: card.name,
                rarity: card.rarity,
                setName: card.setName,
                imageUrl: card.imageUrl
            },
            create: {
                id: card.id,
                name: card.name,
                rarity: card.rarity,
                setName: card.setName,
                imageUrl: card.imageUrl
            }
        });
    }
    console.log('Seeding completed.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
`;

        fs.writeFileSync('prisma/seed.js', fileContent);
        console.log("prisma/seed.js generated!");

    } catch (e) {
        console.error("Error:", e);
    }
}

generate();
