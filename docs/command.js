var loginUser = localStorage.getItem('loginUser') || 'student';
var loginMachine = localStorage.getItem('loginMachine') || 'linux';

window.fs = new FileSystem(loginUser, loginMachine);

function processCommand(input) {
    input = input.trim();
    if (input === '') return '';

    let stdoutRedirect = null;
    let stderrRedirect = null;
    let stdinFile = null;


    const stderrMatch = input.match(/^(.*?)\s+2(>>?)\s+(\S+)\s*$/);
    if (stderrMatch) {

        input = stderrMatch[1].trim();
        stderrRedirect = { type: stderrMatch[2], file: stderrMatch[3] };
    }


    const stdinMatch = input.match(/^(.*?)\s+<\s+(\S+)\s*$/);
    if (stdinMatch) {

        input = stdinMatch[1].trim();

        stdinFile = stdinMatch[2];
    }


    const stdoutMatch = input.match(/^(.*?)\s+(>>?)\s+(\S+)\s*$/);

    if (stdoutMatch) {

        input = stdoutMatch[1].trim();
        stdoutRedirect = { type: stdoutMatch[2], file: stdoutMatch[3] };
    }




    let stdinContent = null;

    if (stdinFile) {

        const readResult = fs.readFile(stdinFile);

        if (readResult.error) {

            return 'bash: ' + stdinFile + ': No such file or directory';
        }

        stdinContent = readResult.content;
    }


    let result = executeCommand(input, stdinContent);



    const isError = result && /^(bash|cat|ls|rm|cp|mv|mkdir|touch|cd|pwd|echo|help|grep|head|tail):/.test(result);



    if (stderrRedirect && isError) {
        const writeResult = fs.writeFile(stderrRedirect.file, result, stderrRedirect.type === '>>');
        if (writeResult.error) return writeResult.error;
        return '';
    }

    if (stdoutRedirect && !isError) {
        const writeResult = fs.writeFile(stdoutRedirect.file, result, stdoutRedirect.type === '>>');
        if (writeResult.error) return writeResult.error;
        return '';
    }

    return result;
}

function executeCommand(input, stdinContent = null) {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const invalidFlag = args.find(arg => arg.startsWith('-'));

    switch (cmd) {
        case 'pwd': {
            if (args.length > 0) {
                const flag = args[0];
                if (flag === '--help') {
                    return 'pwd: pwd [-LP]\n    Print the name of the current working directory.\n\n    Options:\n      -L  print the value of $PWD if it names the current working directory\n      -P  print the physical directory, without any symbolic links\n      --help     display this help and exit\n      --version  output version information and exit';
                }
                if (flag === '--version') {
                    return 'pwd (GNU coreutils) 9.4';
                }
                if (flag === '-L' || flag === '--logical') {
                    return fs.pwd();
                }
                if (flag === '-P' || flag === '--physical') {
                    return fs.pwd();
                }
                if (flag.startsWith('-')) {
                    return 'bash: pwd: ' + flag.slice(1) + ': invalid option\npwd: usage: pwd [-LP]';
                }
            }
            return fs.pwd();
        }


        case 'ls': {
            let showAll = false;
            let showAlmostAll = false;
            let longFormat = false;
            let humanReadable = false;
            let reverse = false;
            let recursive = false;
            let sortBySize = false;
            let sortByTime = false;
            let onePerLine = false;
            let lsPath = null;

            for (let i = 0; i < args.length; i++) {
                const arg = args[i];

                if (arg === '--') {
                    if (i + 1 < args.length) {
                        lsPath = args[i + 1];
                    }
                    break;
                }

                if (arg === '--help') {
                    return getCommandHelp('ls');
                }

                if (arg.startsWith('-') && arg !== '-') {
                    const flags = arg.slice(1).split('');
                    for (const flag of flags) {
                        if (flag === 'a') showAll = true;
                        else if (flag === 'A') showAlmostAll = true;
                        else if (flag === 'l') longFormat = true;
                        else if (flag === 'h') humanReadable = true;
                        else if (flag === 'r') reverse = true;
                        else if (flag === 'R') recursive = true;
                        else if (flag === 'S') sortBySize = true;
                        else if (flag === 't') sortByTime = true;
                        else if (flag === '1') onePerLine = true;
                        else return 'ls: invalid option -- \'' + flag + '\'\nTry \'ls --help\' for more information.';
                    }
                } else {
                    lsPath = arg;
                }
            }

            return fs.formatLs({
                showAll, showAlmostAll, longFormat, humanReadable,
                reverse, recursive, sortBySize, sortByTime, onePerLine, path: lsPath
            });
        }

        case 'cd': {
            if (invalidFlag) {
                return 'bash: cd: ' + invalidFlag.slice(1) + ': invalid option\ncd: usage: cd [-L|[-P [-e]]] [-@] [dir]';
            }
            if (args.length > 1) {
                return 'bash: cd: too many arguments';
            }
            return fs.cd(args[0] || '~');
        }

        case 'mkdir': {
            let mode = null;
            let verbose = false;
            let parents = false;
            const dirs = [];

            for (let i = 0; i < args.length; i++) {
                const arg = args[i];
                if (arg === '-p' || arg === '--parents') {
                    parents = true;
                } else if (arg === '-v' || arg === '--verbose') {
                    verbose = true;
                } else if (arg === '-m' || arg === '--mode') {
                    mode = args[i + 1];
                    i++;
                } else if (arg.startsWith('-')) {
                    return 'mkdir: invalid option -- \'' + arg.slice(1) + '\'\nTry \'mkdir --help\' for more information.';
                } else {
                    dirs.push(arg);
                }
            }

            if (dirs.length === 0) {
                return 'mkdir: missing operand\nTry \'mkdir --help\' for more information.';
            }

            const mkdirResults = [];
            for (const dir of dirs) {
                const result = fs.mkdir(dir, parents, mode, verbose);
                if (result) mkdirResults.push(result);
            }
            return mkdirResults.join('\n');
        }

        case 'touch': {
            let noCreate = false;
            const files = [];

            for (let i = 0; i < args.length; i++) {
                const arg = args[i];
                if (arg === '-c' || arg === '--no-create') {
                    noCreate = true;
                } else if (arg === '-a' || arg === '-m') {
                    continue;
                } else if (arg.startsWith('-')) {
                    return 'touch: invalid option -- \'' + arg.slice(1) + '\'\nTry \'touch --help\' for more information.';
                } else {
                    files.push(arg);
                }
            }

            if (files.length === 0) {
                return 'touch: missing file operand\nTry \'touch --help\' for more information.';
            }

            const touchResults = [];
            for (const file of files) {
                const result = fs.touch(file, noCreate);
                if (result) touchResults.push(result);
            }
            return touchResults.join('\n');
        }

        case 'echo': {
            let noNewline = false;
            let enableEscapes = false;
            const echoParts = [];

            for (let i = 0; i < args.length; i++) {
                const arg = args[i];

                if (arg === '--help') {
                    return getCommandHelp('echo');
                }

                if (arg.startsWith('-') && arg !== '-') {
                    let knownFlag = true;
                    const flags = arg.slice(1).split('');
                    for (const flag of flags) {
                        if (flag === 'n') {
                            noNewline = true;
                        } else if (flag === 'e') {
                            enableEscapes = true;
                        } else if (flag === 'E') {
                            enableEscapes = false;
                        } else {
                            knownFlag = false;
                            break;
                        }
                    }
                    if (!knownFlag) {
                        echoParts.push(arg);
                    }
                } else {
                    echoParts.push(arg);
                }
            }

            let result = echoParts.join(' ');

            if (enableEscapes) {
                result = result
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t')
                    .replace(/\\\\/g, '\\');
            }

            return result;
        }

        case 'cat': {
            let numberAll = false;
            let numberNonBlank = false;
            let squeezeBlank = false;
            let showEnds = false;
            let showTabs = false;
            const catFiles = [];

            for (let i = 0; i < args.length; i++) {
                const arg = args[i];

                if (arg === '--help') {
                    return getCommandHelp('cat');
                }
                if (arg.startsWith('-') && arg !== '-') {
                    const flags = arg.slice(1).split('');
                    for (const flag of flags) {
                        if (flag === 'n') numberAll = true;
                        else if (flag === 'b') numberNonBlank = true;
                        else if (flag === 's') squeezeBlank = true;
                        else if (flag === 'E') showEnds = true;
                        else if (flag === 'T') showTabs = true;
                        else return 'cat: invalid option -- \'' + flag + '\'\nTry \'cat --help\' for more information.';
                    }
                } else {
                    catFiles.push(arg);
                }
            }

            if (catFiles.length === 0) {
                if (stdinContent !== null) {
                    catFiles.push('__stdin__');
                } else {
                    return 'cat: missing operand\nTry \'cat --help\' for more information.';
                }
            }

            const catResults = [];
            let lineNumber = 1;

            for (const file of catFiles) {
                let content;
                if (file === '__stdin__') {
                    content = stdinContent;
                } else {
                    const result = fs.readFile(file);
                    if (result.error) {
                        catResults.push(result.error);
                        continue;
                    }
                    content = result.content || '';
                }
                if (content === '') continue;

                let lines = content.split('\n');

                if (squeezeBlank) {
                    const squeezed = [];
                    let prevBlank = false;
                    for (const line of lines) {
                        const isBlank = line === '';
                        if (isBlank && prevBlank) continue;
                        squeezed.push(line);
                        prevBlank = isBlank;
                    }
                    lines = squeezed;
                }

                const outputLines = [];
                for (const line of lines) {
                    let prefix = '';
                    const isBlank = line === '';

                    if (numberAll || (numberNonBlank && !isBlank)) {
                        prefix = String(lineNumber).padStart(6, ' ') + '\t';
                        lineNumber++;
                    }

                    let processedLine = line;
                    if (showTabs) processedLine = processedLine.replace(/\t/g, '^I');
                    if (showEnds) processedLine = processedLine + '$';

                    outputLines.push(prefix + processedLine);
                }
                catResults.push(outputLines.join('\n'));
            }
            return catResults.join('\n');
        }

        case 'rm': {
            let force = false;
            let interactive = false;
            let recursive = false;
            let verbose = false;
            const rmTargets = [];

            for (let i = 0; i < args.length; i++) {
                const arg = args[i];
                if (arg === '--help') return getCommandHelp('rm');
                if (arg === '--') {
                    for (let j = i + 1; j < args.length; j++) rmTargets.push(args[j]);
                    break;
                }
                if (arg.startsWith('-') && arg !== '-') {
                    const flags = arg.slice(1).split('');
                    for (const flag of flags) {
                        if (flag === 'f') force = true;
                        else if (flag === 'i') interactive = true;
                        else if (flag === 'r' || flag === 'R') recursive = true;
                        else if (flag === 'v') verbose = true;
                        else if (flag === 'd') continue;
                        else return 'rm: invalid option -- \'' + flag + '\'\nTry \'rm --help\' for more information.';
                    }
                } else {
                    rmTargets.push(arg);
                }
            }

            if (rmTargets.length === 0) {
                return 'rm: missing operand\nTry \'rm --help\' for more information.';
            }

            const rmResults = [];
            for (const target of rmTargets) {
                const result = fs.remove(target, recursive);
                if (result.error) {
                    if (!force) rmResults.push(result.error);
                } else if (verbose) {
                    rmResults.push("removed '" + target + "'");
                }
            }
            return rmResults.join('\n');
        }

        case 'cp': {
            let recursive = false;
            let force = false;
            let interactive = false;
            let verbose = false;
            let noClobber = false;
            const cpArgs = [];

            for (let i = 0; i < args.length; ++i) {
                const arg = args[i];
                if (arg === '--help') {
                    return getCommandHelp('cp');
                }
                if (arg === '--') {
                    for (let j = i + 1; j < args.length; j++) cpArgs.push(args[j]);
                    break;
                }
                if (arg.startsWith('-') && arg !== '-') {
                    const flags = arg.slice(1).split('');
                    for (const flag of flags) {
                        if (flag === 'r' || flag === 'R') recursive = true;
                        else if (flag === 'f') force = true;
                        else if (flag === 'i') interactive = true;
                        else if (flag === 'v') verbose = true;
                        else if (flag === 'n') noClobber = true;
                        else return 'cp: invalid option -- \'' + flag + '\'\n Try \'cp --help\' for more information.';
                    }
                }
                else {
                    cpArgs.push(arg);
                }
            }

            if (cpArgs.length === 0) {
                return 'cp: missing file operand\nTry \'cp --help\' for more information.';
            }
            if (cpArgs.length === 1) {
                return 'cp: missing destination file operand after \'' + cpArgs[0] + '\'\nTry \'cp --help\' for more information.';
            }

            const dest = cpArgs[cpArgs.length - 1];
            const sources = cpArgs.slice(0, -1);
            const cpResults = [];

            for (const src of sources) {
                const result = fs.copy(src, dest, recursive, noClobber);
                if (result.error) {
                    cpResults.push(result.error);
                }
                else if (verbose && !result.skipped) {
                    cpResults.push("'" + src + "' -> '" + dest + "'");
                }
            }
            return cpResults.join('\n');
        }

        case 'clear': {
            if (invalidFlag) {
                return 'clear: invalid option -- \'' + invalidFlag.slice(1) + '\'\nUsage: clear [options]\nOptions:\n  -T TERM     use this instead of $TERM\n  -V          print curses-version\n  -x          do not try to clear scrollback';
            }
            clearOutput();
            return '';
        }

        case 'mv': {
            let force = false;
            let interactive = false;
            let noClobber = false;
            let verbose = false;
            const mvArgs = [];

            for (let i = 0; i < args.length; ++i) {
                const arg = args[i];
                if (arg === '--help') {
                    return getCommandHelp('mv');
                }
                if (arg === '--') {
                    for (let j = i + 1; j < args.length; j++) mvArgs.push(args[j]);
                    break;
                }
                if (arg.startsWith('-') && arg !== '-') {
                    const flags = arg.slice(1).split('');
                    for (const flag of flags) {
                        if (flag === 'f') force = true;
                        else if (flag === 'i') interactive = true;
                        else if (flag === 'n') noClobber = true;
                        else if (flag === 'v') verbose = true;
                        else return 'mv: invalid option -- \'' + flag + '\'\nTry \'mv --help\' for more information.';
                    }
                }
                else {
                    mvArgs.push(arg);
                }
            }

            if (mvArgs.length === 0) {
                return 'mv: missing file operand\nTry \'mv --help\' for more information.';
            }
            if (mvArgs.length === 1) {
                return 'mv: missing destination file operand after \'' + mvArgs[0] + '\'\nTry \'mv --help\' for more information.';
            }

            const dest = mvArgs[mvArgs.length - 1];
            const sources = mvArgs.slice(0, -1);
            const mvResults = [];

            for (const src of sources) {
                const result = fs.move(src, dest, noClobber);
                if (result.error) {
                    mvResults.push(result.error);
                }
                else if (verbose && !result.skipped) {
                    mvResults.push("'" + src + "' -> '" + dest + "'");

                }
            }
            return mvResults.join('\n');
        }

        case 'help': {
            if (args.length === 0) return getHelpSummary();
            if (args[0] === '--help') return getHelpUsage();
            return getCommandHelp(args[0]);
        }

        default: {
            return 'bash: ' + cmd + ': command not found';
        }
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
            return 'ls: ls [OPTION]... [FILE]...\n    List directory contents.\n\n    Options:\n      -a, --all          do not ignore entries starting with .\n      -A, --almost-all   do not list implied . and ..\n      -l                 use a long listing format\n      -h, --human-readable  with -l, print sizes in human readable format\n      -r, --reverse      reverse order while sorting\n      -R, --recursive    list subdirectories recursively\n      -S                 sort by file size, largest first\n      -t                 sort by time, newest first\n      -1                 list one file per line';
        case 'mkdir':
            return 'mkdir: mkdir [OPTION]... DIRECTORY...\n    Create directories.\n\n    Options:\n      -p  make parent directories as needed';
        case 'touch':
            return 'touch: touch [OPTION]... FILE...\n    Update file timestamps.\n\n    Options:\n      -c  do not create any files';
        case 'echo':
            return 'echo: echo [-neE] [arg ...]\n    Write arguments to the standard output.\n\n    Options:\n      -n  do not output the trailing newline\n      -e  enable interpretation of backslash escapes\n      -E  disable interpretation of backslash escapes (default)';
        case 'cat':
            return 'cat: cat [OPTION]... [FILE]...\n    Concatenate FILE(s) to standard output.\n\n    Options:\n      -n, --number           number all output lines\n      -b, --number-nonblank  number nonempty output lines\n      -s, --squeeze-blank    suppress repeated empty output lines\n      -E, --show-ends        display $ at end of each line\n      -T, --show-tabs        display TAB characters as ^I';
        case 'rm':
            return 'rm: rm [OPTION]... [FILE]...\n    Remove (unlink) the FILE(s).\n\n    Options:\n      -f, --force           ignore nonexistent files\n      -i                    prompt before every removal\n      -r, -R, --recursive   remove directories and their contents\n      -v, --verbose         explain what is being done';
        case 'clear':
            return 'clear: clear [options]\n    Clear the terminal screen.\n\n    Options:\n      -V  print curses-version\n      -x  do not try to clear scrollback';
        case 'cp':
            return 'cp: cp [OPTION]... SOURCE... DIRECTORY\n    Copy SOURCE to DEST.\n\n    Options:\n      -r, -R, --recursive   copy directories recursively\n      -f, --force           force overwrite\n      -i, --interactive     prompt before overwrite\n      -n, --no-clobber      do not overwrite an existing file\n      -v, --verbose         explain what is being done';
        case 'mv':
            return 'mv: mv [OPTION]... SOURCE... DIRECTORY\n    Rename SOURCE to DEST, or move SOURCE(s) to DIRECTORY.\n\n    Options:\n      -f, --force           do not prompt before overwriting\n      -i, --interactive     prompt before overwrite\n      -n, --no-clobber      do not overwrite an existing file\n      -v, --verbose         explain what is being done';
        default:
            return 'help: no help topics match \'' + name + '\'.  Try \'help help\' or \'man -k ' + name + '\'.';
    }
}

function getHelpSummary() {
    return 'Available commands\n' +
        '  cat:       Concatenate files and print\n' +
        '  cd:        Change the shell working directory\n' +
        '  clear:     Clear the terminal screen\n' +
        '  echo:      Display a line of text\n' +
        '  help:      Display helpful information\n' +
        '  ls:        List directory contents\n' +
        '  mkdir:     Create directories\n' +
        '  pwd:       Print the current working directory\n' +
        '  rm:        Remove files or directories\n' +
        '  touch:     Create empty files\n' +
        '  cp:        Copy files and directories\n' +
        '  mv:        Move or rename files\n';
}

function getHelpUsage() {
    return 'help: help [-dms] [pattern ...]\n    Display helpful information about builtin commands.';
}