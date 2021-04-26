export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const removeUser = () => localStorage.removeItem('user');

export const setIsLogin = (isLogin) => localStorage.setItem('isLogin', JSON.stringify(isLogin));

export const getIsLogin = () => JSON.parse(localStorage.getItem('isLogin'));

export const removeIsLogin = () => localStorage.removeItem('isLogin');

export const setArticleList = (articleList) => localStorage.setItem('articles', JSON.stringify(articleList));

export const getArticleList = () => JSON.parse(localStorage.getItem('articles'));

export const setLikedArticles = (article) => {
    const favArticles = [];
    favArticles.push(article);
    return localStorage.setItem('favArticles', JSON.stringify(favArticles));
};

