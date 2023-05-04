export class Comment {
    constructor(name, text) {
        this.name = name;
        this.text = text;
    }
    createComment(element) {
        let li = document.createElement('li');
        li.classList = 'comment';
        let commentName = document.createElement('span');
        commentName.classList = 'commentor-name';
        commentName.innerText = this.name + ': ';
        li.appendChild(commentName);
        let commentText = document.createElement('span');
        commentText.classList = 'comment-text';
        commentText.innerText = this.text;
        li.appendChild(commentText);
        element.appendChild(li);
    }
}