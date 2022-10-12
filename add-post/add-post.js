//Imports
import '../auth/user.js';
import { addPost } from '../fetch-utils.js';

//DOM Elements
const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');

//State
let error = null;

//Events
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const post = {
        title: formData.get('title'),
        text: formData.get('text'),
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
