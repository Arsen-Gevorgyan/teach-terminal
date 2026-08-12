document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const machinename = document.getElementById('machinename').value.trim();
    const password = document.getElementById('password').value;
    const errorAll = document.getElementById('error-all');

    const usernameError = validateName(username);
    if (usernameError) {
        errorAll.textContent = usernameError;
        return;
    }

    const machineError = validateMachine(machinename);
    if (machineError) {
        errorAll.textContent = machineError;
        return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
        errorAll.textContent = passwordError;
        return;
    }

    errorAll.textContent = '';
    localStorage.setItem('loginUser', username.toLowerCase());
    localStorage.setItem('loginMachine', machinename.toLowerCase());
    window.location.href = 'main.html';
});

function validateName(input) {
    if (input.length < 4) return 'Username must be at least 4 characters';
    if (input.length > 9) return 'Username must be less than 10 characters';
    if (!/^[a-zA-Z]/.test(input)) return 'Username must start with a letter';
    if (!/^[a-zA-Z0-9]+$/.test(input)) return 'Username only letters and numbers allowed';
    return null;
}

function validateMachine(input) {
    if (input.length < 4) return 'Machinename must be at least 4 characters';
    if (input.length > 9) return 'Machinename must be less than 10 characters';
    if (!/^[a-zA-Z]/.test(input)) return 'Machinename must start with a letter';
    if (!/^[a-zA-Z0-9]+$/.test(input)) return 'Machinename only letters and numbers allowed';
    return null;
}

function validatePassword(input) {
    if (input.length < 8) return 'Password must be at least 8 characters';
    if (input.length > 19) return 'Password must be less than 20 characters';
    return null;
}