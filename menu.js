document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById('header-container') || document.querySelector('body');
    if (!headerContainer) return;

    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'menu.html', false); // synchronous request
        xhr.send(null);
        if (xhr.status === 200) {
            const html = xhr.responseText;
            if (headerContainer.tagName === 'BODY') {
                headerContainer.insertAdjacentHTML('afterbegin', html);
            } else {
                headerContainer.innerHTML = html;
            }

            // Set active class based on current page URL
            const currentPage = window.location.pathname.split('/').pop() || 'admin-dashboard.html';
            const navLinks = document.querySelectorAll('header nav a');
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPage || (currentPage === '' && href === 'admin-dashboard.html')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Bind logout event handler
            const btnLogout = document.getElementById('btn-logout');
            if (btnLogout) {
                btnLogout.addEventListener('click', () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('checkinXToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = 'login.html';
                });
            }
        } else {
            console.error('Error loading menu: status ' + xhr.status);
        }
    } catch (err) {
        console.error('Error loading menu synchronously:', err);
    }
});
