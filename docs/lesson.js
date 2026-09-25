function getComletedLessons() {
    const data = localStorage.getItem('completedLessons');
    return data ? JSON.parse(data) : [];
}

function isLessonUnlocked(lesson, section, completed) {
    if (section.isIntro) return true;

    const sectionIndex = SECTIONS.indexOf(section);
    if (sectionIndex === 0) return true;

    const prevSection = SECTIONS[sectionIndex - 1];
    if (!prevSection.isIntro) {
        for (const prev of prevSection.lessons) {
            if (!completed.includes(prev.id)) return false;
        }
    }
    
    const lessonIndex = section.lessons.indexOf(lesson);
    if (lessonIndex === 0) return true;

    const prevInSection = section.lessons[lessonIndex - 1];
    return completed.includes(prevInSection.id);
}

function renderSections() {
    const container = document.getElementById('lesson-timeline');
    if(!container) return;

    const completed = getComletedLessons();

    SECTIONS.forEach(section => {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'section';

        const header = document.createElement('div');
        header.className = 'section-header';

        let progressText = '';
        if (!section.isIntro) {
            const doneCount = section.lessons.filter(l => completed.includes(l.id)).length;
            progressText = doneCount + '/' + section.lessons.length + ' Done';
        }

        header.innerHTML = '<div class="section-title">' + '<span>' + section.title + '</span>' + '</div>' + '<div class="section-progress">' + progressText + '</div>';

        sectionEl.appendChild(header);
        const grid = document.createElement('div');
        grid.className = 'lesson-grid';

        section.lessons.forEach(lesson => {
            const unlocked = isLessonUnlocked(lesson, section, completed);
            const isDone = completed.includes(lesson.id);

            const card = document.createElement('div');
            card.className = 'lesson-card';
            if (isDone) card.classList.add('done');
            if (!unlocked) card.classList.add('locked');

            let statusText = '';
            if (section.isIntro) {
                statusText = '';
            }
            else if (isDone) {
                statusText = 'DONE';
            }
            else if (unlocked) {
                statusText = 'START';
            }
            else {
                statusText = 'LOCK';
            }

            card.innerHTML = '<div class="lesson-info">' + '<div class="lesson-num">LESSON ' + lesson.id + '</div>' + '<div class="lesson-title">' + lesson.title + '</div>' + '<div class="lesson-subtitle">' + lesson.subtitle + '</div>' + '</div>' + '<div class="lesson-status">' + statusText + '</div>';

            if (unlocked) {
                card.addEventListener('click', () => {
                    window.location.href = 'main.html?lesson=' + lesson.id;
                });
            }

            grid.appendChild(card);
        });

        sectionEl.appendChild(grid);
        container.appendChild(sectionEl);
    });
}

window.addEventListener('DOMContentLoaded', renderSections);