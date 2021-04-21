export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const removeUser = () => localStorage.removeItem('user');

export const setIsLogin = (isLogin) => localStorage.setItem('isLogin', JSON.stringify(isLogin));

export const getIsLogin = () => JSON.parse(localStorage.getItem('isLogin'));

export const removeIsLogin = () => localStorage.removeItem('isLogin');

