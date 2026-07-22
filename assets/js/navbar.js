document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.querySelector('.nav-toggle');
    var pageNav = document.querySelector('.pageMenu nav');
    var siteNav = document.querySelector('.siteMenu nav');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            var isOpen = toggleBtn.classList.toggle('active');
            if (pageNav) pageNav.classList.toggle('open');
            if (siteNav) siteNav.classList.toggle('open');
            toggleBtn.setAttribute('aria-expanded', String(isOpen));
        });

        // Collapse the open menu and return focus to the toggle.
        function closeNav() {
            toggleBtn.classList.remove('active');
            if (pageNav) pageNav.classList.remove('open');
            if (siteNav) siteNav.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }

        // Escape closes the open mobile menu. Guarded on the open state so it is
        // a no-op on desktop, where the menu is never toggled. (The collapsed nav
        // is display:none, so there is no keyboard trap to escape otherwise.)
        document.addEventListener('keydown', function (event) {
            if ((event.key === 'Escape' || event.key === 'Esc') &&
                toggleBtn.classList.contains('active')) {
                closeNav();
                toggleBtn.focus();
            }
        });
    }

    // Highlight the current page link
    var currentPath = window.location.pathname;
    var pageLinks = document.querySelectorAll('.pageMenu nav a');
    pageLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        // Resolve relative href to absolute for comparison
        var a = document.createElement('a');
        a.href = href;
        if (a.pathname === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
});
