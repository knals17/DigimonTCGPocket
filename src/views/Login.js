import { request } from '../api.js';

export default async function Login() {
    const container = document.createElement('div');
    container.className = 'auth-container';

    container.innerHTML = `
        <div class="auth-box">
            <h1 style="color: var(--accent); margin-bottom: 2rem;">Digimon TCG Pocket</h1>
            <div id="error-msg" style="color: #ff6b6b; margin-bottom: 1rem; min-height: 20px;"></div>
            
            <div class="input-group">
                <label>Username</label>
                <input type="text" id="username" placeholder="Choose a trainer name" autocomplete="username">
            </div>
            
             <div class="input-group">
                <label>Password</label>
                <input type="password" id="password" placeholder="Enter password" autocomplete="current-password">
            </div>
            
            <button id="login-btn">Login</button>
            <p style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
                No account? <a href="#" id="toggle-register" style="color: var(--accent); text-decoration: none; font-weight: bold;">Register</a>
            </p>
        </div>
    `;

    const loginBtn = container.querySelector('#login-btn');
    const toggleBtn = container.querySelector('#toggle-register');
    const msgP = container.querySelector('p');
    let isRegister = false;

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isRegister = !isRegister;
        loginBtn.textContent = isRegister ? 'Create Account' : 'Login';
        toggleBtn.textContent = isRegister ? 'Login' : 'Register';
        msgP.childNodes[0].textContent = isRegister ? 'Have an account? ' : 'No account? ';
    });

    loginBtn.addEventListener('click', async () => {
        const username = container.querySelector('#username').value;
        const password = container.querySelector('#password').value;
        const errorMsg = container.querySelector('#error-msg');

        if (!username || !password) {
            errorMsg.textContent = "Please fill in all fields";
            return;
        }

        errorMsg.textContent = 'Processing...';
        loginBtn.disabled = true;

        try {
            if (isRegister) {
                await request('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({ username, password })
                });
                alert('Account created! Please login.');
                isRegister = false;
                loginBtn.textContent = 'Login';
                toggleBtn.textContent = 'Register';
                msgP.childNodes[0].textContent = 'No account? ';
            } else {
                const data = await request('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ username, password })
                });
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ id: data.id, username: data.username }));
                window.location.hash = '/';
            }
        } catch (e) {
            errorMsg.textContent = e.message;
        } finally {
            loginBtn.disabled = false;
            if (errorMsg.textContent === 'Processing...') errorMsg.textContent = '';
        }
    });

    return container;
}
