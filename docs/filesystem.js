var ownerNames = ['root'];
var groupNames = ['root', 'bin'];

class filesystem {
    #root;
    #cwd; //current working directory
    #username;
    #machinename;

    constructor(username, machinename) {
        this.#username = username;
        ownerNames.push(username); // adding username as a valid value for owner names
        groupNames.push(username);
        this.#machinename = machinename;

        this.#root = new file('/', true, 7, 5, 5, '/');
        const home = new file('home', true, 7, 5, 5, this.#root);
        const userFolder = new file(username, true, 7, 5, 5, home + username);
        const documents = new file('documents', true, 7, 5, 5, home + username + 'Document');
        const downloads = new file('downloads', true, 7, 5, 5, home + username + 'Downloads');
        const desktop = new file('desktop', true, 7, 5, 5, home + username + 'Desktop');

        this.#cwd = userFolder;
    }

    get cwd() {
        return this.#cwd;
    }

    getAbsolutePath() {
        return this.#cwd.path;
    }

    get username() {
        return this.#username;
    }
}

class file {
    #isDirectory; // Check for if its directory Yer/No
    #permOwner; //Permmisions for owner
    #permGroup; //Permmisions for group
    #permOther; //Permmisions for others
    #path; //Path of Parent folder def value is ~
    #parent; //reference to parent folder null in root for finish flag
    #content; //string if it directory content of children files, if it file content of file
    #child
    #ownerName; //file owner name
    #groupName; //file group name

    constructor(isDir, permOwner, permGroup, permOther, path, ownerName, groupName) {
        this.#isDirectory = isDir;
        this.#permOwner = permOwner;
        this.#permGroup = permGroup;
        this.#permOther = permOther;
        this.#path = path;
        this.#parent = null;
        this.#content = '';
        this.#child = isDir ? new Map() : '';
        this.#ownerName = ownerName;
        this.#groupName = groupName;
    }

    get fileName() {
        const parts = this.#path.split('/');
        return parts[parts.length - 1];
    }

    get isDirectory() {
        return this.#isDirectory;
    }

    set isDirectory(value) {
        this.#isDirectory = value;
    }

    get permOwner() {
        return this.#permOwner;
    }

    set permOwner(value) {


        
        if (value >= 0 && value <= 7) {
            this.#permOwner = value;
        }
    }

    get permGroup() {
        return this.#permGroup;
    }

    set permGroup(value) {
        if (value >= 0 && value <= 7) {
            this.#permGroup = value;
        }
    }

    get permOther() {
        return this.#permOther;
    }

    set permOther(value) {
        if (value >= 0 && value <= 7) {
            this.#permOther = value;
        }
    }

    get path() {
        return this.#path;
    }

    set path(value) {
        if (this.#parent === null) {
            return error('Can\'t rename root');
        }
        this.#parent.this.child.forEach(element => {
            if (element === value) {
                return error('$value already exist in $this.#parent folder');
            }
        });
        #this.path = value;
    }

    get ownerName() {
        return this.#ownerName;
    }

    set ownerName(value) {
        ownerNames.forEach(name => {
            if (value === name) {
                this.#ownerName = value;
                return;
            }
        });
        return error('Not have $value owner');
    }

    get groupName() {
        return this.#groupName;
    }

    set groupName(value) {
        groupNames.forEach(name => {
            if (value === name) {
                this.#groupName = value;
                return;
            }
        });
        return error('Not have $value group');
    }
    addChild(item) {
        if (!this.#isDirectory) return false;
        item.#parent = this;
        this.#content.set(item.fileName, item);
        return true;
    }

    getChild(name) {
        if (!this.#isDirectory) return null;
        return this.#content.get(name) || null;
    }

    getChildren() {
        if (!this.#isDirectory) return [];
        return Array.from(this.#content.values());
    }
    getAbsolutePath() {
        let fullPath = this.#path;
        if (this.#parent != null) {
            return this.#parent.getAbsolutePath() + '/' + this.fileName;
        } else {
            return fullPath;
        }
    }
    getPermissionString() {
        const map = (p) => {
            const r = (p & 4) ? 'r' : '-';
            const w = (p & 2) ? 'w' : '-';
            const x = (p & 1) ? 'x' : '-';
            return r + w + x;
        };
        const type = this.#isDirectory ? 'd' : '-';
        return type + map(this.#permOwner) + map(this.#permGroup) + map(this.#permOther);
    }
}