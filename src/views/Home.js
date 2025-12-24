import { request, getCurrentUser } from '../api.js';

export default async function Home() {
    const container = document.createElement('div');
    const user = getCurrentUser();

    // Fetch Data
    let statusData, collectionData, tradesData;
    try {
        [statusData, collectionData, tradesData] = await Promise.all([
            request('/packs/status'),
            request('/collection?expansion=BT-01'),
            request('/trades')
        ]);
    } catch (e) {
        container.innerHTML = `<div class="error">Failed to load data: ${e.message}</div>`;
        return container;
    }

    const totalCards = collectionData.length > 0 ? collectionData.length : 1;
    const ownedCards = collectionData.filter(c => c.count > 0).length;

    // Count pending trade proposals
    const incomingProposals = tradesData.filter(t => t.receiverId === user.id && t.status === 'PENDING');
    const responsesToReview = tradesData.filter(t => t.senderId === user.id && t.status === 'RESPONDED');
    const pendingCount = incomingProposals.length + responsesToReview.length;

    container.innerHTML = `
        <div class="header">
            <div class="user-info">Hi, ${user.username}</div>
             <button onclick="localStorage.removeItem('token');location.reload()" style="width: auto; padding: 5px 10px; font-size: 0.8rem;">Logout</button>
        </div>
        
        ${pendingCount > 0 ? `
            <div onclick="sessionStorage.setItem('openActiveTrades', 'true'); window.location.hash='#/trade';" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px; border-radius: 12px; margin-bottom: 20px; cursor: pointer; border: 2px solid var(--accent); box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="background: var(--accent); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                        🔔
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: bold; font-size: 1rem; margin-bottom: 3px;">Trade Proposals</div>
                        <div style="font-size: 0.85rem; opacity: 0.9;">You have ${pendingCount} pending trade${pendingCount > 1 ? 's' : ''}</div>
                    </div>
                    <div style="background: #ff4757; color: white; padding: 5px 12px; border-radius: 20px; font-weight: bold; font-size: 0.9rem;">
                        ${pendingCount}
                    </div>
                </div>
            </div>
        ` : ''}
        
        <div class="section-title" style="margin-bottom: 20px;">Daily Pack (BT-01)</div>
        <div class="pack-container" style="display: flex; justify-content: center; min-height: 350px; align-items: center; ">
             ${renderPackSection(statusData)}
        </div>
        
        <div class="section-title" style="margin-top: 30px;">Collection Progress (BT-01)</div>
        <div class="collection-stats">
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span>Completed</span>
                <span style="color: var(--accent); font-weight:bold;">${Math.round((ownedCards / totalCards) * 100)}%</span>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin:0 0 10px 0;">${ownedCards} / ${totalCards} Cards</p>
            <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow:hidden;">
                <div style="width: ${(ownedCards / totalCards) * 100}%; background: var(--accent); height: 100%; border-radius: 4px;"></div>
            </div>
        </div>
    `;

    const packDiv = container.querySelector('#pack-trigger');
    if (packDiv) {
        packDiv.addEventListener('click', () => openPack());
    }

    return container;
}

function renderPackSection(status) {
    if (status.canOpen) {
        return `
            <div id="pack-trigger" style="display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.3s;">
                <img src="https://digicartas.click/sobre/BT-01.png" 
                     style="width: 100%; max-width: 250px; height: auto; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.6)); transition: transform 0.3s;" 
                     alt="BT-01 Pack"
                     onmouseover="this.style.transform='translateY(-10px) scale(1.05)'"
                     onmouseout="this.style.transform='translateY(0) scale(1)'">
                <div style="font-weight: bold; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.8); margin-top: 20px; font-size: 1.2rem;">OPEN PACK</div>
                <div style="font-size: 0.9rem; color: rgba(255,255,255,0.9); margin-top: 5px;">BT-01 Booster</div>
            </div>
        `;
    } else {
        const next = new Date(status.nextOpen);
        return `
            <div style="display: flex; flex-direction: column; align-items: center; opacity: 0.5;">
                <img src="https://digicartas.click/sobre/BT-01.png" 
                     style="width: 100%; max-width: 250px; height: auto; filter: grayscale(100%);" 
                     alt="BT-01 Pack">
                <div style="margin-top: 20px; font-size: 0.9rem; color: #fff;">Available at</div>
                <div style="font-weight: bold; font-size: 1.2rem; color: #fff;">${next.toLocaleTimeString()}</div>
            </div>
        `;
    }
}

async function openPack() {
    try {
        const data = await request('/packs/open', {
            method: 'POST',
            body: JSON.stringify({ expansion: 'BT-01' })
        });
        showRevealAnimation(data.cards);
    } catch (e) {
        alert(e.message);
    }
}

function showRevealAnimation(cards) {
    const overlay = document.createElement('div');
    overlay.className = 'pack-opening-scene';

    overlay.innerHTML = `
        <h2 style="color: white; margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 2px;">Pack Opened!</h2>
        <div class="revealed-cards" style="flex-wrap: wrap; gap: 10px; justify-content: center; max-width: 800px;"></div>
        <button id="close-reveal" style="margin-top: 2rem; width: auto; min-width: 150px;">Collect Cards</button>
    `;

    document.body.appendChild(overlay);

    const grid = overlay.querySelector('.revealed-cards');

    // Sort logic? Common first?
    // User wants "ordenadas desde la más común a la más rara". 
    // Rarity order: C < U < R < SR < SEC
    const rarityOrder = { 'C': 1, 'U': 2, 'R': 3, 'SR': 4, 'SEC': 5 };
    cards.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);

    cards.forEach((card, i) => {
        const el = document.createElement('div');
        el.className = 'card-reveal';
        el.style.position = 'relative';

        // Use placeholder if no image
        const imgUrl = card.imageUrl || 'https://via.placeholder.com/150x200?text=Card';
        el.style.backgroundImage = `url('${imgUrl}')`;
        el.style.animationDelay = `${i * 0.1}s`;

        let borderColor = '#444';
        if (card.rarity === 'SR') borderColor = '#FFD700';
        if (card.rarity === 'SEC') borderColor = '#00d2ff';
        el.style.border = `2px solid ${borderColor}`;

        // Add NEW badge if card is new
        if (card.isNew) {
            const newBadge = document.createElement('div');
            newBadge.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.7rem;
                font-weight: bold;
                text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                box-shadow: 0 2px 8px rgba(255,107,107,0.6);
                animation: pulse 1.5s infinite;
            `;
            newBadge.textContent = 'NEW';
            el.appendChild(newBadge);
        }

        grid.appendChild(el);
    });

    overlay.querySelector('#close-reveal').addEventListener('click', () => {
        overlay.remove();
        window.location.reload();
    });
}
