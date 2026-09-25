const SECTIONS = [
    {
        id: 'intro',
        title: 'Introduction',
        isIntro: true,
        lessons: [
            {
                id: 1,
                title: "What is Linux",
                subtitle: "Before we starts",
                type: "lecture",
                lecture: [
                    "Linux is an operating system - the software that runs your computer and lets you interact with it.",
                    "",
                    "You probably use Windows or macOS every day. Linux is another operating system, but it is used differently. Most websites you visit run on Linux servers. Android phones are built on Linux. Most supercomputers in the wordl run Linux.",
                    "",
                    "Why do developers, hackers, and system administrators use it? Because it gives you full controll. You can see exactly the system is doing, change anything, and automate tasks. It is fast, free, and runs on almost any hardware.",
                    "",
                    "In this course you will learn to use Linux through its terminal - the way real professionsals do it."
                ]
            },
            {
                id: 2,
                title: "What is Terminal",
                subtitle: "Your window into the system",
                type: "lecture",
                lecture: [
                    "Most people use computers through a GUI - a Graphical User Interface. You click icons, open windows, drag files. It is easy to learn.",
                    "",
                    "But GUIs hide a lot. When you drag a file into a folder, you do not see what actually happens. When something breaks, you cannot fixit easily.",
                    "",
                    "A terminal is different. It is a text-based way to talk to your computer. You type a command, and the computer answers. No buttons, no icons - just text.",
                    "",
                    "It feels strange at first. But once you learn it, it is faster, more powerful, and more precise. Almost every server in the world is managed through a terminal - no GUI at all."
                ]
            },
            {
                id: 3,
                title: "Directions and Files",
                subtitle: "How Linux organizes things",
                type: "lecture",
                lecture: [
                    "In Linux, everthing is a file. Documents, programs, folders - they are all files in some way.",
                    "",
                    "A directory is a special kind of files that holds other files. You may know directories by another nameL folders.",
                    "",
                    "Directories can contain files and other directories. This creates a tree - starting from the root directory at the very top, branching down into more and more folders.",
                    "",
                    "Your home directory is where your personal files live. It is yout starting point. When you open a terminal, you usually start there.",
                    "",
                    "In the next lesson you will learn how to see where you are and move around this tree."
                ]
            },
            {
                id: 4,
                title: "What is a Command",
                subtitle: "How you talk to the terminal",
                type: "lecture",
                lecture: [
                    "A command is a single instruction you type to tell the computer what to do.",
                    "",
                    "Every command has a name. For example: 'pwd' prints your current directory. 'ls' lists files. 'cd' changes directory.",
                    "",
                    "You type the command and press Enter. The computer runs it and shows you the result.",
                    "",
                    "Some commands take extra information called arguments. For example: 'cd Documents' tells cd to move you into a folder called Documents.",
                    "",
                    "Some commands take flags - special options that change how the command workd. For example: 'ls -a' tells ls to show hidden files too.",
                    "",
                    "Type 'help' and press Enter to see what you can do."
                ]
            }
        ]
    },
    {
        id: 'navigation',
        title: 'Navigation',
        lessons: [
            {
                id: 5,
                title: "pwd",
                subtitle: "Where am I?",
                type: "practice",
                lecture: [
                    "When you open a terminal, you are standing inside a directory. But which one?",
                    "",
                    "The command 'pwd' tells you. It stands for Print Working Directory - the directory you are currently working in.",
                    "",
                    "It is one of the simplest commands. No arguments, no flags. Just run it and it tells you where you are.",
                    "",
                    "If you ever feel lost in the filesystem, run pwd first. It gives you your location."
                ],
                practice: {
                    task: "Print your current directory.",
                    expected: "pwd",
                    success: "Correct. That path is your home directory - where your personal files live."
                }
            },
            {
                id: 6,
                title: "cd",
                subtitle: "Moving around",
                type: "practice",
                lecture: [
                    "The 'cd' command stands for Change Directory. It moves you to a different folder.",
                    "",
                    "You type 'cd' followed by the folder you want to enter. For example: 'cd Documents' moves you into Documents.",
                    "",
                    "There arre two sepcial shortcuts. A single dot '.' means the current folder. Two dots '..' means the parent folder - the one above you.",
                    "",
                    "So 'cd ..' moves you up one level. 'cd ~' moves you back to your home directory from anywhere.",
                    "",
                    "You can also use absolute path. If you type 'cd /home/user/Documents', it goes there directly, no matter where you are."
                ],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            },
            {
                id: 7,
                title: "ls",
                subtitle: "What is here?",
                type: "practice",
                lecture: [],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            },
            {
                id: 8,
                title: "ls flags",
                subtitle: "See hidden files and details",
                type: "practice",
                lecture: [],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            },
            {
                id: 9,
                title: "Tab Autocomplete",
                subtitle: "Typing faster",
                type: "practice",
                lecture: [],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            },
            {
                id: 10,
                title: "History",
                subtitle: "Repeat without retyping",
                type: "practice",
                lecture: [],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            }
        ]
    },
    {
        id: "files",
        title: "Files",
        lessons: [
            {
                id: 11,
                title: "mkdir",
                subtitle: "Creating a directory",
                type: "practice",
                lecture: [

                ],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            },

            {
                id: 12,
                title: "touch",
                subtitle: "Creating a file",
                type: "practice",
                lecture: [],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            },

            {
                id: 13,
                title: "cp",
                subtitle: "Copying giles",
                type: "practice",
                lecture: [],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            }

        ]
    },
    {
        id: "text",
        title: "Text & Redirection",
        lessons: [
            {
                id: 7,
                title: "ls",
                subtitle: "What is here?",
                type: "practice",
                lecture: [],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            }
        ]
    },
    {
        id: "permissions",
        title: "Permissions",
        lessons: [
            {
                id: 7,
                title: "ls",
                subtitle: "What is here?",
                type: "practice",
                lecture: [],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            }
        ]
    },
    {
        id: "mission",
        title: "Final Mission",
        lessons: [
            {
                id: 7,
                title: "ls",
                subtitle: "What is here?",
                type: "practice",
                lecture: [],
                practice: {
                    task: "",
                    expected: "",
                    success: ""
                }
            }
        ]
    }
]