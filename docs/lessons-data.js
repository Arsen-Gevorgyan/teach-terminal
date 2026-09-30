//localStorage.removeItem('completedLessons')

const SECTIONS = [
    {
        id: 'intro',
        title: 'Introduction',
        isIntro: true,
        lessons: [
            {
                id: 1,
                title: "What is Linux",
                subtitle: "Before we start",
                type: "lecture",
                lecture: [
                    "Linux is an operating system - the software that runs your computer and lets you interact with it.",
                    "",
                    "You probably use Windows or macOS every day. Linux is another operating system, but it is used differently. Most websites you visit run on Linux servers. Android phones are built on Linux. Most supercomputers in the world run Linux.",
                    "",
                    "Why do developers, hackers, and system administrators use it? Because it gives you full control. You can see exactly what the system is doing, change anything, and automate tasks. It is fast, free, and runs on almost any hardware.",
                    "",
                    "In this course you will learn to use Linux through its terminal - the way real professionals do it."
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
                    "But GUIs hide a lot. When you drag a file into a folder, you do not see what actually happens. When something breaks, you cannot fix it easily.",
                    "",
                    "A terminal is different. It is a text-based way to talk to your computer. You type a command, and the computer answers. No buttons, no icons - just text.",
                    "",
                    "It feels strange at first. But once you learn it, it is faster, more powerful, and more precise. Almost every server in the world is managed through a terminal - no GUI at all."
                ]
            },
            {
                id: 3,
                title: "Directories and Files",
                subtitle: "How Linux organizes things",
                type: "lecture",
                lecture: [
                    "In Linux, everything is a file. Documents, programs, folders - they are all files in some way.",
                    "",
                    "A directory is a special kind of file that holds other files. You may know directories by another name: folders.",
                    "",
                    "Directories can contain files and other directories. This creates a tree - starting from the root directory at the very top, branching down into more and more folders.",
                    "",
                    "Your home directory is where your personal files live. It is your starting point. When you open a terminal, you usually start there.",
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
                    "Some commands take flags - special options that change how the command works. For example: 'ls -a' tells ls to show hidden files too.",
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
                    intro: "Practice time. Let's see where you are.",
                    steps: [
                        { task: "Print your current directory.", expected: "pwd" }
                    ],
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
                    "There are two special shortcuts. A single dot '.' means the current folder. Two dots '..' means the parent folder - the one above you.",
                    "",
                    "So 'cd ..' moves you up one level. 'cd ~' moves you back to your home directory from anywhere.",
                    "",
                    "You can also use absolute paths. If you type 'cd /home/user/Documents', it goes there directly, no matter where you are."
                ],
                practice: {
                    intro: "Practice time. Let's move around.",
                    steps: [
                        { task: "Enter the Documents folder.", expected: "cd Documents" },
                        { task: "Go back to the parent folder.", expected: "cd .." }
                    ],
                    success: "Correct. You can move around the filesystem now."
                }
            },
            {
                id: 7,
                title: "ls",
                subtitle: "What is here?",
                type: "practice",
                lecture: [
                    "Now that you can move around, you probably want to know what is inside a folder.",
                    "",
                    "The 'ls' command stands for list. It shows everything inside the directory you are in - files and subdirectories.",
                    "",
                    "If the directory is empty, you see nothing. If it has files, their names appear on screen.",
                    "",
                    "You can also use ls on a specific directory without moving into it. For example: 'ls Documents' lists what is inside Documents without leaving your current location."
                ],
                practice: {
                    intro: "Practice time. Let's look at what is in your home folder.",
                    steps: [
                        { task: "List the files in your current directory.", expected: "ls" }
                    ],
                    success: "Correct. Those are your folders and files."
                }
            },
            {
                id: 8,
                title: "ls flags",
                subtitle: "See more",
                type: "practice",
                lecture: [
                    "Sometimes ls does not show everything. Some files are hidden - they start with a dot and are invisible by default.",
                    "",
                    "You use flags to change how ls behaves. A flag is a letter with a dash before it.",
                    "",
                    "-a shows all files, including hidden ones.",
                    "-l shows a long listing with details: permissions, owner, size, and date.",
                    "",
                    "You can combine them: 'ls -la' shows everything with details.",
                    "",
                    "Try listing all files with details."
                ],
                practice: {
                    intro: "Practice time. Let's see hidden files and details.",
                    steps: [
                        { task: "List all files with details.", expected: "ls -la" }
                    ],
                    success: "Correct. The extra columns show permissions, owner, size, and date."
                }
            },
            {
                id: 9,
                title: "Tab autocomplete",
                subtitle: "Type faster",
                type: "practice",
                lecture: [
                    "Typing long filenames is slow and full of typos. The terminal has a shortcut to help you.",
                    "",
                    "Press the Tab key while typing a command or filename. The terminal completes it for you.",
                    "",
                    "For example, if you type 'cd Doc' and press Tab, it becomes 'cd Documents/'.",
                    "",
                    "If there are multiple matches, Tab completes as much as it can. Press Tab twice to see all options.",
                    "",
                    "This is one of the most useful shortcuts in the terminal. Real users press Tab constantly."
                ],
                practice: {
                    intro: "Practice time. Let's use Tab to type faster.",
                    steps: [
                        { task: "Type 'cd Doc' and press Tab to complete it, then press Enter.", expected: "cd Documents/" }
                    ],
                    success: "Correct. Tab filled in the rest of the folder name."
                }
            },
            {
                id: 10,
                title: "History",
                subtitle: "Repeat without retyping",
                type: "practice",
                lecture: [
                    "Every command you run is saved in your history.",
                    "",
                    "Press the Up arrow to bring back your last command. Press Up again to go further back. Press Down to go forward.",
                    "",
                    "This is incredibly useful. Instead of retyping a long command, just press Up.",
                    "",
                    "You can also type 'history' to see the full list of commands you have run."
                ],
                practice: {
                    intro: "Practice time. Let's check your command history.",
                    steps: [
                        { task: "Type 'history' to see your command history.", expected: "history" }
                    ],
                    success: "Correct. Every command you ran is listed there."
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
                subtitle: "Make a folder",
                type: "practice",
                lecture: [
                    "The 'mkdir' command stands for Make Directory. It creates a new folder.",
                    "",
                    "You type 'mkdir' followed by the name you want. For example: 'mkdir projects' creates a folder called projects in your current location.",
                    "",
                    "You can create multiple folders at once: 'mkdir folder1 folder2 folder3'.",
                    "",
                    "If you want to create nested folders - a folder inside a folder - use the -p flag: 'mkdir -p projects/2024/january'. This creates all the folders in the path."
                ],
                practice: {
                    intro: "Practice time. Let's create a folder.",
                    steps: [
                        { task: "Create a folder called 'projects'.", expected: "mkdir projects" },
                        { task: "List files to see the new folder.", expected: "ls" }
                    ],
                    success: "Correct. The folder exists now."
                }
            },
            {
                id: 12,
                title: "touch",
                subtitle: "Make a file",
                type: "practice",
                lecture: [
                    "The 'touch' command creates an empty file. It is called touch because in older systems it also updated a file's timestamp - as if you touched it.",
                    "",
                    "You type 'touch' followed by the filename. For example: 'touch notes.txt' creates an empty file called notes.txt.",
                    "",
                    "You can create multiple files at once: 'touch a.txt b.txt c.txt'.",
                    "",
                    "The file will be empty - zero bytes - but it exists. You can later write inside it with other commands."
                ],
                practice: {
                    intro: "Practice time. Let's create an empty file.",
                    steps: [
                        { task: "Create an empty file called 'notes.txt'.", expected: "touch notes.txt" },
                        { task: "List files to see it.", expected: "ls" }
                    ],
                    success: "Correct. The file exists but is empty."
                }
            },
            {
                id: 13,
                title: "cp",
                subtitle: "Copy",
                type: "practice",
                lecture: [
                    "The 'cp' command stands for copy. It copies a file or directory.",
                    "",
                    "You type 'cp' followed by the source, then the destination. For example: 'cp notes.txt backup.txt' copies notes.txt to a new file called backup.txt.",
                    "",
                    "The original stays where it was. You now have two copies.",
                    "",
                    "To copy a directory, you need the -r flag (recursive): 'cp -r projects projects-backup'. Without -r, cp refuses to copy directories."
                ],
                practice: {
                    intro: "Practice time. Let's copy a file.",
                    steps: [
                        { task: "Copy 'notes.txt' to 'backup.txt'.", expected: "cp notes.txt backup.txt" },
                        { task: "List files to see both.", expected: "ls" }
                    ],
                    success: "Correct. You now have two copies of the file."
                }
            },
            {
                id: 14,
                title: "mv",
                subtitle: "Move or rename",
                type: "practice",
                lecture: [
                    "The 'mv' command stands for move. It moves a file from one place to another.",
                    "",
                    "You type 'mv' followed by the source and the destination. For example: 'mv notes.txt Documents/' moves notes.txt into the Documents folder.",
                    "",
                    "You can also use mv to rename a file. If the destination is a new name in the same place, it acts like renaming. For example: 'mv notes.txt ideas.txt' renames the file.",
                    "",
                    "Unlike cp, mv does not leave a copy. The file moves - it disappears from the old location."
                ],
                practice: {
                    intro: "Practice time. Let's rename a file.",
                    steps: [
                        { task: "Rename 'backup.txt' to 'old.txt'.", expected: "mv backup.txt old.txt" },
                        { task: "List files to see the change.", expected: "ls" }
                    ],
                    success: "Correct. The file has a new name."
                }
            },
            {
                id: 15,
                title: "rm",
                subtitle: "Remove",
                type: "practice",
                lecture: [
                    "The 'rm' command stands for remove. It deletes a file.",
                    "",
                    "You type 'rm' followed by the filename. For example: 'rm old.txt' deletes the file.",
                    "",
                    "Be careful - there is no trash bin. Once rm deletes a file, it is gone.",
                    "",
                    "To remove a directory, you need -r (recursive): 'rm -r projects'. Without -r, rm refuses to delete directories.",
                    "",
                    "You can also use -f (force) to skip confirmation prompts: 'rm -rf projects'. This is dangerous - use it carefully."
                ],
                practice: {
                    intro: "Practice time. Let's delete a file.",
                    steps: [
                        { task: "Delete 'old.txt'.", expected: "rm old.txt" },
                        { task: "List files to confirm it is gone.", expected: "ls" }
                    ],
                    success: "Correct. The file is gone."
                }
            }
        ]
    },
    {
        id: "text",
        title: "Text & Redirection",
        lessons: [
            {
                id: 16,
                title: "echo",
                subtitle: "Print text",
                type: "practice",
                lecture: [
                    "The 'echo' command prints text on the screen.",
                    "",
                    "You type 'echo' followed by whatever you want to print. For example: 'echo hello world' prints 'hello world'.",
                    "",
                    "It sounds simple, but echo becomes very powerful when combined with redirection - which we will learn next."
                ],
                practice: {
                    intro: "Practice time. Let's print some text.",
                    steps: [
                        { task: "Print the word 'hello'.", expected: "echo hello" }
                    ],
                    success: "Correct. echo prints whatever you give it."
                }
            },
            {
                id: 17,
                title: "> Write to file",
                subtitle: "Send output to a file",
                type: "practice",
                lecture: [
                    "Every command produces output. Usually it appears on screen.",
                    "",
                    "The '>' symbol redirects that output to a file instead. Whatever the command would print goes into the file.",
                    "",
                    "For example: 'echo hello > file.txt' writes 'hello' into file.txt. Nothing appears on screen - everything went into the file.",
                    "",
                    "Warning: '>' replaces the file. If the file already exists, its old contents are erased."
                ],
                practice: {
                    intro: "Practice time. Let's write to a file and read it back.",
                    steps: [
                        { task: "Write 'hello' into 'file.txt'.", expected: "echo hello > file.txt" },
                        { task: "Read 'file.txt' with cat.", expected: "cat file.txt" }
                    ],
                    success: "Correct. Redirection sends output to files instead of the screen."
                }
            },
            {
                id: 18,
                title: ">> Append to file",
                subtitle: "Add without erasing",
                type: "practice",
                lecture: [
                    "The '>' symbol replaces the file. But what if you want to add to a file without erasing what is already there?",
                    "",
                    "Use '>>' instead. Two arrows means append - add to the end.",
                    "",
                    "For example: 'echo world >> file.txt' adds 'world' as a new line at the end of file.txt.",
                    "",
                    "The old content stays. The new content goes after it."
                ],
                practice: {
                    intro: "Practice time. Let's append to a file.",
                    steps: [
                        { task: "Add 'world' to the end of 'file.txt'.", expected: "echo world >> file.txt" },
                        { task: "Read the file to see both lines.", expected: "cat file.txt" }
                    ],
                    success: "Correct. The file now has two lines - 'hello' and 'world'."
                }
            },
            {
                id: 19,
                title: "cat",
                subtitle: "Show file contents",
                type: "practice",
                lecture: [
                    "The 'cat' command shows the contents of a file on the screen.",
                    "",
                    "You type 'cat' followed by the filename. For example: 'cat file.txt' prints everything inside file.txt.",
                    "",
                    "The name 'cat' comes from 'concatenate' - because it can also combine multiple files. 'cat a.txt b.txt' shows both files one after the other."
                ],
                practice: {
                    intro: "Practice time. Let's read a file with cat.",
                    steps: [
                        { task: "Show the contents of 'file.txt'.", expected: "cat file.txt" }
                    ],
                    success: "Correct. cat prints the file's contents."
                }
            },
            {
                id: 20,
                title: "< Read from file",
                subtitle: "Feeding a file into a command",
                type: "practice",
                lecture: [
                    "The '>' symbol sends output to a file. The '<' symbol does the opposite - it takes input from a file.",
                    "",
                    "For example: 'cat < file.txt' reads file.txt and shows it, exactly like 'cat file.txt'.",
                    "",
                    "So why use '<'? Because not all commands take a filename as argument. Some commands only read from standard input. With '<' you can feed them a file anyway."
                ],
                practice: {
                    intro: "Practice time. Let's read a file with <.",
                    steps: [
                        { task: "Read 'file.txt' using '<'.", expected: "cat < file.txt" }
                    ],
                    success: "Correct. Same output, different approach."
                }
            }
        ]
    },
    {
        id: "permissions",
        title: "Permissions",
        lessons: [
            {
                id: 21,
                title: "What are permissions?",
                subtitle: "Who can do what",
                type: "practice",
                lecture: [
                    "Every file and directory in Linux has permissions. They control who can read it, write to it, or execute it.",
                    "",
                    "There are three groups of people: the owner (usually you), the group (people in the same user group), and others (everyone else).",
                    "",
                    "For each group, there are three possible permissions: read (r), write (w), and execute (x).",
                    "",
                    "When you run 'ls -l', you see the permissions at the start of each line. For example: '-rw-r--r--'. The first character is the type (d for directory, - for file). The next nine are three sets of rwx for the three groups."
                ],
                practice: {
                    intro: "Practice time. Let's look at permissions.",
                    steps: [
                        { task: "Show permissions of files with 'ls -l'.", expected: "ls -l" }
                    ],
                    success: "Correct. Those nine characters after the first dash are the permissions."
                }
            },
            {
                id: 22,
                title: "chmod",
                subtitle: "Change permissions",
                type: "practice",
                lecture: [
                    "The 'chmod' command stands for change mode. It changes a file's permissions.",
                    "",
                    "There are two ways to use it. The first is numbers: 4 means read, 2 means write, 1 means execute. Add them for each group.",
                    "",
                    "For example: 'chmod 755 script.sh' sets: owner = 7 (read+write+execute), group = 5 (read+execute), others = 5 (read+execute).",
                    "",
                    "The second way uses letters: 'chmod +x file' adds execute permission to everyone. 'chmod u+w file' adds write permission to the owner only."
                ],
                practice: {
                    intro: "Practice time. Let's create a file and lock it down.",
                    steps: [
                        { task: "Create a file called 'secret.txt'.", expected: "touch secret.txt" },
                        { task: "Set its permissions to 600 (owner only).", expected: "chmod 600 secret.txt" },
                        { task: "Verify with ls -l.", expected: "ls -l" }
                    ],
                    success: "Correct. Only you can read and write the file now."
                }
            },
            {
                id: 23,
                title: "chown",
                subtitle: "Change owner",
                type: "practice",
                lecture: [
                    "The 'chown' command stands for change owner. It changes who owns a file.",
                    "",
                    "You type 'chown' followed by the new owner, then the filename. For example: 'chown student file.txt' makes 'student' the owner.",
                    "",
                    "Regular users can only change ownership if they are the owner. Changing to a different user usually requires root privileges - which means using sudo."
                ],
                practice: {
                    intro: "Practice time. Let's change who owns a file.",
                    steps: [
                        { task: "Create a file called 'shared.txt'.", expected: "touch shared.txt" },
                        { task: "Change its owner to 'student'.", expected: "chown student shared.txt" },
                        { task: "Verify with ls -l.", expected: "ls -l" }
                    ],
                    success: "Correct. The owner column now shows 'student'."
                }
            },
            {
                id: 24,
                title: "sudo",
                subtitle: "Run as admin",
                type: "practice",
                lecture: [
                    "In Linux, the 'root' user has full control over the system. Regular users do not.",
                    "",
                    "When you need to do something only root can do - like installing software, changing system files, or changing ownership to another user - you use 'sudo'.",
                    "",
                    "The name stands for SuperUser DO. You put 'sudo' before the command you want to run as root.",
                    "",
                    "For example: 'sudo chown root file.txt' changes the owner to root. The system will ask for your password."
                ],
                practice: {
                    intro: "Practice time. Let's use sudo to change ownership to root.",
                    steps: [
                        { task: "Create a file called 'system.txt'.", expected: "touch system.txt" },
                        { task: "Use sudo to change its owner to 'root'.", expected: "chown root system.txt" },
                        { task: "Verify with ls -l.", expected: "ls -l" }
                    ],
                    success: "Correct. You used administrator powers."
                }
            }
        ]
    },
    {
        id: "final",
        title: "Course Complete",
        lessons: [
            {
                id: 25,
                title: "Congratulations",
                subtitle: "You finished Teach Terminal",
                type: "lecture",
                lecture: [
                    "Congratulations!",
                    "",
                    "You finished Teach Terminal.",
                    "",
                    "You now know the basics of the Linux terminal:",
                    "",
                    "Navigation, files, redirection, and permissions.",
                    "",
                    "Keep practicing. The terminal gets easier the more you use it."
                ]
            }
        ]
    }
];