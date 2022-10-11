import '../auth/user.js';
import { getPost } from '../fetch-utils.js';

const threadName = document.getElementById('thread-name');
const threadText = document.getElementById('thread-description');
const errorDisplay = document.getElementById('error-display');

const commentList = document.getElementById('comment-list');
const commentForm = document.getElementById('add-comment-form');

let error = null;
let thread = null;

window.addEventListener('load', async () => {
    const searchParameters = new URLSearchParams(location.search);
    const id = searchParameters.get('id');

    if (!id) {
        location.assign('/');
    }

    const response = await getPost(id);
    error = response.error;
    thread = response.data;

    if (error) {
        displayError();
    }
    if (!thread) {
        location.assign('/');
    } else {
        displayThread();
    }
});

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayThread() {
    threadName.textContent = thread.title;
    threadText.textContent = thread.text;
}

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(commentForm);
    const newComment = {
        post_id: thread.id,
        text: formData.get('text'),
    };

    const response = await createComment(newComment);
    error = response.error;
    const comment = response.data;

    if (error) {
        displayError();
    } else {
        //stuff
    }
});
