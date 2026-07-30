function processCommand(command) {
    const parts = command.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.splice(1);

    switch (cmd) {
        case 'help':
            return 'Available commands:\nhelp\nclear\npwd\nwhoami\ndate\necho\n';
        case 'pwd':
            return '/home/src';
        case 'clear':
            clearOutput();
            return '';
        default:
            return 'command not found: ' + cmd;
    }
}

function clearOutput() {
    const outputArea = document.getElementById('output-area');
    const inputLine = document.getElementById('input-line');
    outputArea.querySelectorAll('div').forEach(div => {
        if (div !== inputLine) div.remove();
    });
}