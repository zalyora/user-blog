import { gorestAPI } from "./src/api.js";
import { User } from "./src/user.js";
import { Post } from "./src/post.js";
import { Comment } from "./src/comment.js";

const ACCESS_TOKEN = '';
const LIST_TITLE = document.querySelector('.list-title');
const USER_LIST = document.querySelector('.user-list');
const POSTS_LIST = document.querySelector('.posts-list');
const COMMENTS_LIST = document.querySelector('.comments-list');

const message = document.createElement('span');
message.innerText = 'This user has no posts';
message.classList.add('message');

const api = new gorestAPI(ACCESS_TOKEN);
document.addEventListener("DOMContentLoaded", api.getUsers().then((users) => {
    LIST_TITLE.innerText = 'Choose the user whose posts you want to see:';
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let newUser = new User(user.id, user.name, user.status);
        newUser.createUser(USER_LIST);
    }
    USER_LIST.addEventListener('click', (e) => {
        if (e.target.classList.contains('user-link')) {
            let userID = e.target.id;
            let name = e.target.innerHTML;
            createPosts(userID, name);
        }
    });
    })
    .catch((error) => {
        USER_LIST.innerText = 'Users are not found';
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
                newPost = new Post(post.user_id, post.id, post.title, post.body, true);
                newPost.createPost(POSTS_LIST);
            } else if(!newPost) {
                POSTS_LIST.appendChild(message);
            }
        }
        createBackButton(POSTS_LIST);
        let button = document.querySelector('button');
        button.addEventListener('click', () => {
            window.location.assign('index.html');
        });
        POSTS_LIST.addEventListener('click', (e) => {
            if (e.target.classList.contains('post-link')) {
                POSTS_LIST.innerHTML = '';
                let thisPostInfo = newPost.showPost();
                newPost = new Post(thisPostInfo[0], thisPostInfo[1], thisPostInfo[2], thisPostInfo[3], false);
                newPost.createPost(COMMENTS_LIST);
                createComments(e.target.id);
                createBackButton(COMMENTS_LIST);
                let button = document.querySelector('button');
                button.addEventListener('click', () => {
                    COMMENTS_LIST.innerHTML = '';
                    newPost = new Post(thisPostInfo[0], thisPostInfo[1], thisPostInfo[2], thisPostInfo[3], true);
                    newPost.createPost(POSTS_LIST);
                    createBackButton(POSTS_LIST);
                    let button = document.querySelector('button');
                    button.addEventListener('click', () => {
                        window.location.assign('index.html');
                    });
                });
            }
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
    button.innerText = 'Back';
    elem.appendChild(button);
}