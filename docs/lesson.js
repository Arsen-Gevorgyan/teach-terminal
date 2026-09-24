function getComletedLessons() {
    const data = localStorage.getItem('completedLessons');
    return data ? JSON.parse(data) : [];
}

function renderLessonTimeline() {
    const container = document.getElementById('lesson-timeline');
    if (!container) return;

    const completed = getComletedLessons();
    const maxUnlocked = completed.length === 0 ? 1 : Math.max(...completed) + 1;

    LESSONS.forEach(lesson => {
        const isCompleted = completed.includes(lesson.id);
        const isUnlocked = lesson.id <= maxUnlocked;

        const card = document.createElement('div');
        card.className = 'lesson-card';
        if (isCompleted) card.classList.add('completed');
        if (!isUnlocked) card.classList.add('locked');

        let statusText;
        if (isCompleted) statusText = 'COMPLETED';
        else if (isUnlocked) statusText = 'START';
        else statusText = 'LOCKED';

        card.innerHTML = '<div class="lesson-info">' + '<div class="lesson-num">LESSON ' + lesson.id + '</div>' + '<div class="lesson-title">' + lesson.title + '</div>' + '<div class="lesson-subtitle">' + lesson.subtitle + '</div>' + '</div>' + '<div class="lesson-status">' + statusText + '</div>';

        if (isUnlocked) {
            card.addEventListener('click', () =>  {
                window.location.href = 'main.html?lesson=' + lesson.id;

            });
        }
        container.appendChild(card);
    });
}

window.addEventListener('DOMContentLoaded', renderLessonTimeline);