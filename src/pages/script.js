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
        updateThemeToggleIcon(); // Actualiza el icono (no necesita el tema como arg, lee del html)
    }

    // Función para actualizar el icono del botón
    function updateThemeToggleIcon() {
        const icon = themeToggleBtn.querySelector('i');
        const currentTheme = htmlElement.getAttribute('data-theme'); // Lee el tema actual del html

        // Elimina todas las clases de Font Awesome relacionadas con estilos, prefijos y iconos específicos
        icon.classList.remove('fas', 'fa-solid', 'fa-regular', 'fa-sun', 'fa-moon', 'fa-lightbulb');

        // Añade siempre las clases para el bombillo sólido
        icon.classList.add('fa-solid', 'fa-lightbulb');

        // El color se maneja completamente en CSS basándose en el data-theme
        // No necesitamos añadir clases de color aquí en JS
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
        setTheme(newTheme); // Llama a setTheme, que a su vez llama a updateThemeToggleIcon
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
        const isClickInsideHeader = document.querySelector('header').contains(event.target); // Prevent closing when clicking inside header but outside nav/toggle area

        // Solo cierra si se hace clic fuera del menú *y* fuera del botón de toggle *y* fuera del área del header
        // Esto previene cerrar el menú si el clic es en los iconos de utilidad que están dentro de nav-links
        if (navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
             // Opcionalmente, puedes ser aún más específico y chequear si el clic es en algún elemento interactivo dentro del header
            // Pero la lógica actual (no isClickInsideNav, no isClickOnToggle) ya cubre la mayoría de los casos
            navLinks.classList.remove('active');
        }
    });

});