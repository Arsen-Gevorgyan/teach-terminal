# Teach-Terminal

> Cybersecurity learning game in the browser. Simulates a real **Linux terminal**.

## Already Made
- **index.html** - Start menu with Start and Settings buttons
- **settings.html** - Theme selection page (Ubuntu, Hacker, Kali)
- **login.html** - Login page with username, machine name, and password validation
- **main.html** - Linux-like terminal interface
- **style.css** - Shared styles, CSS variables, gradient animations, glassmorphism cards
- **login.css** - Login page styles, themed backgrounds
- **settings.js** - Theme selection logic, saves to localStorage
- **theme.js** - Reads saved theme from localStorage, applies CSS variables
- **login.js** - Login form validation, saves credentials, redirects to terminal
- **filesystem.js** - Fake Linux filesystem with nested folders, permissions, owners, groups, sizes, and modification times
- **terminal.js** - Terminal input handling, command prompt display, line management
- **commands.js** - Command recognition and execution

## Current Commands Amd Flags
* `pwd` | `-L`, `-P`, `--help`, `--version` |
* `help` | `-a`, `-A`, `-l`, `-h`, `-r`, `-R`, `-S`, `-t`, `-1`, `--help` |
* `clear` | -- |
* `echo` | `-n`, `-e`, `-E` |
* `cd` | `~`, `.`, `..`, absolute, relative |
* `mkdir` | `-p`, `-m`, `-v` |
* `touch` | `-c`, `-a`, `-m` |
* `cat` | `-n`, `-b`, `-s`, `-E`, `-T` |
* `help` | per-comand |

## Today's Tasks

### File Operations
- `rm` with `-r`, `-f`, `-i`, `-v`
- `cp` with `-r`, `-i`, `-v`
- `mv` with `-i`, `-v`

### Search & Text
- `grep` with `-i`, `-n`, `-c`, `-v`, `-r`
- `head` with `-n`
- `tail` with `-n`

### Redirections
- `>` - write (truncate)
- `>>` - append
- `<` - read from file
- `2>` - redirect stderr

### Shel Features
- Command history (up/down arrows)
- Tab autocomplete
- `history` command, `!!`, `!n`

### Permissions
- `chmod` (numeric and symbolic)
- `chown` / `chgrp`

### More Commands
- `find`, `wc`, `sort`, `uniq`
- `date`, `df`, `free`, `which`, `uptime`, `sleep`, `alias`
- Wildcards (`*`, `?`, `[abc]`)
- Brace expansion (`{a,b}`)
- `&&`, `||`, `;`
- `ln` (hard links and symbolic links)
 
## Upcoming
- Lecture system with practice missions
- Command usage limits per mission

### Why Command Limits?
Each mission has a maximum number of allowed commands. If the user exceeds the limit by typing too many incorrect commands, the lecture restarts. This prevents random guessing and encourages users to read and understand the material before typing.

## Try it - [Demo](https://arsen-gevorgyan.github.io/teach-terminal/)