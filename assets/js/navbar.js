document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.querySelector('.nav-toggle');
    var pageNav = document.querySelector('.pageMenu nav');
    var siteNav = document.querySelector('.siteMenu nav');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            toggleBtn.classList.toggle('active');
            if (pageNav) pageNav.classList.toggle('open');
            if (siteNav) siteNav.classList.toggle('open');
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
        }
    });
});
