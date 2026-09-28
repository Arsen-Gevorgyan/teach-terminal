(function () {
    const theme = localStorage.getItem('selectedTheme') || 'ubuntu';
    const root = document.documentElement;

    const themes = {
        ubuntu: {
            '--bg-color': '#300a24',
            '--text-color': '#ffffff',
            '--accent-color': '#8ae234',
            '--card-bg': 'rgba(30, 5, 22, 0.9)',
            '--button-bg': '#4a1a3a',
            '--border-color': '#5c204a',
            '--login-bg': 'url(ubuntu_theme.png)',
            '--command-text': '#f9a825',
            '--dir-color': '#729fcf',
            '--file-color': '#d3d7cf',
            '--exec-color': '#8ae234'
        },
        hacker: {
            '--bg-color': '#0d0d0d',
            '--text-color': '#00ff41',
            '--accent-color': '#00ff41',
            '--card-bg': 'rgba(0, 0, 0, 0.95)',
            '--button-bg': '#003300',
            '--border-color': '#00aa00',
            '--login-bg': 'radial-gradient(circle, #0a1f0a 0%, #000000 100%)',
            '--command-text': '#33ff33',
            '--dir-color': '#00ffcc',
            '--file-color': '#ffaa00',
            '--exec-color': '#ff3333'
        },
        kali: {
            '--bg-color': '#1c1c1c',
            '--text-color': '#d0d0d0',
            '--accent-color': '#367bf0',
            '--card-bg': 'rgba(28, 28, 28, 0.95)',
            '--button-bg': '#2a2a2a',
            '--border-color': '#444444',
            '--login-bg': 'radial-gradient(circle, #1a2b47 0%, #0d1117 100%)',
            '--command-text': '#ffaa00',
            '--dir-color': '#5e9eff',
            '--file-color': '#d0d0d0',
            '--exec-color': '#4caf50'
        }
    };

    const colors = themes[theme];
    for (const [property, value] of Object.entries(colors)) {
        root.style.setProperty(property, value);
    }
})();