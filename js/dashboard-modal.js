// Constants
const signupModal = document.getElementById('signup-modal-container');
const loginModal = document.getElementById('login-modal-container');

const signupBtn = document.querySelector('.signup-link');
const loginBtn = document.querySelector('.login-link');

const closeButtons = document.querySelectorAll('.close-btn');

/*  
 * DOCU: Hides all modal windows and removes the modal-open class from body
 * @returns {void}
 *  
 * Last Updated: 2026-02-11 
 * Author: Allan Banzuela  
 * Last Updated By: Allan Banzuela
 */
function hideModals() {
    if (signupModal) {
        signupModal.style.display = 'none';
    }
    if (loginModal) {
        loginModal.style.display = 'none';
    }
    document.body.classList.remove('modal-open');
}

// Hide both modals on initial load
hideModals();

// Show signup modal when SIGN UP is clicked
signupBtn.addEventListener('click', function () {
    hideModals();
    if (signupModal) {
        signupModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }
});

// Show login modal when LOGIN is clicked
loginBtn.addEventListener('click', function () {
    hideModals();
    if (loginModal) {
        loginModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }
});

// Hide modals when any close button is clicked
closeButtons.forEach(function (btn) {
    btn.addEventListener('click', hideModals);
});