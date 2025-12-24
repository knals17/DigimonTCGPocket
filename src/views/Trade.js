import { request, getCurrentUser } from '../api.js';

export default async function Trade() {
    const container = document.createElement('div');
    const user = getCurrentUser();

    let friends, requests, trades;
    try {
        [friends, requests, trades] = await Promise.all([
            request('/friends'),
            request('/friends/requests'),
            request('/trades')
        ]);
    } catch (e) {
        container.innerHTML = `<div class="error">Error loading trade data</div>`;
        return container;
    }

    const incomingProposals = trades.filter(t => t.receiverId === user.id && t.status === 'PENDING');
    const responsesToReview = trades.filter(t => t.senderId === user.id && t.status === 'RESPONDED');
    const activeSent = trades.filter(t => t.senderId === user.id && t.status === 'PENDING');

    container.innerHTML = `
        <div class="header">
            <div class="section-title" style="margin-bottom:0;">Trade</div>
             <button id="add-friend-btn" style="width:auto; padding: 8px 12px; font-size:0.8rem;">+ Add Friend</button>
        </div>
        
        ${requests.length > 0 ? `
            <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; margin: 10px 0;">
                <h4 style="margin: 0 0 10px 0;">Friend Requests</h4>
                ${requests.map(r => `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                        <span>${r.sender.username}</span>
                        <button onclick="window.respondFriend(${r.id}, true)" style="width:auto; padding:4px 8px; font-size:0.7rem;">Accept</button>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <div class="tabs" style="margin-top: 20px;">
            <div class="tab active" id="tab-friends">Friends</div>
            <div class="tab" id="tab-trades">Active Trades (${incomingProposals.length + responsesToReview.length})</div>
        </div>
        
        <div id="trade-content">
            <!-- Friend List Default -->
            <div class="friend-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px;">
                ${friends.length > 0 ? friends.map(f => `
                    <div class="friend-card" onclick="window.initiateTrade(${f.id}, '${f.username}')" style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; text-align: center; cursor: pointer; border: 1px solid rgba(255,255,255,0.1);">
                        <div style="width: 40px; height: 40px; background: var(--accent); border-radius: 50%; display:flex; align-items:center; justify-content:center; margin: 0 auto 10px auto; font-weight:bold;">${f.username[0].toUpperCase()}</div>
                        <div style="font-size: 0.9rem; overflow:hidden; text-overflow:ellipsis;">${f.username}</div>
                    </div>
                `).join('') : '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No friends yet. Add one!</p>'}
            </div>
        </div>
    `;

    // Add Friend Logic
    // Add Friend Logic
    container.querySelector('#add-friend-btn').addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'pack-opening-scene';
        modal.style.background = 'rgba(0,0,0,0.85)';
        modal.style.backdropFilter = 'blur(5px)';

        modal.innerHTML = `
            <div style="background: var(--secondary-bg); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border); width: 300px; text-align: center;">
                <h3 style="margin-top:0;">Add Friend</h3>
                <input type="text" id="friend-username" placeholder="Enter username" style="margin-bottom: 15px; width: 100%;">
                <div style="display: flex; gap: 10px;">
                    <button id="cancel-friend" style="background: #555;">Cancel</button>
                    <button id="confirm-friend">Send Request</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const input = modal.querySelector('#friend-username');
        input.focus();

        const close = () => modal.remove();

        modal.querySelector('#cancel-friend').addEventListener('click', close);

        modal.querySelector('#confirm-friend').addEventListener('click', async () => {
            const name = input.value.trim();
            if (!name) return;

            modal.querySelector('#confirm-friend').disabled = true;
            modal.querySelector('#confirm-friend').textContent = 'Sending...';

            try {
                await request('/friends/request', { method: 'POST', body: JSON.stringify({ username: name }) });
                alert('Request sent!');
                close();
                location.reload();
            } catch (e) {
                alert(e.message);
                modal.querySelector('#confirm-friend').disabled = false;
                modal.querySelector('#confirm-friend').textContent = 'Send Request';
            }
        });
    });

    // Tab Logic
    const tabFriends = container.querySelector('#tab-friends');
    const tabTrades = container.querySelector('#tab-trades');
    const contentDiv = container.querySelector('#trade-content');

    const renderFriends = () => {
        tabFriends.classList.add('active');
        tabTrades.classList.remove('active');
        contentDiv.innerHTML = `
            <div class="friend-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px;">
                ${friends.length > 0 ? friends.map(f => `
                    <div class="friend-card" onclick="window.initiateTrade(${f.id}, '${f.username}')" style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; text-align: center; cursor: pointer; border: 1px solid rgba(255,255,255,0.1);">
                        <div style="width: 40px; height: 40px; background: var(--accent); border-radius: 50%; display:flex; align-items:center; justify-content:center; margin: 0 auto 10px auto; font-weight:bold;">${f.username[0].toUpperCase()}</div>
                        <div style="font-size: 0.9rem; overflow:hidden; text-overflow:ellipsis;">${f.username}</div>
                    </div>
                `).join('') : '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No friends yet. Add one!</p>'}
            </div>
        `;
    };

    const renderTrades = () => {
        tabTrades.classList.add('active');
        tabFriends.classList.remove('active');

        const allActive = [...incomingProposals, ...responsesToReview, ...activeSent]; // Combine lists

        contentDiv.innerHTML = `
            <div class="trade-list" style="display: flex; flex-direction: column; gap: 10px;">
                ${allActive.length > 0 ? allActive.map(t => {
            const isIncoming = t.receiverId === user.id && t.status === 'PENDING';
            const isResponded = t.senderId === user.id && t.status === 'RESPONDED';
            const isSent = t.senderId === user.id && t.status === 'PENDING';

            let statusText = t.status;
            let actionHtml = '';

            if (isIncoming) {
                statusText = `Proposed by ${t.sender.username}`;
                actionHtml = `<button onclick="window.respondTrade(${t.id}, '${t.offeredCard.rarity}', ${t.senderId})">View Proposal</button>`;
            } else if (isResponded) {
                statusText = `Response from ${t.receiver.username}`;
                actionHtml = `<button onclick="window.finalizeTrade(${t.id})">Review Response</button>`;
            } else if (isSent) {
                statusText = `Waiting for ${t.receiver.username}...`;
                actionHtml = `<span style="opacity:0.6; font-size:0.8rem;">Sent</span>`;
            }

            return `
                    <div class="trade-item" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
                        <img src="${t.offeredCard.imageUrl}" style="width: 50px; border-radius: 4px;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold;">${t.offeredCard.name}</div>
                            <div style="font-size: 0.8rem; color: #aaa;">${statusText}</div>
                        </div>
                        <div>${actionHtml}</div>
                    </div>
                   `;
        }).join('') : '<p style="text-align: center; color: var(--text-muted);">No active trades.</p>'}
            </div>
        `;
    };

    tabFriends.addEventListener('click', renderFriends);
    tabTrades.addEventListener('click', renderTrades);

    // Check if we should auto-open Active Trades tab from notification
    if (sessionStorage.getItem('openActiveTrades') === 'true') {
        sessionStorage.removeItem('openActiveTrades');
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            renderTrades();
        }, 100);
    }

    // Global Trade Handlers
    window.respondFriend = async (id, accept) => {
        try {
            await request('/friends/respond', { method: 'POST', body: JSON.stringify({ requestId: id, accept }) });
            location.reload();
        } catch (e) { alert(e.message); }
    };

    window.initiateTrade = async (friendId, friendName) => {
        // 1. Show Card Selector (Cards User Owns > 1 AND Friend Needs 0)
        const offer = await selectCardModal("Select card to offer to " + friendName, friendId);
        if (!offer) return;

        try {
            await request('/trades/propose', {
                method: 'POST',
                body: JSON.stringify({ receiverId: friendId, offeredCardId: offer.id })
            });
            alert('Trade proposal sent!');
            location.reload();
        } catch (e) { alert(e.message); }
    };

    window.respondTrade = async (tradeId, requiredRarity, senderId) => {
        // Find the trade to get the offered card info
        const trade = trades.find(t => t.id === tradeId);
        if (!trade) return;

        // Fetch both user's and sender's collections
        const [myCards, senderCards] = await Promise.all([
            request('/collection?expansion=BT-01'),
            request('/collection?expansion=BT-01&userId=' + senderId)
        ]);

        // Filter: Count > 1 AND Rarity matches AND Sender doesn't have it
        const candidates = myCards.filter(c => {
            const senderCopy = senderCards.find(sc => sc.id === c.id);
            const senderHasIt = senderCopy ? senderCopy.count > 0 : false;
            return c.count > 1 && c.rarity === requiredRarity && !senderHasIt;
        });

        // Show modal with the proposal
        const modal = document.createElement('div');
        modal.className = 'pack-opening-scene';
        modal.style.background = 'rgba(0,0,0,0.9)';
        modal.style.backdropFilter = 'blur(5px)';

        if (candidates.length === 0) {
            // No cards available - show proposal with reject option only
            modal.innerHTML = `
                <div style="background: var(--secondary-bg); width: 95%; max-width: 500px; padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border); text-align: center;">
                    <h3 style="color: var(--accent); margin-top:0;">Trade Proposal</h3>
                    
                    <div style="margin: 20px 0;">
                        <div style="font-size: 0.9rem; color: #ccc; margin-bottom: 10px;">${trade.sender.username} offers:</div>
                        <img src="${trade.offeredCard.imageUrl}" style="width: 60%; max-width: 200px; border-radius: 8px; border: 1px solid var(--accent); box-shadow: 0 0 10px var(--accent);">
                        <div style="font-size: 1rem; margin-top: 10px; font-weight: bold;">${trade.offeredCard.name}</div>
                        <div style="font-size: 0.8rem; color: #aaa;">${trade.offeredCard.rarity}</div>
                    </div>
                    
                    <div style="background: rgba(255,100,100,0.1); padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid rgba(255,100,100,0.3);">
                        <p style="margin: 0; color: #ffaaaa; font-size: 0.9rem;">You don't have any duplicate ${requiredRarity} cards that ${trade.sender.username} needs.</p>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button id="reject-proposal" style="background: #ff4757; width: auto; padding: 10px 20px;">Reject Proposal</button>
                        <button id="close-proposal" style="background: transparent; border: 1px solid #555; width: auto; padding: 10px 20px;">Close</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            const close = () => modal.remove();

            modal.querySelector('#close-proposal').addEventListener('click', close);

            modal.querySelector('#reject-proposal').addEventListener('click', async () => {
                const btn = modal.querySelector('#reject-proposal');
                btn.disabled = true;
                btn.textContent = 'Rejecting...';

                try {
                    await request('/trades/respond', { method: 'POST', body: JSON.stringify({ tradeId, reject: true }) });
                    alert('Trade proposal rejected');
                    location.reload();
                } catch (e) {
                    alert(e.message);
                    btn.disabled = false;
                    btn.textContent = 'Reject Proposal';
                }
            });
        } else {
            // Has cards available - show selection modal
            modal.innerHTML = `
                <div style="background: var(--secondary-bg); width: 95%; max-width: 500px; max-height: 80vh; border-radius: 12px; border: 1px solid var(--glass-border); padding: 20px; display: flex; flex-direction: column;">
                    <h3 style="margin-top: 0; text-align: center; color: var(--accent); margin-bottom: 15px;">Select ${requiredRarity} card to offer</h3>
                    
                    <div class="card-grid" style="overflow-y: auto; flex: 1; padding: 5px;">
                        ${candidates.map(c => `
                            <div class="card-item" data-id="${c.id}" style="cursor:pointer; border: 1px solid var(--accent)">
                                <img src="${c.imageUrl}" style="width:100%">
                                <div class="card-badge">x${c.count}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        <button id="reject-proposal-btn" style="background: #ff4757; flex: 1;">Reject</button>
                        <button id="cancel-modal" style="background: #444; flex: 1;">Cancel</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelectorAll('.card-item').forEach(el => {
                el.addEventListener('click', async () => {
                    const cardId = el.dataset.id;
                    modal.remove();
                    try {
                        await request('/trades/respond', {
                            method: 'POST',
                            body: JSON.stringify({ tradeId, responseCardId: cardId })
                        });
                        alert('Response sent!');
                        location.reload();
                    } catch (e) { alert(e.message); }
                });
            });

            modal.querySelector('#cancel-modal').addEventListener('click', () => modal.remove());

            modal.querySelector('#reject-proposal-btn').addEventListener('click', async () => {
                const btn = modal.querySelector('#reject-proposal-btn');
                btn.disabled = true;
                btn.textContent = 'Rejecting...';

                try {
                    await request('/trades/respond', { method: 'POST', body: JSON.stringify({ tradeId, reject: true }) });
                    alert('Trade proposal rejected');
                    location.reload();
                } catch (e) {
                    alert(e.message);
                    btn.disabled = false;
                    btn.textContent = 'Reject';
                }
            });
        }
    };

    window.finalizeTrade = async (tradeId) => {
        const trade = trades.find(t => t.id === tradeId);
        if (!trade) return;

        // Show comparison modal
        const modal = document.createElement('div');
        modal.className = 'pack-opening-scene';
        modal.style.background = 'rgba(0,0,0,0.9)';
        modal.style.backdropFilter = 'blur(5px)';

        modal.innerHTML = `
            <div style="background: var(--secondary-bg); width: 95%; max-width: 600px; padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border); text-align: center;">
                <h3 style="color: var(--accent); margin-top:0;">Complete Trade?</h3>
                <div style="display: flex; justify-content: space-around; align-items: center; margin: 20px 0;">
                    <div style="width: 35%;">
                        <div style="font-size: 0.8rem; color: #ccc; margin-bottom: 5px;">You Offer</div>
                        <img src="${trade.offeredCard.imageUrl}" style="width: 100%; border-radius: 8px; border: 1px solid var(--glass-border);">
                        <div style="font-size: 0.9rem; margin-top: 5px;">${trade.offeredCard.name}</div>
                    </div>
                    
                    <div style="width: 10%; font-size: 2rem;">
                        &#8644;
                    </div>
                    
                    <div style="width: 35%;">
                         <div style="font-size: 0.8rem; color: #ccc; margin-bottom: 5px;">${trade.receiver.username} Offers</div>
                         <img src="${trade.respondedCard.imageUrl}" style="width: 100%; border-radius: 8px; border: 1px solid var(--accent); box-shadow: 0 0 10px var(--accent);">
                         <div style="font-size: 0.9rem; margin-top: 5px;">${trade.respondedCard.name}</div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 15px; justify-content: center; margin-top: 20px;">
                    <button id="reject-trade" style="background: #ff4757; width: auto; padding: 10px 20px;">Reject</button>
                    <button id="accept-trade" style="background: var(--accent-secondary); width: auto; padding: 10px 20px;">Accept Trade</button>
                </div>
                <button id="cancel-view" style="margin-top: 15px; background: transparent; border: 1px solid #555; width: auto; padding: 5px 15px;">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        const close = () => modal.remove();

        modal.querySelector('#cancel-view').addEventListener('click', close);

        modal.querySelector('#reject-trade').addEventListener('click', async () => {
            const btn = modal.querySelector('#reject-trade');
            btn.disabled = true;
            btn.textContent = 'Rejecting...';

            try {
                await request('/trades/finalize', { method: 'POST', body: JSON.stringify({ tradeId, accept: false }) });
                alert('Trade Rejected');
                location.reload();
            } catch (e) {
                alert(e.message);
                btn.disabled = false;
                btn.textContent = 'Reject';
            }
        });

        modal.querySelector('#accept-trade').addEventListener('click', async () => {
            try {
                await request('/trades/finalize', { method: 'POST', body: JSON.stringify({ tradeId, accept: true }) });
                alert('Trade Completed! Cards have been swapped.');
                location.reload();
            } catch (e) { alert(e.message); }
        });
    };

    return container;
}

async function selectCardModal(title, friendId) {
    return new Promise(async (resolve) => {
        // Fetch user cards AND Friend cards
        const [myCards, friendCards] = await Promise.all([
            request('/collection?expansion=BT-01'),
            request('/collection?expansion=BT-01&userId=' + friendId)
        ]);

        // Logic: You have > 1 AND Friend has 0
        const tradeable = myCards.filter(c => {
            const friendCopy = friendCards.find(fc => fc.id === c.id);
            const friendHasIt = friendCopy ? friendCopy.count > 0 : false;
            return c.count > 1 && !friendHasIt;
        });

        const modal = document.createElement('div');
        modal.className = 'pack-opening-scene';
        modal.style.background = 'rgba(0,0,0,0.9)';
        modal.style.backdropFilter = 'blur(5px)';

        modal.innerHTML = `
            <div style="background: var(--secondary-bg); width: 95%; max-width: 500px; max-height: 80vh; border-radius: 12px; border: 1px solid var(--glass-border); padding: 20px; display: flex; flex-direction: column;">
                <h3 style="margin-top: 0; text-align: center; color: var(--accent); margin-bottom: 15px;">${title}</h3>
                
                <div class="card-grid" style="overflow-y: auto; flex: 1; padding: 5px;">
                    ${tradeable.map(c => `
                        <div class="card-item" data-id="${c.id}" style="cursor:pointer; border: 1px solid var(--accent)">
                            <img src="${c.imageUrl}" style="width:100%">
                            <div class="card-badge">x${c.count}</div>
                        </div>
                    `).join('')}
                    ${tradeable.length === 0 ? '<p style="text-align:center;width:100%;color:#888;">No cards found that you have duplicates of and they need.</p>' : ''}
                </div>
                
                <button id="cancel-modal" style="margin-top:20px; background: #444; width: 100%;">Cancel</button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelectorAll('.card-item').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.dataset.id;
                modal.remove();
                resolve(tradeable.find(c => c.id === id));
            });
        });

        modal.querySelector('#cancel-modal').addEventListener('click', () => {
            modal.remove();
            resolve(null);
        });
    });
}
