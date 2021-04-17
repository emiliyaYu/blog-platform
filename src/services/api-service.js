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

    registration = async (username, email, password) => {
        const user = {
            "username": `${username}`,
            "email": `${email}`,
            "password": `${password}`
        }
        const request = await fetch(`${this.basicUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json; charset=utf-8',
            },
            body: {
                'user': JSON.stringify(user)
            }
        })
        return request;
    }
}
export default Api;