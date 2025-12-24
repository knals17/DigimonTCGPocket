const API_URL = 'http://localhost:3000/api';

export function getToken() {
    return localStorage.getItem('token');
}

export function getCurrentUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
}

export async function request(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (res.status === 401) {
        logout();
        window.location.hash = '/login';
        throw new Error('Unauthorized');
    }

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Request failed');
    }

    return data;
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.hash = '/login';
}
