import {getItem} from "./local-storage";


class Api {
    basicUrl = 'https://conduit.productionready.io/api/';

    user = getItem('user');

    userToken = this.user === null? '' : this.user.token

    getRequest = async (url, options = {}) => {
        const headers = {
            "Content-Type": `application/json;charset=utf-8`,
        }
        const newOptions = {headers, ...options}
        const request = await fetch(`${url}`, newOptions);
        if(!request.ok) throw new Error('Request failed');
        const response = await request.json();
        return response;
    }

    getRequestWithToken = async (url, options) => {
        let headers = {};
        const token = this.userToken;
        if (token) {
            headers = {
                "Content-Type": `application/json;charset=utf-8`,
                Authorization: `Token ${token}`,
            }
        }
        const newOptions = {headers, ...options};
        const request = await this.getRequest(url, newOptions);
        return request;
    }


    getListOfArticles = async (limit = 5, page= 1) => {
        const offset = page === 1 ? 0 : (page - 1) * 5;

        const options = {
            method: 'GET',
        }
        const request = await this.getRequestWithToken(`${this.basicUrl}articles?limit=${limit}&offset=${offset}`, options)
        return request;
    }

    getSingleArticle = async (slug) => {
        const options = {
            method: 'GET',
        }
        const request = await this.getRequestWithToken(`${this.basicUrl}articles/${slug}`, options)

        return request;
    }

    registration = async (username, email, password) => {
        const user = {
            'user': {
            "username": username,
            "email" : email,
            'password': password
            }
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(user)
        }
        const request = await this.getRequest(`${this.basicUrl}users`, options)
        return request;
    }

    login = async (email, password) => {
        const user = {
            'user': {
                'email' : email,
                'password' : password,
            }
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(user)
        }
        const requset = await this.getRequest(`${this.basicUrl}users/login`, options)

        return requset;

    }

    editProfile = async (userData) => {
       if(!userData) throw new Error('Missing data');
       const user = {...userData};
       const options = {
           method: 'PUT',
           body: JSON.stringify(user)
       }
       const request = await this.getRequestWithToken(`${this.basicUrl}user`, options)
        return request;
    }

    createArticle = async (newArticle) => {
        if(!newArticle) throw new Error('Missing data');
        const article = { article: {...newArticle}};
        const options = {
            method: 'POST',
            body: JSON.stringify(article)
        }
        const request = await this.getRequestWithToken(`${this.basicUrl}articles`, options)
        return request;
    }

    deleteArticle = async (slug) => {

        const options = {
            method: 'DELETE',
        }
        await this.getRequestWithToken(`${this.basicUrl}articles/${slug}`, options);
    }

    editArticle = async (data, slug) => {
        const newArticle = {'article': {...data}};
        const options = {
            method: 'PUT',
            body: JSON.stringify(newArticle)
        }
        const request = await this.getRequestWithToken(`${this.basicUrl}articles/${slug}`, options)
        return request;
    }

    likedArticle = async (slug) => {
        const options = {
            method: 'POST',
        }
        const request = await this.getRequestWithToken(`${this.basicUrl}articles/${slug}/favorite`, options)
        return request;
    }

    unLickedArticle = async (slug) => {
        const options = {
            method: 'DELETE',
        }
        const request = await this.getRequestWithToken(`${this.basicUrl}articles/${slug}/favorite`, options)
        return request;
    }
}
export default Api;