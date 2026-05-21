// js/auth.js

function verificarSesion() {
    const isAuthenticated = localStorage.getItem('tecmm_auth');
    const currentPage = window.location.pathname.split('/').pop();

    // Si no está logueado y no está en el login, expulsarlo al login
    if (!isAuthenticated && currentPage !== 'login.html') {
        window.location.href = 'login.html';
    }
    
    // Si ya está logueado e intenta entrar al login, mandarlo al dashboard
    if (isAuthenticated && currentPage === 'login.html') {
        window.location.href = 'dashboard.html';
    }

    // Colocar el correo del usuario en el menú lateral si existe el elemento
    const userEmailSpan = document.getElementById('sidebar-user-email');
    if(userEmailSpan && isAuthenticated) {
        userEmailSpan.innerText = localStorage.getItem('tecmm_user');
    }
}

function iniciarSesion(email) {
    localStorage.setItem('tecmm_auth', 'true');
    localStorage.setItem('tecmm_user', email);
    window.location.href = 'dashboard.html'; // Cambia de página
}

function cerrarSesion() {
    localStorage.removeItem('tecmm_auth');
    localStorage.removeItem('tecmm_user');
    window.location.href = 'login.html'; // Cambia de página
}

// Ejecutar validación apenas cargue el script
verificarSesion();