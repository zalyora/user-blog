export class Post {
    constructor(userId, postId, title, text, shorten) {
        this.userId = userId;
        this.postId = postId;
        this.title = title;
        this.text = text;
        this.shorten = shorten
    }
    createPost(element) {
        let li = document.createElement('li');
        li.classList = 'post';
        li.id = this.userId;
        let postName = document.createElement('a');
        postName.id = this.postId;
        postName.classList = 'post-link';
        postName.innerText = this.title;
        li.appendChild(postName);
        let postText = document.createElement('p');
        postText.classList = 'post-desc';
        if (this.shorten == true) {
            postText.innerText = this.text.substring(0, 100) + '...';
        } else {
            postText.innerText = this.text;
        }
        
        li.appendChild(postText);
        element.appendChild(li);
    }
    showPost() {
        return [this.userId, this.postId, this.title, this.text];
    }
}