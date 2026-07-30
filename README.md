# Teach-Terminal

>Cybersecurity learning game in the browser. Simulates real **LINUX terminal**.

## Already Made
- **index.html** - *Start menu with Start and Settings buttons*
- **main.html** - *Added Linux like terminal*
- **settings.html** - *Theme selection page (Ubuntu, Hacker, Kali)*
- **style.css** - *Styles for all pages, gradient animations, glassmorphism cards, CSS variables for themes.*
- **settings.js** - *Theme selection logic, save to localStorage*
- **theme.js** - *Reads saved theme from localStorage and change CSS variable values*
- **terminal.js** - *Terminal input handling, command prompt display (username@machinename:~$)*
- **command.js** - *Recognize commands and return action*
## Upcoming
- terminal.js - add history for commands (up/down arrows)
- command.js - add more commands and make limits from usage theme by lessons
- main.html - lecture system and practice missions

### Why Command Limits?
Each mission has a maximum number of allowed commands. If the user exceeds the limit by typing too many incorrect commands, the lecture restarts. This prevents random guessing and encourages users to read and understand the material before typing.

## Try it - [Demo](https://arsen-gevorgyan.github.io/teach-terminal/)