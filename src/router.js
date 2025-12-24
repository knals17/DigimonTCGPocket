import Login from './views/Login.js';
import Home from './views/Home.js';
import Library from './views/Library.js';
import Trade from './views/Trade.js';
import { getToken } from './api.js';

const routes = {
    '/': Home,
    '/login': Login,
    '/library': Library,
    '/trade': Trade
};

export function initRouter() {
    window.addEventListener('hashchange', render);
    render();
}

async function render() {
    const app = document.getElementById('app');
    let hash = window.location.hash.slice(1) || '/';

    // Auth Guard
    if (hash !== '/login' && !getToken()) {
        window.location.hash = '/login';
        return;
    }

    if (hash === '/login' && getToken()) {
        window.location.hash = '/';
        return;
    }

    const View = routes[hash] || Home;

    // Clear previous
    app.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

    try {
        const content = await View();
        app.innerHTML = '';
        app.appendChild(content);

        // Add Nav if logged in
        if (hash !== '/login') {
            app.appendChild(createNav(hash));
        }
    } catch (e) {
        console.error(e);
        app.innerHTML = `<div class="error" style="color:red; text-align:center;">${e.message}</div><div style="text-align:center"><button onclick="location.reload()">Retry</button></div>`;
    }
}

function createNav(activeHash) {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';

    const items = [
        { hash: '/', label: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
        { hash: '/library', label: 'Library', icon: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 13l-4.09-4.14 1.41-1.41 2.68 2.68L18.91 5.91 20.32 7.32 17 11z' }, // Library with check? Or just Stack
        { hash: '/trade', label: 'Trade', icon: 'M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z' }
    ];

    // Use Stack icon for lib
    items[1].icon = 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z';

    nav.innerHTML = items.map(item => `
        <a href="#${item.hash}" class="nav-item ${activeHash === item.hash ? 'active' : ''}">
           <svg viewBox="0 0 24 24"><path fill="currentColor" d="${item.icon}"/></svg>
           <span>${item.label}</span>
        </a>
    `).join('');

    return nav;
}
