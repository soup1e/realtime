//Imports
import '../auth/user.js';
import { addPost, getUser } from '../fetch-utils.js';

//DOM Elements
const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');

//State
let error = null;

const user = getUser();

//Events
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const post = {
        title: formData.get('title'),
        text: formData.get('text'),
        user_id: user.id,
    };

    const response = await addPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

//Display-Functions

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
