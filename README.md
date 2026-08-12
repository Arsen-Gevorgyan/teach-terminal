# Teach-Terminal

> Cybersecurity learning game in the browser. Simulates a real **Linux terminal**.

## Already Made
- **index.html** — Start menu with Start and Settings buttons
- **settings.html** — Theme selection page (Ubuntu, Hacker, Kali)
- **login.html** — Login page with username, machine name, and password validation
- **main.html** — Linux-like terminal interface
- **style.css** — Shared styles, CSS variables, gradient animations, glassmorphism cards
- **login.css** — Login page styles, themed backgrounds
- **settings.js** — Theme selection logic, saves to localStorage
- **theme.js** — Reads saved theme from localStorage, applies CSS variables
- **login.js** — Login form validation, saves credentials, redirects to terminal
- **terminal.js** — Terminal input handling, command prompt display, line management
- **commands.js** — Command recognition and execution

## Current Commands
`help`, `pwd`, `clear`, `whoami`, `date`, `echo`

## Upcoming
- Command history (up/down arrow keys)
- Filesystem simulation (`cd`, `ls`, `mkdir`, `touch`, `chmod`, `chown`)
- Lecture system with practice missions
- Command usage limits per mission

### Why Command Limits?
Each mission has a maximum number of allowed commands. If the user exceeds the limit by typing too many incorrect commands, the lecture restarts. This prevents random guessing and encourages users to read and understand the material before typing.

## Try it - [Demo](https://arsen-gevorgyan.github.io/teach-terminal/)