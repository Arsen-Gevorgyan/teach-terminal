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

## Current Commands And Flags
* `pwd` | `-L`, `-P`, `--help`, `--version` |
* `help` | `-a`, `-A`, `-l`, `-h`, `-r`, `-R`, `-S`, `-t`, `-1`, `--help` |
* `clear` | -- |
* `echo` | `-n`, `-e`, `-E` |
* `cd` | `~`, `.`, `..`, absolute, relative |
* `mkdir` | `-p`, `-m`, `-v` |
* `touch` | `-c`, `-a`, `-m` |
* `cat` | `-n`, `-b`, `-s`, `-E`, `-T` |
* `help` | per-comand |
* `rm` | `-r`, `-f`, `-i`, `-v`
* `cp` | `-r`, `-i`, `-v`
* `mv` | `-i`, `-v`

## Tasks

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

## How I Built This
I started with a simple page with buttons. I didn't know much HTML or CSS, so most of the early work was learning the basics - how to center things on screen, how `overflow: hidden` prevents scrollbars, how `display: flex` and `display: grid` work, and how to make things responsive on phones without breaking the desktop layout.

Once the start menu and settings page worked, I moved to the terminal itself. That's where things got real. I had to figure out how to capture keyboard input without using a visible `<input>` element (I used a hidden input trick), how to keep the cursor blinking, how to make old lines disappear when the screen fills up, and how to color only part of a line (the command in one color, arguments in another using CSS variables).

The filesystem was the biggest challenge. I learned about classes and how they work, and I wanted to use them. In my terminal I use two main classes. One is **FileSystem**, which builds the whole virtual filesystem - the structure of folders and files. The other is **file**, which handles everything about a single file: its parent, its permissions, its owner, its size, and so on.

After I learned about linked lists, I realized I could use the same idea to find a file's absolute path. In a linked list you move from one node to the next using a pointer. In my filesystem, I move from one folder to its parent using the **parent** reference, building the path as I go up. I also worked on moving to the parent folder using `..` and staying in the same folder using `.`.

## How I Used AI
On my project's journey, I used a few AI tools.

First, I used ChatGPT. I completed a course about prompt techniques and used it to describe my tasks and a dynamic project plan that would change a lot along the way. I asked ChatGPT to write a prompt that I could paste into DeepSeek - a prompt that would make DeepSeek give me hints and directions instead of full code. I wanted to solve each problem myself and send back my solution to be checked. Then I would fix the issues and move step by step.

The AI never wrote the project for me. It pointed at problems and explained concepts. Every function you see here, I typed. Every bug I debugged by running the code and reading the errors.

## Mistakes I Made
Real projects have real bugs. Here are some of the ones I hit:

- I typed `procesCommand` instead of `processCommand` and spent a long time trying to figure out why nothing worked.
- I wrote `const result = []` in two different places inside a switch and got a "cannot redeclare" error. I didn't know that `let` and `const` share scope in switch cases.
- My `move` function had a bug where moving a file into a folder returned `undefined` because one code branch didn't return anything. The terminal crashed with "Cannot read properties of undefined".
- I used `Math.cail` instead of `Math.ceil` and the terminal kept crashing every time I ran `ls -l`.
- I spelled `hummanReadable` wrong in six places and had to fix each one.
- I deleted a closing `}` in the `ls` case and the whole function stopped working. I found it after staring at the code for a long time.
- I once reverted to an older version of `filesystem.js` without realizing it and lost my colored `ls` output. I had to redo it.
- I tried to add redirection (`>`, `>>`) but didn't understand how the terminal's `return` flow worked. I had to rethink it before writing anything.

These are the kinds of mistakes that don't show up in generated code.

## What I'd Do Differently
- Write cleaner git commits from the start (mine are messy)
- Test on mobile earlier - I built a lot before realizing the terminal didn't fit on a phone
- Keep better notes on what I changed each day

## Try it - [Demo](https://arsen-gevorgyan.github.io/teach-terminal/)