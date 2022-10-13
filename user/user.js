import '../auth/user.js';
import { addProfile, getUser } from '../fetch-utils.js';

const profileForm = document.getElementById('user-form');
const errorDisplay = document.getElementById('error-display');

let error = null;

const user = getUser();

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(profileForm);

    const profileUpdate = {
        username: formData.get('username'),
        bio: formData.get('bio'),
        user_id: user.id,
    };

    const response = await addProfile(profileUpdate);
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
