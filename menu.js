// Inject header styles immediately when script is loaded to fix layout shift (CLS)
(function() {
    const style = document.createElement('style');
    style.id = 'global-loader-styles';
    style.innerHTML = `
        #header-container {
            height: 64px;
            background: linear-gradient(90deg, #3b2bb0 0%, #4f3cc9 100%);
            display: block;
            width: 100%;
        }
        #global-page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transition: opacity 0.3s ease;
            pointer-events: auto;
        }
        #global-page-loader.fade-out {
            opacity: 0;
            pointer-events: none;
        }
        .loader-spinner-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }
        .loader-spinner-circle {
            width: 50px;
            height: 50px;
            border: 4px solid #f1f5f9;
            border-top: 4px solid #5b30a6;
            border-radius: 50%;
            animation: global-spin 0.8s linear infinite;
            box-shadow: 0 4px 10px rgba(91, 48, 166, 0.1);
        }
        .loader-spinner-text {
            color: #5b30a6;
            font-size: 14px;
            font-weight: 700;
            font-family: 'Outfit', 'Inter', sans-serif;
            letter-spacing: 0.5px;
            animation: pulse-text 1.5s ease-in-out infinite;
        }
        @keyframes global-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes pulse-text {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
})();

document.addEventListener("DOMContentLoaded", function () {
    // Inject global loader element if not present (start hidden to prevent double loading screen)
    if (!document.getElementById('global-page-loader')) {
        const loaderDiv = document.createElement('div');
        loaderDiv.id = 'global-page-loader';
        loaderDiv.className = 'fade-out';
        loaderDiv.style.display = 'none';
        loaderDiv.innerHTML = `
            <div class="loader-spinner-container">
                <div class="loader-spinner-circle"></div>
                <div class="loader-spinner-text">CheckinX đang tải...</div>
            </div>
        `;
        document.body.appendChild(loaderDiv);
    }

    const headerContainer = document.getElementById('header-container') || document.querySelector('body');
    if (!headerContainer) return;

    // Utility functions for the global loader
    function showGlobalLoader() {
        const loader = document.getElementById('global-page-loader');
        if (loader) {
            loader.style.display = 'flex';
            loader.offsetHeight; // force reflow
            loader.classList.remove('fade-out');
        }
    }
    function hideGlobalLoader() {
        const loader = document.getElementById('global-page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                if (loader.classList.contains('fade-out')) {
                    loader.style.display = 'none';
                }
            }, 300);
        }
    }
    window.showGlobalLoader = showGlobalLoader;
    window.hideGlobalLoader = hideGlobalLoader;

    // Global helper for safe loading navigation
    window.navigateWithLoader = function(href) {
        showGlobalLoader();
        setTimeout(() => {
            window.location.href = href;
        }, 500); // 0.5s delay for smooth loader display
    };

    // Intercept clicks in capture phase to add loading delay to nav links, logo, and settings gear
    document.addEventListener('click', function (e) {
        // 1. Check for nav links
        const link = e.target.closest('a.nav-link');
        if (link && link.getAttribute('href')) {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
                    return; // Let browser handle default new-tab behavior
                }
                e.preventDefault();
                e.stopPropagation();
                window.navigateWithLoader(href);
            }
            return;
        }

        // 2. Check for logo click
        const logo = e.target.closest('#logo-redirect');
        if (logo) {
            e.preventDefault();
            e.stopPropagation();
            window.navigateWithLoader('admin-dashboard.html');
            return;
        }

        // 3. Check for settings gear click
        const settings = e.target.closest('#btn-settings');
        if (settings) {
            e.preventDefault();
            e.stopPropagation();
            window.navigateWithLoader('admin-hotel-dashboard.html');
            return;
        }
    }, true); // useCapture = true to intercept before inline onclick handlers

    // Show loader on any form submission (search, filters, etc.)
    document.body.addEventListener('submit', function (e) {
        if (e.target && e.target.tagName === 'FORM') {
            if (e.defaultPrevented) return;
            if (e.target.closest('.modal-overlay') || 
                e.target.closest('#profile-modal-overlay') || 
                e.target.hasAttribute('data-async') || 
                e.target.getAttribute('onsubmit') === 'return false;') {
                return;
            }
            showGlobalLoader();
        }
    });

    // Hide loader once the page finishes loading
    window.addEventListener('load', hideGlobalLoader);
    window.addEventListener('pageshow', hideGlobalLoader);

    try {
        const xhr = new XMLHttpRequest();
        const isLocalFile = window.location.protocol === 'file:';
        const url = isLocalFile ? 'menu.html' : 'menu.html?v=' + new Date().getTime();
        xhr.open('GET', url, false); // synchronous request with cache buster if not local file
        xhr.send(null);
        if (xhr.status === 200) {
            const html = xhr.responseText;
            if (headerContainer.tagName === 'BODY') {
                headerContainer.insertAdjacentHTML('afterbegin', html);
            } else {
                headerContainer.innerHTML = html;
            }

            // Set active class based on current page URL (case-insensitive check)
            const currentPage = (window.location.pathname.split('/').pop() || 'admin-dashboard.html').toLowerCase();
            const navLinks = document.querySelectorAll('header nav a');
            navLinks.forEach(link => {
                const href = (link.getAttribute('href') || '').toLowerCase();
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

            // --- PROFILE MODAL LOGIC ---
            const token = localStorage.getItem('token') || localStorage.getItem('jwtToken') || localStorage.getItem('accessToken') || localStorage.getItem('checkinXToken');
            const BASE_URL = 'https://hotel-booking-v3.onrender.com/api';

            // Function to show toast
            function showProfileToast(message, type = 'success') {
                let toastContainer = document.getElementById('pm-toast-container');
                if (!toastContainer) {
                    toastContainer = document.createElement('div');
                    toastContainer.id = 'pm-toast-container';
                    toastContainer.style.cssText = `
                        position: fixed;
                        top: 24px;
                        right: 24px;
                        z-index: 11000;
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        font-family: 'Outfit', 'Inter', sans-serif;
                        pointer-events: none;
                    `;
                    document.body.appendChild(toastContainer);
                }
                
                const toast = document.createElement('div');
                let bgColor = '#10b981'; // success
                let icon = 'fa-circle-check';
                if (type === 'error') {
                    bgColor = '#ef4444';
                    icon = 'fa-circle-xmark';
                } else if (type === 'info' || type === 'warning') {
                    bgColor = '#f59e0b';
                    icon = 'fa-circle-exclamation';
                }
                
                toast.style.cssText = `
                    background-color: ${bgColor};
                    color: #ffffff;
                    padding: 12px 20px;
                    border-radius: 12px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 13px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.25s cubic-bezier(0.34, 1.45, 0.64, 1);
                `;
                
                toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
                toastContainer.appendChild(toast);
                
                setTimeout(() => {
                    toast.style.opacity = '1';
                    toast.style.transform = 'translateY(0)';
                }, 10);
                
                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        toast.remove();
                    }, 300);
                }, 3000);
            }

            // Function to load and render staff profile in header navbar
            async function updateHeaderProfile() {
                if (!token) return;
                try {
                    const response = await fetch(`${BASE_URL}/staff/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (response.ok) {
                        const result = await response.json();
                        const user = result.data || result;
                        
                        const btnProfile = document.getElementById('btn-profile');
                        if (btnProfile) {
                            if (user.avatarUrl) {
                                btnProfile.innerHTML = `<img src="${user.avatarUrl}" alt="${user.fullName || ''}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
                                btnProfile.style.padding = '0';
                            } else if (user.fullName) {
                                const parts = user.fullName.trim().split(' ');
                                const initials = parts.map(p => p[0]).join('').substring(0, 2).toUpperCase();
                                btnProfile.innerText = initials || 'AD';
                            }
                        }
                        window.currentUserData = user;
                    }
                } catch (e) {
                    console.error("Error loading header profile details:", e);
                }
            }

            // Initial fetch to show profile in header
            updateHeaderProfile();

            // Modal elements
            const modalOverlay = document.getElementById('profile-modal-overlay');
            const btnProfile = document.getElementById('btn-profile');
            const btnCloseModal = document.getElementById('pm-close-btn');
            const btnCancelModal = document.getElementById('pm-btn-cancel');
            const btnSaveModal = document.getElementById('pm-btn-save');
            
            const inputUsername = document.getElementById('pm-username');
            const inputEmail = document.getElementById('pm-email');
            const inputFullName = document.getElementById('pm-fullName');
            const inputPhone = document.getElementById('pm-phone');
            const selectGender = document.getElementById('pm-gender');
            const inputDateOfBirth = document.getElementById('pm-dateOfBirth');
            
            const avatarImg = document.getElementById('pm-avatar-img');
            const avatarInput = document.getElementById('pm-avatar-input');
            const btnSelectAvatar = document.getElementById('pm-btn-select-avatar');
            const btnSaveAvatar = document.getElementById('pm-btn-save-avatar');
            const avatarClickzone = document.getElementById('pm-avatar-clickzone');

            // Open modal logic (capture phase to intercept and override page-level redirect scripts)
            document.addEventListener('click', async (e) => {
                const btn = e.target.closest('#btn-profile');
                if (btn) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();

                    if (!token) {
                        showProfileToast("Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn!", "error");
                        return;
                    }

                    // Reload user details before showing modal to ensure fresh data
                    try {
                        showGlobalLoader();
                        const response = await fetch(`${BASE_URL}/staff/me`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        hideGlobalLoader();
                        if (response.ok) {
                            const result = await response.json();
                            const user = result.data || result;
                            
                            // Populate fields
                            inputUsername.value = user.username || '';
                            inputEmail.value = user.email || '';
                            inputFullName.value = user.fullName || '';
                            inputPhone.value = user.phone || '';
                            if (user.gender) selectGender.value = user.gender;
                            if (user.dateOfBirth) {
                                inputDateOfBirth.value = user.dateOfBirth.substring(0, 10);
                            } else {
                                inputDateOfBirth.value = '';
                            }
                            
                            // Avatar preview
                            avatarImg.src = user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || 'default'}`;
                            
                            // Reset state of avatar buttons
                            avatarInput.value = '';
                            btnSaveAvatar.style.display = 'none';

                            // Show modal overlay
                            modalOverlay.classList.add('active');
                        } else {
                            showProfileToast("Không thể tải thông tin cá nhân!", "error");
                        }
                    } catch (err) {
                        hideGlobalLoader();
                        console.error("Fetch profile error:", err);
                        showProfileToast("Không thể kết nối máy chủ để tải thông tin!", "error");
                    }
                }
            }, true); // useCapture = true

            // Close modal helper
            function closeModal() {
                if (modalOverlay) {
                    modalOverlay.classList.remove('active');
                }
            }

            if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
            if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);
            
            // Close modal when clicking outside dialog
            if (modalOverlay) {
                modalOverlay.addEventListener('click', (e) => {
                    if (e.target === modalOverlay) {
                        closeModal();
                    }
                });
            }

            // Avatar select file logic
            function triggerAvatarSelect() {
                avatarInput.click();
            }

            if (btnSelectAvatar) btnSelectAvatar.addEventListener('click', triggerAvatarSelect);
            if (avatarClickzone) avatarClickzone.addEventListener('click', triggerAvatarSelect);

            if (avatarInput) {
                avatarInput.addEventListener('change', function () {
                    if (this.files && this.files[0]) {
                        const file = this.files[0];
                        if (file.size > 5 * 1024 * 1024) {
                            showProfileToast("Kích thước tệp vượt quá 5MB. Vui lòng chọn tệp khác!", "error");
                            this.value = '';
                            return;
                        }

                        const reader = new FileReader();
                        reader.onload = function (e) {
                            avatarImg.src = e.target.result;
                        };
                        reader.readAsDataURL(file);
                        btnSaveAvatar.style.display = 'inline-flex';
                    }
                });
            }

            // Save avatar logic
            if (btnSaveAvatar) {
                btnSaveAvatar.addEventListener('click', async () => {
                    const file = avatarInput.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append('file', file);

                    try {
                        btnSaveAvatar.disabled = true;
                        btnSaveAvatar.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Lưu...`;
                        
                        const response = await fetch(`${BASE_URL}/staff/me/avatar`, {
                            method: 'PUT',
                            headers: { 'Authorization': `Bearer ${token}` },
                            body: formData
                        });

                        const result = await response.json();
                        btnSaveAvatar.disabled = false;
                        btnSaveAvatar.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Lưu ảnh đại diện`;

                        if (response.ok && result.success) {
                            showProfileToast("Cập nhật ảnh đại diện thành công!", "success");
                            btnSaveAvatar.style.display = 'none';
                            avatarInput.value = '';
                            updateHeaderProfile();
                        } else {
                            showProfileToast(result.message || "Không thể cập nhật ảnh đại diện!", "error");
                        }
                    } catch (err) {
                        btnSaveAvatar.disabled = false;
                        btnSaveAvatar.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Lưu ảnh đại diện`;
                        console.error("Upload avatar error:", err);
                        showProfileToast("Lỗi kết nối khi tải ảnh đại diện!", "error");
                    }
                });
            }

            // Save profile details logic
            if (btnSaveModal) {
                btnSaveModal.addEventListener('click', async (e) => {
                    e.preventDefault();
                    
                    const fullName = inputFullName.value.trim();
                    const phone = inputPhone.value.trim();
                    const gender = selectGender.value;
                    const dateOfBirth = inputDateOfBirth.value;

                    if (!fullName) {
                        showProfileToast("Vui lòng điền Họ và tên!", "warning");
                        return;
                    }
                    if (!phone) {
                        showProfileToast("Vui lòng điền Số điện thoại!", "warning");
                        return;
                    }
                    if (!dateOfBirth) {
                        showProfileToast("Vui lòng chọn Ngày sinh!", "warning");
                        return;
                    }

                    const payload = {
                        fullName: fullName,
                        phone: phone,
                        gender: gender,
                        dateOfBirth: dateOfBirth
                    };

                    try {
                        btnSaveModal.disabled = true;
                        btnSaveModal.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Đang lưu...`;

                        const response = await fetch(`${BASE_URL}/staff/me`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(payload)
                        });

                        const result = await response.json();
                        btnSaveModal.disabled = false;
                        btnSaveModal.innerHTML = `Lưu thay đổi`;

                        if (response.ok && result.success) {
                            showProfileToast("Cập nhật thông tin thành công!", "success");
                            closeModal();
                            updateHeaderProfile();
                        } else {
                            showProfileToast(result.message || "Cập nhật thông tin thất bại!", "error");
                        }
                    } catch (err) {
                        btnSaveModal.disabled = false;
                        btnSaveModal.innerHTML = `Lưu thay đổi`;
                        console.error("Save profile error:", err);
                        showProfileToast("Lỗi kết nối khi lưu thông tin!", "error");
                    }
                });
            }
        } else {
            console.error('Error loading menu: status ' + xhr.status);
        }
    } catch (err) {
        console.error('Error loading menu synchronously:', err);
    }
});
