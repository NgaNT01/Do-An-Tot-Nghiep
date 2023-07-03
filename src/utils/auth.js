export function setAuthToken(token) {
    if (token === null) {
        localStorage.removeItem('access_token');
    } else {
        localStorage.setItem('access_token', token);
    }
}

export const getToken = () => {
    return localStorage.getItem('access_token') || "";
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('current_user')) || null;
}

export const setCurrentUserAvatar = (avatarUrl) => {
    const currentUser = getCurrentUser();
    currentUser.avatar_url = avatarUrl;
    localStorage.setItem('current_user', JSON.stringify(currentUser));
}

export const clearToken = () => {
    return localStorage.removeItem('access_token');
};