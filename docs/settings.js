const buttons = document.querySelectorAll('.btn-select');
const cards = document.querySelectorAll('.theme-card');
const themeNames = ['ubuntu', 'hacker', 'kali'];

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        cards.forEach(card => {
            card.classList.remove('selected');
        });
        cards[index].classList.add('selected');
        localStorage.setItem('selectedTheme', themeNames[index]);

        location.reload();

    });
});

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('selectedTheme');
    themeNames.forEach((themeName, index) => {
        if (themeName === saved) {
            cards[index].classList.add('selected');
        }
    })
});