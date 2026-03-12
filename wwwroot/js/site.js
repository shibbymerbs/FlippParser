// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Add theme toggle button to navbar
    const container = document.getElementById('darkModeContainer');
    if (container) {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'form-check form-switch';
        themeToggle.innerHTML = `
            <input class="form-check-input" type="checkbox" id="darkModeToggle">
            <label class="form-check-label text-nowrap ms-2" for="darkModeToggle">Dark Mode</label>
        `;
        container.appendChild(themeToggle);
    }

    // Get toggle element
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        // Set checkbox state based on current theme
        toggle.checked = document.documentElement.getAttribute('data-theme') === 'dark';

        // Toggle theme on click
        toggle.addEventListener('change', function () {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
