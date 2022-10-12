import '../auth/user.js';
import { addProfile } from '../fetch-utils.js';

const profileForm = document.getElementById('user-form');
const errorDisplay = document.getElementById('error-display');

let error = null;

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(profileForm);

    const profile = {
        username: formData.get('username'),
        bio: formData.get('bio'),
    };

    const response = await addProfile(profile);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('../');
    }
});

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
