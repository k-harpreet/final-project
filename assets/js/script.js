document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('button');
    const mobileMenuItems = document.getElementById('mobileMenuItems');

    button.addEventListener('click', function () {
        mobileMenuItems.classList.toggle('hidden');
    });
});