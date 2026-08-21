var loginUser = localStorage.getItem('loginUser') || 'student';
var loginMachine = localStorage.getItem('loginMachine') || 'linux';

window.fs = new FileSystem(loginUser, loginMachine);

function processCommand(input) {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const invalidFlag = args.find(arg => arg.startsWith('-'));

    switch (cmd) {
        case 'pwd':
            if (invalidFlag) {
                return 'bash: pwd: ' + invalidFlag.slice(1) + ': invalid option\npwd: usage: pwd [-LP]';
            }
            if (args.length > 0) {
                return 'bash: pwd: too many arguments';
            }
            return fs.pwd();

        case 'ls':
            const badFlag = args.find(arg => arg.startsWith('-') && arg !== '-l');
            if (badFlag) {
                return 'ls: invalid option -- \'' + badFlag.slice(1) + '\'\nTry \'ls --help\' for more information.';
            }
            if (args.length === 0 || (args.length === 1 && args[0] === '-l')) {
                return args[0] === '-l' ? fs.lsDetail() : fs.ls();
            }
            if (args[0] && !args[0].startsWith('-')) {
                const target = fs.resolve(args[0]);
                if (!target) {
                    return 'ls: cannot access \'' + args[0] + '\': No such file or directory';
                }
                if (!target.isDirectory) {
                    return args[0];
                }
                return target.getChildren().map(c => c.fileName).join('  ');
            }
            return 'ls: usage: ls [-l] [path]';

        case 'cd':
            if (invalidFlag) {
                return 'bash: cd: ' + invalidFlag.slice(1) + ': invalid option\ncd: usage: cd [-L|[-P [-e]]] [-@] [dir]';
            }
            if (args.length > 1) {
                return 'bash: cd: too many arguments';
            }
            return fs.cd(args[0] || '~');

        case 'mkdir':
            if (invalidFlag) {
                return 'mkdir: invalid option -- \'' + invalidFlag.slice(1) + '\'\nTry \'mkdir --help\' for more information.';
            }
            if (!args[0]) {
                return 'mkdir: missing operand\nTry \'mkdir --help\' for more information.';
            }
            return fs.mkdir(args[0]);

        case 'touch':
            if (invalidFlag) {
                return 'touch: invalid option -- \'' + invalidFlag.slice(1) + '\'\nTry \'touch --help\' for more information.';
            }
            if (!args[0]) {
                return 'touch: missing file operand\nTry \'touch --help\' for more information.';
            }
            return fs.touch(args[0]);

        case 'clear':
            if (invalidFlag) {
                return 'clear: invalid option -- \'' + invalidFlag.slice(1) + '\'\nUsage: clear [options]\nOptions:\n  -T TERM     use this instead of $TERM\n  -V          print curses-version\n  -x          do not try to clear scrollback';
            }
            clearOutput();
            return '';

        case 'help':
            if (args.length === 0) return getHelpSummary();
            if (args[0] === '--help') return getHelpUsage();
            return getCommandHelp(args[0]);

        default:
            return 'bash: ' + cmd + ': command not found';
    }
}

function clearOutput() {
    const outputArea = document.getElementById('output-area');
    const inputLine = document.getElementById('input-line');
    outputArea.querySelectorAll('div').forEach(div => {
        if (div !== inputLine) div.remove();
    });
}

function getCommandHelp(name) {
    switch (name) {
        case 'pwd':
            return 'pwd: pwd [-LP]\n    Print the current working directory.\n\n    Options:\n      -L  print logical path\n      -P  print physical path';
        case 'cd':
            return 'cd: cd [-L|[-P [-e]]] [-@] [dir]\n    Change the shell working directory.\n\n    Options:\n      -L  force symbolic links to be followed\n      -P  use physical directory structure';
        case 'ls':
            return 'ls: ls [OPTION]... [FILE]...\n    List directory contents.\n\n    Options:\n      -l  use long listing format';
        case 'mkdir':
            return 'mkdir: mkdir [OPTION]... DIRECTORY...\n    Create directories.\n\n    Options:\n      -p  make parent directories as needed';
        case 'touch':
            return 'touch: touch [OPTION]... FILE...\n    Update file timestamps.\n\n    Options:\n      -c  do not create any files';
        case 'clear':
            return 'clear: clear [options]\n    Clear the terminal screen.\n\n    Options:\n      -V  print curses-version\n      -x  do not try to clear scrollback';
        default:
            return 'help: no help topics match \'' + name + '\'.  Try \'help help\' or \'man -k ' + name + '\'.';
    }
}

function getHelpSummary() {
    return 'Available commands\n' +
        '  cd:       Change the shell working directory\n' +
        '  clear:       Clear the terminal screen\n' +
        '  help:       Display helpful information\n' +
        '  ls:       List directory contents\n' +
        '  mkdir:       Create directories\n' +
        '  pwd:      Print the current working directory\n' +
        '  touch:      Create empty files';
}

function getHelpUsage() {
    return 'help: help [-dms] [pattern ...]\n    Display helpful information about builtin commands.';
}
