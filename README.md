# Teach Terminal

> Cybersecurity learning game in the browser. Simulates a real **Linux terminal**.

## About Project

This is teacher terminal, teaching not linux used people use Linux.
Its not only help people learn Linux commands, you can also try commands in web.
You can type commands and see how they working in web terminal.

## Pages

* index.html - Start pags
* setting.html - Choose Ubuntu, Hacker or Kali theme
* login.html - Login page
* mode.html - CHoose Free Exploration or Guide Path
* lesson.html - List of lessons
* main.html - Terminal

## Main Files

* style.css - Main style
* login.css - Login page styles
* setting.js - Theme selection
* theme.js - Loads the selected theme
* login.js - Login validation
* filesystem.js - Fakse Linux filesystem
* terminal.js - Terminal input and output
* commands.js - Linux commands
* lesson-data.js - Lessons content
* lesson-window.js - Lesson window
* lesson.js - Lesson page

## Commands

The terminal currently supports commands like:

* pwd
* ls
* clear
* echo
* cd
* mkdir
* touch
* cat
* help
* rm
* cp
* mv
* chmod
* chown
* sudo
* history

There are many flags for commands.

## Lessons

There are 25 lessons in 5 sections

1. Introduction
2. Navigation
3. Files
4. Text & Redirection
5. Permissions

The lessons have a lectures and practice parts.
Practice can have one or multiple step to complete.

## How I made It

I started with talking about my project with AI. After ask him to make prompt for DeepSeak that will be my instructor and teach me to comlpete this project, not type code, not one line code typed, he can only type it feo explain or hide some part for me that I will write.
After Start step by step creating my project, step by step learning and creating something new. And Now in final I get this project.

## Problemds I had

I had quite a few small bugs while making this.

* I forgot a return in many parts of functions that have amny returns.
* I rewrite some parts and get errors because using theme in others scripts
* I delete variables and forgot about theme , and get errors.
* And get most of bugs in redirection, because in first I not fully understand how it works, and write it many times.

## Try it - [Demo](https://arsen-gevorgyan.github.io/teach-terminal/)