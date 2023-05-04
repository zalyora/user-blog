const USERS_ENDPOINT = 'https://gorest.co.in/public/v2/users';
const POSTS_ENDPOINT = 'https://gorest.co.in/public/v2/posts';
const COMMENTS_ENDPOINT = 'https://gorest.co.in/public/v2/comments';
export class gorestAPI {
    constructor(token) {
        this.token = token;
    }
    async getUsers() {
        const headers = new Headers();
        headers.append("Authorization", `Token ${this.token}`);
        try {
            const response = await fetch(
                USERS_ENDPOINT,
                {
                    headers: headers
                }
            );
        if (!response.ok) {
            throw new Error("Error of getting repos");
        }
        const result = await response.json();
        return result;
        } catch (error) {
            console.error(error);
        }
    }
    async getPosts() {
        const headers = new Headers();
        headers.append("Authorization", `Token ${this.token}`);
        try {
            const response = await fetch(
                POSTS_ENDPOINT,
                {
                    headers: headers
                }
            );
        if (!response.ok) {
            throw new Error("Error of getting repos");
        }
        const result = await response.json();
        return result;
        } catch (error) {
            console.error(error);
        }
    }
    async getComments() {
        const headers = new Headers();
        headers.append("Authorization", `Token ${this.token}`);
        try {
            const response = await fetch(
                COMMENTS_ENDPOINT,
                {
                    headers: headers
                }
            );
        if (!response.ok) {
            throw new Error("Error of getting repos");
        }
        const result = await response.json();
        return result;
        } catch (error) {
            console.error(error);
        }
    }
}

