let currentLesson = null;
let currentPhase = 'lecture';
let lessonComplete = false;
let showingSuccess = false;
let currentStep = 0;

const lessonWindow = document.getElementById('lesson-window');
const lessonTitle = document.getElementById('lesson-window-title');
const lessonBody = document.getElementById('lesson-window-body');
const lessonBackBtn = document.getElementById('lesson-back');
const lessonNextBtn = document.getElementById('lesson-next');
const lessonCloseBtn = document.getElementById('lesson-close');
const lessonMinimizeBtn = document.getElementById('lesson-minimize');
const lessonDragHandler = document.getElementById('lesson-window-drag');

function getLessonById(id) {
    for (const section of SECTIONS) {
        for (const lesson of section.lessons) {
            if (lesson.id === id) return lesson;
        }
    }
    return null;
}

function getCompletedLesson() {
    const data = localStorage.getItem('completedLessons');
    return data ? JSON.parse(data) : [];
}

function markLessonComplete(id) {
    const completed = getCompletedLesson();
    if (!completed.includes(id)) {
        completed.push(id);
        localStorage.setItem('completedLessons', JSON.stringify(completed));
    }
}

function renderLecture() {
    lessonBody.innerHTML = '';
    currentLesson.lecture.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        lessonBody.appendChild(p);
    });
}

function renderPractice() {
    lessonBody.innerHTML = '';

    const intro = document.createElement('p');
    intro.textContent = currentLesson.practice.intro;
    lessonBody.appendChild(intro);

    const spacer = document.createElement('p');
    spacer.innerHTML = '&nbsp;';
    lessonBody.appendChild(spacer);

    const steps = currentLesson.practice.steps;

    for (let i = 0; i < steps.length; ++i) {
        const p = document.createElement('p');

        if (i < currentStep) {
            p.textContent = '[x] ' + steps[i].task;
            p.style.color = 'var(--accent-color)';
        }
        else if (i === currentStep) {
            p.textContent = '[>] ' + steps[i].task;
            p.style.fontWeight = 'bold';
        }
        else {
            p.textContent = '[ ] ' + steps[i].task;
            p.style.color = '#888888';
        }

        lessonBody.appendChild(p);
    }

    // const p = document.createElement('p');
    // p.textContent = currentLesson.practice.task;
    // lessonBody.appendChild(p);

    // const hint = document.createElement('p');
    // hint.style.color = '#aaaaaa';
    // hint.style.fontSize = '0.8rem';
    // hint.textContent = 'Type the command in the terminal below.';
    // lessonBody.appendChild(hint);
}

function renderPracticeSuccess() {
    lessonBody.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = currentLesson.practice.success;
    p.style.color = 'var(--accent-color)';
    lessonBody.appendChild(p);
}

function renderCompleted() {
    lessonBody.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = 'Lesson complete. Click Next Lesson to continue.';
    lessonBody.appendChild(p);
}

function updateWindow() {
    if (!currentLesson) return;

    lessonTitle.textContent = 'Lesson ' + currentLesson.id + ': ' + currentLesson.title;
    lessonWindow.classList.remove('practice-mode');

    if (showingSuccess) {
        renderCompleted();
        lessonBackBtn.classList.add('hidden');
        lessonNextBtn.textContent = 'Next Lesson';
        lessonNextBtn.classList.remove('hidden');
        return;
    }

    if (currentLesson.type === 'lecture') {
        if (currentPhase === 'lecture') {
            renderLecture();
            lessonBackBtn.classList.add('hidden');
            lessonNextBtn.textContent = 'Complete';
            lessonNextBtn.classList.remove('hidden');
        }
        return;
    }

    if (currentPhase === 'lecture') {
        renderLecture();
        lessonBackBtn.classList.add('hidden');
        lessonNextBtn.textContent = 'Start Practice';
        lessonNextBtn.classList.remove('hidden');
    }
    else if (currentPhase === 'practice') {
        renderPractice();
        lessonWindow.classList.add('practice-mode');
        lessonBackBtn.textContent = 'Back';
        lessonBackBtn.classList.remove('hidden');
        lessonNextBtn.classList.add('hidden');
    }
}

function openLesson(id) {
    currentLesson = getLessonById(id);
    if (!currentLesson) return;

    const completed = getCompletedLesson();
    lessonComplete = completed.includes(id);

    currentPhase = 'lecture';
    showingSuccess = false;
    currentStep = 0;

    fs.cd('~');

    lessonWindow.classList.remove('hidden');
    updateWindow();
}

function handleNext() {
    if (!currentLesson) return;

    if (showingSuccess) {
        const nextId = currentLesson.id + 1;
        const next = getLessonById(nextId);
        if (next) {
            openLesson(nextId);
        }
        else {
            lessonWindow.classList.add('hidden');
        }
        return;
    }

    if (currentPhase === 'lecture' && currentLesson.type !== 'lecture') {
        currentStep = 0;
        currentPhase = 'practice';
        updateWindow();
        return;
    }

    if (currentPhase === 'lecture' && currentLesson.type === 'lecture') {
        if (!lessonComplete) {
            markLessonComplete(currentLesson.id);
            lessonComplete = true;
        }
        showingSuccess = true;
        updateWindow();
        return;
    }
}

function handleBack() {
    if (!currentLesson) return;

    if (currentPhase === 'practice' && !showingSuccess) {
        currentPhase = 'lecture';
        updateWindow();
    }
}

function checkPractice(command) {
    if (!currentLesson) return;
    if (currentPhase !== 'practice') return;
    if (showingSuccess) return;
    if (!currentLesson.practice) return;

    const steps = currentLesson.practice.steps;
    if (currentStep >= steps.length) return;

    const step = steps[currentStep];

    if (command === step.expected) {
        ++currentStep;

        if (currentStep >= steps.length) {
            if (!lessonComplete) {
                markLessonComplete(currentLesson.id);
                lessonComplete = true;
            }

            renderPracticeSuccess();
            showingSuccess = true;

            lessonWindow.classList.remove('practice-mode');
            lessonBackBtn.classList.add('hidden');
            lessonNextBtn.textContent = 'Next Lesson';
            lessonNextBtn.classList.remove('hidden');
        }
        else {
            renderPractice();

        }
    }

    // if (command === currentLesson.practice.expected) {
    //     if (!lessonComplete) {
    //         markLessonComplete(currentLesson.id);
    //         lessonComplete = true;
    //     }

    //     renderPracticeSuccess();
    //     showingSuccess = true;

    //     lessonWindow.classList.remove('practice-mode');
    //     lessonBackBtn.classList.add('hidden');
    //     lessonNextBtn.textContent = 'Next Lesson';
    //     lessonNextBtn.classList.remove('hidden');
    // }
}


lessonNextBtn.addEventListener('click', handleNext);
lessonBackBtn.addEventListener('click', handleBack);

lessonMinimizeBtn.addEventListener('click', () => {
    lessonWindow.classList.add('hidden');
});

lessonCloseBtn.addEventListener('click', () => {
    window.location.href = 'lessons.html';
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentLesson) {
        lessonWindow.classList.toggle('hidden');
    }
});

let dragOffsetX = 0;
let dragOffsetY = 0;
let isDragging = false;

lessonDragHandler.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = lessonWindow.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
});


document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    lessonWindow.style.left = (e.clientX - dragOffsetX) + 'px';
    lessonWindow.style.top = (e.clientY - dragOffsetY) + 'px';
    lessonWindow.style.right = 'auto';
});


document.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const lessonId = params.get('lesson');
    if (lessonId) {
        openLesson(parseInt(lessonId));
    }

});