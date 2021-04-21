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
        if(!request.ok) {
            throw new Error()
        }

        const response = await request.json();
        return response;

    }

    editProfile = async (userData, token) => {
       if(!userData) throw new Error('Missing data');
       const user = {...userData};
       const requset = await fetch(`${this.basicUrl}user`, {
           method: 'PUT',
           headers: {
               'Content-Type' : 'application/json;charset=utf-8',
               Authorization: `Token ${token}`,
           },
           body: JSON.stringify(user)
       })
        if(!requset.ok) throw new Error('Request failed');
        const response = requset.json();
        return response;
    }
}
export default Api;