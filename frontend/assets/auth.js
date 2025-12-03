const API_BASE = "http://localhost:5000";

/* ============================================================
   TOKEN HANDLING
============================================================ */
function saveToken(token) {
    localStorage.setItem("login_token", token);
}

function getToken() {
    return localStorage.getItem("login_token");
}

function requireAuth() {
    if (!getToken()) {
        window.location.href = "login.html";
    }
}

/* ============================================================
   ATTACH AUTH HEADER FOR FETCH
============================================================ */
async function authFetch(url, options = {}) {
    const token = getToken();

    const headers = options.headers || {};
    if (token) headers["Authorization"] = "Bearer " + token;

    return fetch(url, { ...options, headers });
}

/* ============================================================
   LOGOUT
============================================================ */
function logout() {
    localStorage.removeItem("login_token");
    localStorage.removeItem("user_email");
    window.location.href = "login.html";
}

/* ============================================================
   MFA HANDLER
============================================================ */
async function verifyMFA(mfa_token, code) {
    const res = await fetch(${API_BASE}/auth/verify-mfa, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mfa_token, code })
    });

    return await res.json();
}