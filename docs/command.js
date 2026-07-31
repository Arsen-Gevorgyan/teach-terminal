let currentLesson = 1;

function processCommand(command) {
    const parts = command.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Check for invalid options (flags starting with -)
    const invalidFlag = args.find(arg => arg.startsWith('-'));
    
    if (currentLesson === 1 && cmd === 'pwd') {
        if (invalidFlag) {
            return 'pwd: ' + invalidFlag + ': invalid option\npwd: usage: pwd';
        }
        currentLesson = 2;
        return '/home/src\nCorrect!';
    }

    switch (cmd) {
        case 'help':
            if (invalidFlag) {
                return 'help: ' + invalidFlag + ': invalid option\nhelp: usage: help';
            }
            return 'Available commands:\nhelp - show this message\nclear - clear the terminal\npwd - print working directory';
        case 'pwd':
            if (invalidFlag) {
                return 'pwd: ' + invalidFlag + ': invalid option\npwd: usage: pwd';
            }
            return '/home/src';
        case 'clear':
            if (invalidFlag) {
                return 'clear: ' + invalidFlag + ': invalid option\nclear: usage: clear';
            }
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