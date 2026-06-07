document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    // User Profile Elements
    const userProfile = document.getElementById('userProfile');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check Local Storage for existing session
    const checkSession = () => {
        const user = localStorage.getItem('tanglaUser');
        if (user) {
            const userData = JSON.parse(user);
            showLoggedInState(userData.email);
        } else {
            showLoggedOutState();
        }
    };

    // UI State Management
    const showLoggedInState = (email) => {
        loginBtn.classList.add('hidden');
        loginBtn.style.display = 'none';
        
        userProfile.classList.remove('hidden');
        // Extract name from email (e.g., student@... -> Student)
        const name = email.split('@')[0];
        userNameDisplay.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        
        loginModal.classList.remove('active');
    };

    const showLoggedOutState = () => {
        loginBtn.classList.remove('hidden');
        loginBtn.style.display = 'flex';
        
        userProfile.classList.add('hidden');
        
        loginForm.reset();
        loginError.classList.add('hidden');
    };

    // Event Listeners for Modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // Handle Login Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Mock Validation (Accept any email with format *@*.com and password > 3 chars)
        if (email.includes('@') && password.length >= 4) {
            // Success
            loginError.classList.add('hidden');
            
            const user = {
                email: email,
                token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
                loginTime: new Date().toISOString()
            };
            
            // Save to Local Storage
            localStorage.setItem('tanglaUser', JSON.stringify(user));
            
            // Update UI
            showLoggedInState(email);
        } else {
            // Fail
            loginError.classList.remove('hidden');
        }
    });

    // Handle Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('tanglaUser');
        showLoggedOutState();
    });

    // Initialize
    checkSession();

    // Smooth Scrolling for "Back to Top"
    const backToTop = document.querySelector('.back-to-top');
    if(backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
});
