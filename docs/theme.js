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
            '--login-bg': 'url(ubuntu_theme.png)'
        },
        hacker: {
            '--bg-color': '#0a0a0a',
            '--text-color': '#00ff00',
            '--accent-color': '#00ff00',
            '--card-bg': 'rgba(0, 0, 0, 0.9)',
            '--button-bg': '#003300',
            '--border-color': '#00ff00',
            '--login-bg': 'radial-gradient(circle, rgba(7, 51, 7, 1) 0%, rgba(0, 0, 0, 1) 100%)'
        },
        kali : {
            '--bg-color': '#0a0a2e',
            '--text-color': '#6cb4ee',
            '--accent-color': '#6cb4ee',
            '--card-bg': 'rgba(5, 5, 30, 0.9)',
            '--button-bg': '#1a1a4e',
            '--border-color': '#4a6c8f',
            '--login-bg': 'radial-gradient(circle, rgba(20, 161, 255, 1) 0%, rgba(0, 108, 138, 1) 100%)'
        }
    };

    const colors = themes[theme];
    for (const [property, value] of Object.entries(colors)){
        root.style.setProperty(property, value);
    }
})();