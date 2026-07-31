const inputs = ['username', 'machinename', 'password'];
let currentInput = 0;
let loginUsername = '';
let loginMachinename = '';
let loginPassword = '';
let complete = false;

let originalProcessCommand;

window.addEventListener('DOMContentLoaded', () => {
    originalProcessCommand = processCommand;
    processCommand = function(command) {
        if (complete) {
            return originalProcessCommand(command);
        }
        return handleLogin(command);
    };
    startLogin();
});

function handleLogin(input) {
    const inputed = inputs[currentInput];

    if (inputed === 'username') {
        const error = validateName(input);
        if (error) return error;
        loginUsername = input.toLowerCase();
        currentInput++;
        return 'Enter machine name:';
    }
    if (inputed === 'machinename') {
        const error = validateName(input);
        if (error) return error;
        loginMachinename = input.toLowerCase();
        currentInput++;
        setPasswordMode(true);
        return 'Enter password:';
    }
    if (inputed === 'password') {
        const error = validatePassword(input);
        if (error) return error;
        loginPassword = input;
        currentInput++;
        complete = true;
        setPasswordMode(false);
        updatePrompt(loginUsername, loginMachinename);

        let dots = 0;
        const loadingDiv = document.createElement('div');
        loadingDiv.textContent = 'Loading';
        outputArea.insertBefore(loadingDiv, inputLine);

        const loadingInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            loadingDiv.textContent = 'Loading' + '.'.repeat(dots);
        }, 500);

        setTimeout(() => {
            clearInterval(loadingInterval);
            clearOutput();
            showLecture([
                'Welcome to Lesson 1',
                'pwd - print working directory',
                'Shows current directory',
                '',
                'Now type: pwd'
            ]);
        }, 3000);

        return 'Login successful!';
    }
    return '';
}

function validateName(input) {
    if (input.length < 4) return 'Must be at least 5 characters';
    if (input.length > 10) return 'Must be less than 10 characters';
    if (!/^[a-zA-Z]/.test(input)) return 'Must start with a letter';
    if (!/^[a-zA-Z0-9]+$/.test(input)) return 'Can only contain letters and numbers';
    return null;
}

function validatePassword(input) {
    if (input.length < 7) return 'Must be at least 8 characters';
    if (input.length > 20) return 'Password must be less than 20 characters';
    return null;
}

function startLogin() {
    const div = document.createElement('div');
    div.textContent = 'Enter username:';
    outputArea.insertBefore(div, inputLine);
}