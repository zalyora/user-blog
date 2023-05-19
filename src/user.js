export class User {
    constructor(userId, name, status) {
        this.userId = userId;
        this.name = name;
        this.status = status;
    }
    createUser(element) {
        let li = document.createElement('li');
        li.classList = 'user';
        let userName = document.createElement('a');
        userName.id = this.userId;
        userName.classList = 'user-link';
        userName.innerText = this.name;
        li.appendChild(userName);
        let userStatus = document.createElement('span');
        userStatus.classList = 'user-status';
        userStatus.innerText = this.status;
        li.appendChild(userStatus);
        element.appendChild(li);
    }
}