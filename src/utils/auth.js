// import { getBaseUrl } from "./api.js";

// export async function register(name, email, password) {
//     const url = new URL("auth/register", getBaseUrl());
//     const response = await fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//     });
//     return response.json();
// }


// Get full user object
export function getCurrentUser() {
    const raw = localStorage.getItem("userInfo");

    try {
        return raw ? JSON.parse(raw) : null;
    } catch {
        console.warn("Invalid userInfo in localStorage");
        return null;
    }
}

// Get only user ID
export function getCurrentUserId() {
    const user = getCurrentUser();
    return user?._id ?? null;
}

// Check if user is logged in
export function isLoggedIn() {
    const token = sessionStorage.getItem("accessToken");
    const user = getCurrentUser();

    return !!token && !!user;
}

// Redirect to login if not logged in
export function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = "./userLogin.html";
        return false;
    }
    return true;
}

// Get access token (for API requests later)
export function getAccessToken() {
    return sessionStorage.getItem("accessToken");
}