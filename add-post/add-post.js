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
});

//Display-Functions
