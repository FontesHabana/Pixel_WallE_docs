document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Obtiene la etiqueta <html>
    const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links'); // Selecciona el contenedor de los enlaces

    // --- Funcionalidad de Cambio de Tema ---

    // Función para establecer el tema
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme); // Guarda la preferencia en localStorage
        updateThemeToggleIcon(theme); // Actualiza el icono
    }

    // Función para actualizar el icono del botón
    function updateThemeToggleIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon'); // Mostrar luna en modo oscuro
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun'); // Mostrar sol en modo claro
        }
    }

    // Cargar el tema preferido al iniciar
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Si no hay preferencia guardada, usar la preferencia del sistema
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDarkMode ? 'dark' : 'light');
    }

    // Escuchar el evento click del botón de tema
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Opcional: Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
         // Solo cambiar si el usuario no ha elegido explícitamente un tema
        if (!localStorage.getItem('theme')) {
             setTheme(e.matches ? 'dark' : 'light');
        }
    });


    // --- Funcionalidad del Menú Móvil ---

    // Escuchar el click en el botón de hamburguesa
    mobileMenuToggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Alterna la clase 'active' para mostrar/ocultar
    });

    // Opcional: Cerrar el menú si se hace clic en un enlace (navegación)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

     // Opcional: Cerrar el menú si se hace clic fuera de él (simple aproximación)
     // Podrías necesitar una lógica más sofisticada para no cerrar al hacer clic en el toggle
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = mobileMenuToggleBtn.contains(event.target);

        if (navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
            navLinks.classList.remove('active');
        }
    });

});