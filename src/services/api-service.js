class Api {
    basicUrl = 'https://conduit.productionready.io/api/';

    getListOfArticles = async (limit = 5, page= 1) => {
        const offset = page === 1 ? 0 : (page - 1) * 5;
        const request = await fetch(`${this.basicUrl}articles?limit=${limit}&offset=${offset}`);
        const response = await request.json();
        return response;
    }

    getSingleArticle = async (slug) => {
        const request = await fetch(`${this.basicUrl}articles/${slug}`);
        const response = await request.json();
        return response;
    }

}
export default Api;