export const TOKEN_KEY = "@beneficios-eventuais-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("REACT_TOKEN_AUTH_KEY");
};

export const getCurrentUser = () => {
    const parsedToken = getParsedToken();
    if (!isTokenExpired(parsedToken)) {
        return parsedToken.sub;
    }
    return null;
};

const isTokenExpired = (parsedToken) => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime() / 1000;
    return timestamp > parsedToken.exp;
}

export const getParsedToken = () => {
    return parseJwt(getToken());
}

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}