const hiddenInput = document.getElementById('hidden-input');
const inputText = document.querySelector('.input-text');
const terminal = document.getElementById('terminal');
const outputArea = document.getElementById('output-area');
const inputLine = document.getElementById('input-line');
const promptSpan = document.querySelector('.prompt');

var username = '';
var machinename = '';
var promptText = '';

promptSpan.textContent = promptText;

let passwordMode = false;

function setPasswordMode(mode) {
    passwordMode = mode;
}

function updatePrompt(user, machine) {
    username = user;
    machinename = machine;
    promptText = username + '@' + machinename + ":~$ ";
    promptSpan.textContent = promptText;
}

// window.addEventListener('DOMContentLoaded', () => {
//     showLecture([
//         'Welcome to Lesson 1',
//         'pwd - print working directory',
//         'Show current directory',
//         '',
//         'Now type: pwd'
//     ]);
// });

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

    if (passwordMode) {
        inputText.textContent = '*'.repeat(text.length);
        inputText.className = 'input-text';
    } else {
        inputText.textContent = text;
        const typedCommand = text.trim().split(/\s+/)[0];
        if (isValidCommand(typedCommand)) {
            inputText.className = 'input-text valid-command';
        } else {
            inputText.className = 'input-text';
        }
    }
});

function isValidCommand(word) {
    const validCommands = ['pwd','clear','help'];
    return validCommands.includes(word.toLowerCase());
}

hiddenInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const command = hiddenInput.value.trim();
        const fullCommand = hiddenInput.value;

        console.log('Enter pressed, command:', command);

        const commandLine = document.createElement('div');
        commandLine.textContent = promptText + fullCommand;

        outputArea.insertBefore(commandLine, inputLine);

        if (command) {
            commandLine.classList.add('command-line');
            const result = processCommand(command);
            if (result) {
                const outputLine = document.createElement('div');
                outputLine.innerHTML = result.replace(/\n/g, '<br>');
                outputArea.insertBefore(outputLine, inputLine);
            }
        }

        hiddenInput.value = '';
        inputText.textContent = '';
        console.log('After clear, inputText:', inputText.textContent);
        trimLines();


        inputLine.scrollIntoView({ block: 'nearest' });
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

function showLecture(lines) {
    lines.forEach(line => {
        const div = document.createElement('div');
        div.textContent = line;
        outputArea.insertBefore(div, inputLine);
    });
}