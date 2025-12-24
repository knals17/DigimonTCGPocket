import { request } from '../api.js';

export default async function Library() {
    const container = document.createElement('div');

    let cards = [];
    try {
        cards = await request('/collection?expansion=BT-01');
    } catch (e) {
        container.innerHTML = `<div class="error">${e.message}</div>`;
        return container;
    }

    container.innerHTML = `
        <div class="header">
            <div class="section-title" style="margin-bottom:0;">Library</div>
        </div>
        
        <div class="tabs">
            <div class="tab active">BT-01</div>
            <div class="tab" style="opacity:0.5; cursor: default;">BT-02</div>
        </div>
        
        <div class="card-grid" style="padding-bottom: 20px;">
            ${cards.map(renderCard).join('')}
        </div>
    `;

    // Attach event listeners
    container.querySelectorAll('.card-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            const card = cards.find(c => c.id === id);
            if (card) showCardDetails(card);
        });
    });

    return container;
}

function renderCard(card) {
    const isMissing = card.count === 0;
    const imgUrl = card.imageUrl || 'https://via.placeholder.com/150x200?text=?';

    return `
        <div class="card-item ${isMissing ? 'missing' : ''}" data-id="${card.id}">
             <img src="${imgUrl}" loading="lazy" alt="${card.name}">
             ${!isMissing ? `<div class="card-badge">x${card.count}</div>` : ''}
        </div>
    `;
}

function showCardDetails(card) {
    const overlay = document.createElement('div');
    overlay.className = 'pack-opening-scene'; // Reuse existing overlay style
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.backdropFilter = 'blur(5px)';

    // Determine color based on rarity
    let color = '#fff';
    if (card.rarity === 'SR') color = '#FFD700';
    if (card.rarity === 'SEC') color = '#00d2ff';
    if (card.rarity === 'R') color = '#aaa';

    overlay.innerHTML = `
        <div style="position: relative; max-width: 90%; width: 350px; background: #1a1a2e; border: 1px solid #444; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            <button id="close-modal" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">&times;</button>
            
            <div style="width: 200px; aspect-ratio: 2.5/3.5; margin-bottom: 20px; border-radius: 10px; overflow: hidden; border: 2px solid ${color}; box-shadow: 0 0 20px ${color}40;">
                 <img src="${card.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            
            <h2 style="color: ${color}; margin: 0 0 5px 0; text-align: center;">${card.name}</h2>
            <div style="color: #888; font-size: 0.9rem; margin-bottom: 15px;">${card.id}</div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; text-align: center;">
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                    <div style="font-size: 0.8rem; color: #888;">Rarity</div>
                    <div style="font-weight: bold;">${card.rarity}</div>
                </div>
                 <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                    <div style="font-size: 0.8rem; color: #888;">Owned</div>
                    <div style="font-weight: bold;">${card.count}</div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Close handlers
    const close = () => overlay.remove();
    overlay.querySelector('#close-modal').addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
}
