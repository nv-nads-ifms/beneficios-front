export const TOKEN_KEY = "@beneficios-eventuais-Token";
export const LOCAL_USER_DATA_KEY = '@localUserData';
export const LOCAL_USER_CONTENT = '@localUserContent';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LOCAL_USER_CONTENT);
    localStorage.removeItem("REACT_TOKEN_AUTH_KEY");
    localStorage.removeItem("localUserData");
    removeCurrentUser();
};

export const getUserContent = () => {
    return localStorage.getItem(LOCAL_USER_CONTENT);
}

export const setUserContent = (value) => {
    localStorage.setItem(LOCAL_USER_CONTENT, value);
}

export const getCurrentUser = () => {
    return localStorage.getItem(LOCAL_USER_DATA_KEY);
};

export const setCurrentUser = (user) => {
    localStorage.setItem(LOCAL_USER_DATA_KEY, user);
};

export const removeCurrentUser = () => {
    localStorage.removeItem(LOCAL_USER_DATA_KEY);
};