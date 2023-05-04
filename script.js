import { gorestAPI } from "./src/api.js";
import { User } from "./src/user.js";
import { Post } from "./src/post.js";
import { Comment } from "./src/comment.js";

const ACCESS_TOKEN = '';
const USER_LIST = document.querySelector('.user-list');
const POSTS_LIST = document.querySelector('.posts-list');
const COMMENTS_LIST = document.querySelector('.comments-list');

const api = new gorestAPI(ACCESS_TOKEN);
document.addEventListener("DOMContentLoaded", api.getUsers().then((users) => {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let newUser = new User(user.id, user.name, user.status);
        newUser.createUser(USER_LIST);
    }
    USER_LIST.addEventListener('click', (e) => {
        let userID = e.target.id;
        let name = e.target.innerHTML;
        createPosts(userID, name);
    });
    })
    .catch((error) => {
        console.error(error);
    })
);

function createPosts(userID, name) {
    USER_LIST.innerHTML = '';
    let userName = document.querySelector('.user-name');
    userName.innerText = name;
    api.getPosts().then((posts) => {
        let newPost = '';
        for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            
            if (userID == post.user_id) {
                newPost = new Post(post.user_id, post.id, post.title, post.body);
                newPost.createPost(POSTS_LIST);
            } else if(newPost == '') {
                let message = document.createElement('span');
                message.innerText = 'У даного користувача відсутні пости';
                message.classList.add('message');
                POSTS_LIST.appendChild(message);
            }
        }
        createBackButton(POSTS_LIST);
        let button = document.querySelector('button');
        button.addEventListener('click', () => {
            window.location.assign('index.html');
        });
        POSTS_LIST.addEventListener('click', (e) => {
            POSTS_LIST.innerHTML = '';
            let thisPostInfo = newPost.showPost();
            newPost = new Post(thisPostInfo[0], thisPostInfo[1], thisPostInfo[2], thisPostInfo[3]);
            newPost.createPost(COMMENTS_LIST);
            createComments(e.target.id);
            createBackButton(COMMENTS_LIST);
            let button = document.querySelector('button');
            button.addEventListener('click', () => {
                window.location.assign('index.html');
            });
        });
        })
        .catch((error) => {
            console.error(error);
        });
}

function createComments(id) {
    
    api.getComments().then((comments) => {
        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i];
            if (id == comment.post_id) {
                let commentTitle = document.createElement('h3');
                commentTitle.classList.add('user-name');
                COMMENTS_LIST.appendChild(commentTitle);
                let newComment = new Comment(comment.name, comment.body);
                newComment.createComment(COMMENTS_LIST);
            }
        }
    })
}

function createBackButton(elem) {
    let button = document.createElement('button');
    button.classList = 'back';
    button.innerText = 'Назад';
    elem.appendChild(button);
}