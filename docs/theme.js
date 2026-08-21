(function () {
    const theme = localStorage.getItem('selectedTheme') || 'ubuntu';
    const root = document.documentElement;

    const themes = {
        ubuntu: {
            '--bg-color': '#300a24',
            '--text-color': '#ffffff',
            '--accent-color': '#00ff88',
            '--card-bg': 'rgba(30, 5, 22, 0.9)',
            '--button-bg': '#4a1a3a',
            '--border-color': '#5c204a',
            '--login-bg': 'url(ubuntu_theme.png)',
            '--command-text': '#ffaa00',
            '--dir-color': '#4a9eff',
            '--file-color': '#ffffff',
            '--exec-color': '#00ff88'
        },
        hacker: {
            '--bg-color': '#0a0a0a',
            '--text-color': '#00ff00',
            '--accent-color': '#00ff00',
            '--card-bg': 'rgba(0, 0, 0, 0.9)',
            '--button-bg': '#003300',
            '--border-color': '#00ff00',
            '--login-bg': 'radial-gradient(circle, rgba(7, 51, 7, 1) 0%, rgba(0, 0, 0, 1) 100%)',
            '--command-text': '#ffaa00',
            '--dir-color': '#00ff00',
            '--file-color': '#00cc00',
            '--exec-color': '#ffff00'
        },
        kali: {
            '--bg-color': '#0a0a2e',
            '--text-color': '#6cb4ee',
            '--accent-color': '#6cb4ee',
            '--card-bg': 'rgba(5, 5, 30, 0.9)',
            '--button-bg': '#1a1a4e',
            '--border-color': '#4a6c8f',
            '--login-bg': 'radial-gradient(circle, rgba(20, 161, 255, 1) 0%, rgb(0, 52, 66) 100%)',
            '--command-text': '#ffaa00',
            '--dir-color': '#6cb4ee',
            '--file-color': '#ffffff',
            '--exec-color': '#ff4444'
        }
    };

    const colors = themes[theme];
    for (const [property, value] of Object.entries(colors)) {
        root.style.setProperty(property, value);
    }
})();