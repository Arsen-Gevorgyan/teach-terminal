const hiddenInput = document.getElementById('hidden-input');
const inputText = document.querySelector('.input-text');


const terminal = document.getElementById('terminal');
const outputArea = document.getElementById('output-area');
const inputLine = document.getElementById('input-line');
const promptSpan = document.querySelector('.prompt');

const commandHistory = [];
let historyIndex = -1;

let currentIndex = '';
let cursorPos = 0;

var loginUser = localStorage.getItem('loginUser') || 'student';
var loginMachine = localStorage.getItem('loginMachine') || 'linux';

window.commandHistory = commandHistory;


hiddenInput.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Home' || event.key === 'End') {
        setTimeout(() => {
            cursorPos = hiddenInput.selectionStart;
            renderInput();
        }, 0);
    }

    if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (commandHistory.length === 0) return;


        if (historyIndex === -1) {
            currentIndex = hiddenInput.value;
            historyIndex = commandHistory.length - 1;
        }
        else if (historyIndex > 0) {
            historyIndex--;
        }


        hiddenInput.value = commandHistory[historyIndex];
        cursorPos = hiddenInput.value.length;
        renderInput();
        return;
    }

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex === -1) return;

        historyIndex++;
        if (historyIndex >= commandHistory.length) {
            historyIndex = -1;
            hiddenInput.value = currentIndex;
        }
        else {
            hiddenInput.value = commandHistory[historyIndex];
        }

        cursorPos = hiddenInput.value.length;
        renderInput();
        return;
    }

    if (event.key === 'Tab') {
        event.preventDefault();
        autocomplete();
        return;
    }

    if (event.key === 'Enter') {
        event.preventDefault();

        let fullCommand = hiddenInput.value;
        let command = fullCommand.trim();

        // expand !! and !n
        if (command === '!!') {
            if (commandHistory.length > 0) {
                fullCommand = commandHistory[commandHistory.length - 1];
                command = fullCommand.trim();
            }
        }
        else if (/^!\d+$/.test(command)) {
            const n = parseInt(command.slice(1));
            if (n > 0 && n <= commandHistory.length) {
                fullCommand = commandHistory[n - 1];
                command = fullCommand.trim();
            }
        }

        if (fullCommand.trim() !== '') {
            commandHistory.push(fullCommand);
        }

        historyIndex = -1;
        currentIndex = '';

        const commandLine = document.createElement('div');
        commandLine.innerHTML = '<span class="prompt">' + promptSpan.textContent + '</span><span class="command-text">' + fullCommand + '</span>';
        outputArea.insertBefore(commandLine, inputLine);

        if (command) {
            const result = processCommand(command);

            if (result !== null && result !== undefined && result !== '') {
                const outputLine = document.createElement('div');
                outputLine.innerHTML = result.replace(/\n/g, '<br>');
                outputArea.insertBefore(outputLine, inputLine);
            }

            updatePrompt();
        }

        hiddenInput.value = '';
        cursorPos = 0;
        inputText.textContent = '';

        renderInput();
        trimLines();
        setTimeout(scrollToBottom, 10);
    }
});

function updatePrompt() {
    const cwdPath = fs.pwd();
    const homePath = '/home/' + loginUser;

    let displayPath;

    if (cwdPath === homePath) {
        displayPath = '~';
    }
    else if (cwdPath.startsWith(homePath + '/')) {
        displayPath = '~' + cwdPath.slice(homePath.length);
    }
    else {
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
renderInput();

hiddenInput.addEventListener('input', () => {
    let text = hiddenInput.value;

    if (text.length > 100) {
        text = text.slice(0, 100);
        hiddenInput.value = text;
    }

    cursorPos = hiddenInput.selectionStart;
    renderInput();
});

function renderInput() {
    const text = hiddenInput.value;
    const before = text.slice(0, cursorPos);
    const after = text.slice(cursorPos);

    const parts = text.split(/\s+/);
    const isFirstWorldValid = parts.length > 0 && parts[0] && isValidCommand(parts[0]);

    if (isFirstWorldValid) {
        const cmdEnd = parts[0].length;

        if (cursorPos <= cmdEnd) {
            const beforeCmd = before;
            const afterCmd = text.slice(cursorPos, cmdEnd);
            const rest = text.slice(cmdEnd);

            inputText.innerHTML = '<span class="valid-command">' + beforeCmd + '<span class="cursor">█</span>' + afterCmd + '</span>' + rest;
        }
        else {
            const beforeText = text.slice(0, cursorPos);
            const afterText = text.slice(cursorPos);

            inputText.innerHTML = '<span class="valid-command">' + parts[0] + '</span>' + beforeText.slice(cmdEnd) + '<span class="cursor">█</span>' + afterText;
        }
    }
    else {
        inputText.innerHTML = before + '<span class="cursor">█</span>' + after;
    }
}

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
    const validCommands = ['pwd', 'ls', 'cd', 'mkdir', 'touch', 'echo', 'cat', 'rm', 'cp', 'mv', 'clear', 'help', 'history'];
    return validCommands.includes(word.toLowerCase());
}

function getCompletions(partial, isCommand) {
    if (isCommand) {
        const commands = ['pwd', 'ls', 'cd', 'mkdir', 'touch', 'echo', 'cat', 'rm', 'cp', 'mv', 'clear', 'help', 'history'];
        return commands.filter(c => c.startsWith(partial.toLowerCase()));
    }

    const children = fs.cwd.getChildren();
    return children.map(c => c.fileName).filter(name => name.startsWith(partial));
}

function autocomplete() {
    const text = hiddenInput.value;

    let localCursorPos = hiddenInput.selectionStart;

    const beforeCursor = text.slice(0, localCursorPos);
    const afterCursor = text.slice(localCursorPos);

    const lastSpace = beforeCursor.lastIndexOf(' ');

    const currentWord = beforeCursor.slice(lastSpace + 1);
    const textBeforeWord = beforeCursor.slice(0, lastSpace + 1);

    const isCommand = textBeforeWord.trim() === '';
    const completions = getCompletions(currentWord, isCommand);

    if (completions.length === 0) {
        return;
    }

    let completedWord;

    if (completions.length === 1) {
        completedWord = completions[0];

        if (isCommand) {
            completedWord += ' ';
        }
        else {
            const child = fs.cwd.getChild(completions[0]);

            if (child && child.isDirectory) {
                completedWord += '/';
            }
            else {
                completedWord += ' ';
            }
        }
    }
    else {
        let prefix = completions[0];

        for (const c of completions) {
            while (!c.startsWith(prefix)) {
                prefix = prefix.slice(0, -1);
            }
        }

        completedWord = prefix;

        if (completedWord === currentWord) return;
    }

    const newText = textBeforeWord + completedWord + afterCursor;
    hiddenInput.value = newText;

    const newPos = textBeforeWord.length + completedWord.length;
    hiddenInput.setSelectionRange(newPos, newPos);

    cursorPos = newPos;
    renderInput();
}