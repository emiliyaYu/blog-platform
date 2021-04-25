
class Api {
    basicUrl = 'https://conduit.productionready.io/api/';

    getListOfArticles = async (limit = 5, page= 1) => {
        const offset = page === 1 ? 0 : (page - 1) * 5;
        const request = await fetch(`${this.basicUrl}articles?limit=${limit}&offset=${offset}`);
        if(!request.ok) throw new Error('Request failed');
        const response = await request.json();
        return response;
    }

    getSingleArticle = async (slug) => {
        const request = await fetch(`${this.basicUrl}articles/${slug}`);
        if(!request.ok) throw new Error('Request failed');
        const response = await request.json();
        return response;
    }

    registration = async (username, email, password) => {
        const user = {
            'user': {
            "username": username,
            "email" : email,
            'password': password
            }
        }
        const request = await fetch(`${this.basicUrl}users`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user)
        })
        if(!request.ok) throw new Error('Request failed');
        const response = await request.json();
        return response;
    }

    login = async (email, password) => {
        const user = {
            'user': {
                'email' : email,
                'password' : password,
            }
        }
        const request = await fetch(`${this.basicUrl}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user)
        });
        if(!request.ok) throw new Error('Request failed');

        const response = await request.json();
        return response;

    }

    editProfile = async (userData, token) => {
       if(!userData) throw new Error('Missing data');
       const user = {...userData};
       const request = await fetch(`${this.basicUrl}user`, {
           method: 'PUT',
           headers: {
               'Content-Type' : 'application/json;charset=utf-8',
               Authorization: `Token ${token}`,
           },
           body: JSON.stringify(user)
       })
        if(!request.ok) throw new Error('Request failed');
        const response = request.json();
        return response;
    }

    createArticle = async (newArticle, token) => {
        if(!newArticle) throw new Error('Missing data');
        const article = { article: {...newArticle}};
        const request = await fetch(`${this.basicUrl}articles`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json;charset=utf-8',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(article)
        })
        if(!request.ok) throw new Error('Request failed');
        const response = request.json();
        return response;
    }

    deleteArticle = async (slug, token) => {
        const request = await fetch(`${this.basicUrl}articles/${slug}`,{
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json;charset=utf-8',
                Authorization: `Token ${token}`,
            },
        });
        if(!request.ok) throw new Error('Request failed');
    }

    editArticle = async (data, slug, token) => {
        const newArticle = {'article': {...data}};
        const request = await fetch(`${this.basicUrl}articles/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json;charset=utf-8',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(newArticle)
        })
        if(!request.ok) throw new Error(`Request failed`);
        const response = await request.json();
        return response;
    }
}
export default Api;