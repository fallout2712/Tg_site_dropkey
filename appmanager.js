function loadMenu() {
    document.querySelectorAll('.bottom-menu button').forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Приховати всі вкладки
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Показати вибрану вкладку
            document.getElementById(tabId).classList.add('active');

            // Деактивувати всі кнопки
            document.querySelectorAll('.bottom-menu button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Активувати вибрану кнопку
            this.classList.add('active');
        });
    });
}
window.loadMenu = loadMenu;