const loginUser = localStorage.getItem('loginUser') || 'student';
const loginMachine = localStorage.getItem('loginMachine') || 'linux';

const fs = new FileSystem(loginUser, loginMachine);

function processCommand(input) {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.splice(1);

    switch (cmd) {
        case 'pwd':
            if (args.length > 0) {
                return 'pwd usage: pwd';
            }
    }
}