const hiddenInput = document.getElementById('hidden-input');
const inputText = document.querySelector('.input-text');
const terminal = document.getElementById('terminal');
const outputArea = document.getElementById('output-area');
const inputLine = document.getElementById('input-line');
const promptSpan = document.querySelector('.prompt');

var loginUser = localStorage.getItem('loginUser') || 'student';
var loginMachine = localStorage.getItem('loginMachine') || 'linux';

function updatePrompt() {
    const cwdPath = fs.pwd();
    const homePath = '/home/' + loginUser;

    let displayPath;
    if (cwdPath === homePath) {
        displayPath = '~';
    } else if (cwdPath.startsWith(homePath + '/')) {
        displayPath = '~' + cwdPath.slice(homePath.length);
    } else {
        displayPath = cwdPath;
    }

    promptSpan.textContent = loginUser + '@' + loginMachine + ':' + displayPath + '$ ';
}

window.addEventListener('DOMContentLoaded', () => {
    updatePrompt();
});

terminal.addEventListener('click', () => {
    hiddenInput.focus();
});

hiddenInput.focus();

hiddenInput.addEventListener('input', () => {
    let text = hiddenInput.value;
    if (text.length > 100) {
        text = text.slice(0, 100);
        hiddenInput.value = text;
    }

    const parts = text.split(/\s+/);
    if (parts.length > 0 && parts[0]) {
        if (isValidCommand(parts[0])) {
            const coloredCommand = '<span class="valid-command">' + parts[0] + '</span>';
            const rest = text.slice(parts[0].length);
            inputText.innerHTML = coloredCommand + rest;
        }
        else {
            inputText.textContent = text;
        }
    }
    else {
        inputText.textContent = '';
    }
});

hiddenInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const command = hiddenInput.value.trim();
        const fullCommand = hiddenInput.value;

        const commandLine = document.createElement('div');
        commandLine.innerHTML = '<span class="prompt">' + promptSpan.textContent + '</span><span class="command-text">' + fullCommand + '</span>';
        outputArea.insertBefore(commandLine, inputLine);

        if (command) {
            const result = processCommand(command);
            if (result !== null && result !== undefined) {
                const outputLine = document.createElement('div');
                outputLine.innerHTML = result.replace(/\n/g, '<br>');
                outputArea.insertBefore(outputLine, inputLine);
            }
            updatePrompt();
        }

        hiddenInput.value = '';
        inputText.textContent = '';
        trimLines();
        setTimeout(scrollToBottom, 10);
    }
});

function trimLines() {
    const style = getComputedStyle(outputArea);
    const lineHeight = parseFloat(style.lineHeight);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const availableHeight = outputArea.clientHeight - paddingTop - paddingBottom;
    const maxLines = Math.floor(availableHeight / lineHeight);
    const divs = outputArea.querySelectorAll('div');

    while (divs.length >= maxLines) {
        divs[0].remove();
    }
}

function scrollToBottom() {
    outputArea.scrollTop = outputArea.scrollHeight;
}

function isValidCommand(word) {
    const validCommands = ['pwd', 'ls', 'cd', 'mkdir', 'touch', 'clear', 'help'];
    return validCommands.includes(word.toLowerCase());
}