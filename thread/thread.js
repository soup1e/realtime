import '../auth/user.js';

import { getPost, createComment, getComment, onComment } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';

const threadName = document.getElementById('thread-name');
const threadText = document.getElementById('thread-description');
const threadUsername = document.getElementById('thread-username');
const errorDisplay = document.getElementById('error-display');

const commentList = document.getElementById('comment-list');
const addCommentForm = document.getElementById('add-comment-form');

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
        displayComments();
    }

    onComment(thread.id, async (payload) => {
        const commentId = payload.new.id;
        const commentResponse = await getComment(commentId);
        error = commentResponse.error;
        if (error) {
            displayError();
        } else {
            const comment = commentResponse.data;
            thread.comments.unshift(comment);
            displayComments();
        }
    });
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
    threadUsername.textContent = thread.user.username;
}

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addCommentForm);
    const comment = {
        post_id: thread.id,
        text: formData.get('text'),
    };

    const response = await createComment(comment);
    error = response.error;

    if (error) {
        displayError();
    } else {
        addCommentForm.reset();
        displayComments();
    }
});

function displayComments() {
    commentList.innerHTML = '';
    for (const comment of thread.comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}
