var ownerNames = ['root'];
var groupNames = ['root', 'bin'];

class file {
    #isDirectory;
    #permOwner;
    #permGroup;
    #permOther;
    #path;
    #parent;
    #content;
    #ownerName;
    #groupName;
    #size;
    #mtime;

    constructor(isDir, permOwner, permGroup, permOther, path, ownerName, groupName) {
        this.#isDirectory = isDir;
        this.#permOwner = permOwner;
        this.#permGroup = permGroup;
        this.#permOther = permOther;
        this.#path = path;
        this.#parent = null;
        this.#content = isDir ? new Map() : '';
        this.#ownerName = ownerName;
        this.#groupName = groupName;
        this.#size = isDir ? 4096 : 0;
        this.#mtime = new Date();
    }

    get size() {
        return this.#size;
    }

    set size(value) {
        this.#size = value;
    }

    get mtime() {
        return this.#mtime;
    }

    set mtime(value) {
        this.#mtime = value;
    }

    get fileName() {
        const parts = this.#path.split('/');
        return parts[parts.length - 1];
    }

    get isDirectory() { return this.#isDirectory; }
    set isDirectory(value) { this.#isDirectory = value; }

    get permOwner() { return this.#permOwner; }
    set permOwner(value) {
        if (value >= 0 && value <= 7) {
            this.#permOwner = value;
        }
    }

    get permGroup() { return this.#permGroup; }
    set permGroup(value) {
        if (value >= 0 && value <= 7) {
            this.#permGroup = value;
        }
    }

    get permOther() { return this.#permOther; }
    set permOther(value) {
        if (value >= 0 && value <= 7) {
            this.#permOther = value;
        }
    }

    get path() { return this.#path; }
    set path(value) {
        if (this.#parent === null) {
            return "Cannot rename root directory";
        }
        const siblings = this.#parent.getChildren();
        for (const child of siblings) {
            if (child.fileName === value) {
                return `'${value}' already exists in ${this.#parent.fileName}`;
            }
        }
        this.#path = value;
    }

    get ownerName() { return this.#ownerName; }
    set ownerName(value) {
        if (ownerNames.includes(value)) {
            this.#ownerName = value;
        } else {
            return `Owner '${value}' does not exist`;
        }
    }

    get groupName() { return this.#groupName; }
    set groupName(value) {
        if (groupNames.includes(value)) {
            this.#groupName = value;
        } else {
            return `Group '${value}' does not exist`;
        }
    }

    get parent() { return this.#parent; }

    get content() { return this.#content; }
    set content(value) { this.#content = value; }

    addChild(item) {
        if (!this.#isDirectory) {
            return `'${this.fileName}' is not a directory`;
        }
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
        if (this.#parent === null) {
            return '';
        }
        return this.#parent.getAbsolutePath() + '/' + this.fileName;
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

    removeChild(name) {
        if (!this.#isDirectory) {
            return false;
        }
        return this.#content.delete(name);
    }

}

class FileSystem {
    #root;
    #cwd;
    #username;
    #machinename;

    constructor(username, machinename) {
        this.#username = username;
        ownerNames.push(username);
        groupNames.push(username);
        this.#machinename = machinename;

        // FIXED: removed name argument, now 7 arguments
        this.#root = new file(true, 7, 5, 5, '/', 'root', 'root');

        const home = new file(true, 7, 5, 5, '/home', 'root', 'root');
        this.#root.addChild(home);

        const userFolder = new file(true, 7, 5, 5, '/home/' + username, username, username);
        home.addChild(userFolder);

        const documents = new file(true, 7, 5, 5, '/home/' + username + '/Documents', username, username);
        userFolder.addChild(documents);

        const downloads = new file(true, 7, 5, 5, '/home/' + username + '/Downloads', username, username);
        userFolder.addChild(downloads);

        const desktop = new file(true, 7, 5, 5, '/home/' + username + '/Desktop', username, username);
        userFolder.addChild(desktop);

        this.#cwd = userFolder;
    }

    get cwd() { return this.#cwd; }

    pwd() {
        const path = this.#cwd.getAbsolutePath();
        return path === '' ? '/' : path;
    }

    formatLs(options = {}) {
        const opts = {
            showAll: false,
            showAlmostAll: false,
            longFormat: false,
            humanReadable: false,
            reverse: false,
            recursive: false,
            sortBySize: false,
            sortByTime: false,
            onePerLine: false,
            path: null
        };
        Object.assign(opts, options);

        let target = this.#cwd;
        if (opts.path) {
            const resolved = this.#resolvePath(opts.path);
            if (!resolved) {
                return `ls: cannot access '${opts.path}': No such file or directory`;
            }
            if (!resolved.isDirectory) {
                return opts.path;
            }
            target = resolved;
        }

        let children = target.getChildren();

        if (!opts.showAll && !opts.showAlmostAll) {
            children = children.filter(c => !c.fileName.startsWith('.'));
        }

        if (opts.sortBySize) {
            children.sort((a, b) => b.size - a.size);
        } else if (opts.sortByTime) {
            children.sort((a, b) => b.mtime - a.mtime);
        } else {
            children.sort((a, b) => a.fileName.localeCompare(b.fileName));
        }

        if (opts.reverse) {
            children.reverse();
        }

        if (opts.showAll) {
            children = ['.', '..', ...children];
        }

        if (opts.longFormat) {
            return this.formatLongListing(children, target, opts);
        }
        return this.formatShortListing(children, opts);
    }

    formatShortListing(children, opts) {
        const names = children.map(child => {
            if (child === '.' || child === '..') {
                return '<span class="dir-color">' + child + '</span>';
            }
            if (child.isDirectory) {
                return '<span class="dir-color">' + child.fileName + '</span>';
            }
            if (child.fileName.endsWith('.exe') || child.fileName.endsWith('.out')) {
                return '<span class="exec-color">' + child.fileName + '</span>';
            }
            return '<span class="file-color">' + child.fileName + '</span>';
        });

        if (opts.onePerLine) {
            return names.join('\n');
        }
        return names.join('  ');
    }

    formatLongListing(children, target, opts) {
        let total = 0;
        for (const child of children) {
            if (child === '.' || child === '..') {
                total += 4096;
            }
            else {
                total += child.size;
            }
        }

        const totalStr = opts.humanReadable ? Math.ceil(total / 1024) + 'K' : String(total);
        const lines = ['total ' + totalStr];

        for (const child of children) {
            if (child === '.' || child === '..') {
                const perm = child === '.' ? 'drwx------' : 'drwxr-xr-x';
                const owner = child === '.' ? this.#username : 'root';
                const group = child === '.' ? this.#username : 'root';
                const nameSpan = '<span class="dir-color">' + child + '</span>';
                const date = this.formatDate(new Date());
                lines.push(perm + ' 0 ' + owner + ' ' + group + ' 4096 ' + date + ' ' + nameSpan);
                continue;
            }

            const nameSpan = this.getColoredName(child);
            const perm = child.getPermissionString();
            const links = child.isDirectory ? child.getChildren().length : 1;
            const size = this.formatSize(child.size, opts.humanReadable);
            const date = this.formatDate(child.mtime);

            const line = perm + ' ' + String(links).padStart(2, ' ') + ' ' + child.ownerName + ' ' + child.groupName + ' ' + String(size).padStart(5, ' ') + ' ' + date + ' ' + nameSpan;
            lines.push(line);
        }
        return lines.join('\n');
    }

    getColoredName(child) {
        if (child.isDirectory) {
            return '<span class="dir-color">' + child.fileName + '</span>';
        }
        if (child.fileName.endsWith('.exe') || child.fileName.endsWith('.out')) {
            return '<span class="exec-color">' + child.fileName + '</span>';
        }
        return '<span class="file-color">' + child.fileName + '</span>';
    }

    formatDate(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return month + ' ' + String(day).padStart(2, ' ') + ' ' + hours + ':' + minutes;
    }

    formatSize(size, humanReadable) {
        if (!humanReadable) return String(size);
        if (size < 1024) return size + 'B';
        if (size < 1024 * 1024) return (size / 1024).toFixed(1) + 'K';
        return (size / (1024 * 1024)).toFixed(1) + 'M';
    }

    
    cd(path) {
        if (!path || path === '~') {
            this.#cwd = this.#findHome();
            return null;
        }
        if (path === '.') return null;
        if (path === '..') {
            if (this.#cwd.parent !== null) {
                this.#cwd = this.#cwd.parent;
            }
            return null;
        }
        if (path === '/') {
            this.#cwd = this.#root;
            return null;
        }


        const target = this.#resolvePath(path);
        if (target === null) {
            return `cd: ${path}: No such file or directory`;
        }
        if (!target.isDirectory) {
            return `cd: ${path}: Not a directory`;
        }
        this.#cwd = target;
        return null;
    }

    move(srcPath, destPath, noClobber = false) {
        const src = this.#resolvePath(srcPath);
        if (!src) {
            return { error: `mv: cannot stat '${srcPath}': No such file or directory` };
        }




        let destParent, destName;
        const destTarget = this.#resolvePath(destPath);


        if (destTarget && destTarget.isDirectory) {
            destParent = destTarget;
            destName = src.fileName;
        } 
        
        
        else {
            const parts = destPath.split('/');
            destName = parts[parts.length - 1];
            const parentPath = parts.slice(0, -1).join('/') || '.';
            destParent = parentPath === '.' ? this.#cwd : this.#resolvePath(parentPath);
            
            
            if (!destParent) {
                return { error: `mv: cannot move '${srcPath}' to '${destPath}': No such file or directory` };
            }
        }


        const existing = destParent.getChild(destName);
        if (existing) {
            if (noClobber) {
                return { success: true, skipped: true };
            }
            destParent.removeChild(destName);
        }

        src.parent.removeChild(src.fileName);

        src.path = destParent.getAbsolutePath() + '/' + destName;
        destParent.addChild(src);

        return { success: true, src, destName };
    }

    copy(srcPath, destPath, recursive = false, noClobber = false) {
        const src = this.#resolvePath(srcPath);
        if (!src) {
            return { error: `cp: cannot stat '${srcPath}': No such file or directory` };
        }
        if (src.isDirectory && !recursive) {
            return { error: `cp: -r not specified; omitting directory '${srcPath}'` };
        }

        let destParent, destName;
        const destTarget = this.#resolvePath(destPath);

        if (destTarget && destTarget.isDirectory) {
            destParent = destTarget;
            destName = src.fileName;
        } else {
            const parts = destPath.split('/');
            destName = parts[parts.length - 1];
            const parentPath = parts.slice(0, -1).join('/') || '.';
            destParent = parentPath === '.' ? this.#cwd : this.#resolvePath(parentPath);
            if (!destParent) {
                return { error: `cp: cannot create regular file '${destPath}': No such file or directory` };
            }
        }

        const existing = destParent.getChild(destName);
        if (existing && noClobber) {
            return { success: true, skipped: true };
        }

        if (existing) {
            destParent.removeChild(destName);
        }

        const copy = this.#deepCopy(src, destParent.getAbsolutePath() + '/' + destName, destParent);
        destParent.addChild(copy);
        return { success: true, src, destName };
    }

    #deepCopy(src, newPath, newParent) {
        if (src.isDirectory) {
            const folder = new file(true, src.permOwner, src.permGroup, src.permOther, newPath, src.ownerName, src.groupName);
            for (const child of src.getChildren()) {
                const childCopy = this.#deepCopy(child, newPath + '/' + child.fileName, folder);
                folder.addChild(childCopy);
            }
            return folder;
        }
        else {
            const copy = new file(false, src.permOwner, src.permGroup, src.permOther, newPath, src.ownerName, src.groupName);
            copy.content = src.content;
            copy.size = src.content.length;
            return copy;
        }
    }

    #resolvePath(path) {
        let current;
        if (path.startsWith('/')) {
            current = this.#root;
            path = path.slice(1);
        } else {
            current = this.#cwd;
        }

        if (path === '') return current;

        const parts = path.split('/');
        for (const part of parts) {
            if (part === '' || part === '.') continue;
            if (part === '..') {
                if (current.parent) current = current.parent;
                continue;
            }
            const child = current.getChild(part);
            if (!child) return null;
            current = child;
        }
        return current;
    }

    #findHome() {
        const home = this.#root.getChild('home');
        if (home) {
            const userFolder = home.getChild(this.#username);
            if (userFolder) return userFolder;
        }
        return this.#root;
    }

    resolve(path) {
        return this.#resolvePath(path);
    }

    readFile(name) {
        const target = this.#cwd.getChild(name);
        if (!target) {
            return { error: `cat: ${name}: No such file or directory` };
        }
        if (target.isDirectory) {
            return { error: `cat: ${name}: Is a directory` };
        }
        return { content: target.content };
    }

    mkdir(name, parents = false, mode = null, verbose = false) {
        if (this.#cwd.getChild(name)) {
            return `mkdir: cannot create directory '${name}': File exists`;
        }

        if (parents && name.includes('/')) {
            const parts = name.split('/');
            let current = this.#cwd;
            let pathSoFar = this.#cwd.getAbsolutePath();

            for (const part of parts) {
                pathSoFar += '/' + part;
                if (!current.getChild(part)) {
                    const newFolder = new file(true, 7, 5, 5, pathSoFar, this.#username, this.#username);
                    current.addChild(newFolder);
                }
                current = current.getChild(part);
            }
            if (verbose) {
                return `mkdir: created directory '${name}'`;
            }
            return null;
        }

        const newFolder = new file(true, 7, 5, 5, this.#cwd.getAbsolutePath() + '/' + name, this.#username, this.#username);

        if (mode !== null) {
            const perms = parseInt(mode, 8);
            if (!isNaN(perms)) {
                newFolder.permOwner = (perms >> 6) & 7;
                newFolder.permGroup = (perms >> 3) & 7;
                newFolder.permOther = perms & 7;
            }
        }

        this.#cwd.addChild(newFolder);

        if (verbose) {
            return `mkdir: created directory '${name}'`;
        }

        return null;
    }

    remove(name, recursive = false) {
        const target = this.#cwd.getChild(name);
        if (!target) {
            return { error: `rm: cannot remove '${name}': No such file or directory` };
        }
        if (target.isDirectory && !recursive) {
            return { error: `rm: cannot remove '${name}': Is a directory` };
        }
        target.parent.removeChild(target.fileName);
        return { success: true };
    }

    touch(name, noCreate = false) {
        const existing = this.#cwd.getChild(name);
        if (existing) {
            return null;
        }
        if (noCreate) {
            return `touch: cannot touch '${name}': No such file or directory`;
        }

        const newFile = new file(false, 6, 4, 4, this.#cwd.getAbsolutePath() + '/' + name, this.#username, this.#username);
        this.#cwd.addChild(newFile);
        return null;
    }
}