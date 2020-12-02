'use srict';

let playing = false;
let clickCount;
let timer;
let prevCard;

Array.prototype.randomSort = function () {
    return this.sort(() => 0.5 - Math.random());
}

const clock = document.querySelector('.clock');

const cards = Array.from(document.querySelectorAll('.flip-card'));
cards.forEach(item => item.addEventListener('click', handleClick));

function handleClick() {
    if (!playing)
        startPlay();

    if (playing && clickCount < 2 && !this.classList.contains('show')) {
        clickCount++;
        this.classList.toggle('show');
    }
    if (clickCount == 1)
        prevCard = this;
    else if (clickCount == 2)
        checkCards(this);
};

const flipCards = Array.from(document.querySelectorAll('.flip-card-front'));
function startPlay() {
    ['@', '@', 'ℬ', 'ℬ', '§', '§', '©', '©', 'Ω', 'Ω']
        .randomSort()
        .forEach((item, index) => flipCards[index].textContent = item);
    playing = true;
    clickCount = 0;
    const startPlayTime = new Date();
    timer = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - startPlayTime) / 1000);
        clock.textContent = `${Math.floor(elapsedTime / 60)}:${String(elapsedTime % 60).padStart(2, 0)}`;
    }, 1000);
};

function checkCards(card) {
    if (prevCard.innerText !== card.innerText)      // nincs egyezés
        setTimeout(() => {
            clickCount = 0;
            [prevCard, card].forEach(item => item.classList.remove('show'));
        }, 1000);
    else {
        if (!cards.find(item => !item.classList.contains('show'))) {     // vége a játéknak
            clearInterval(timer);
            setTimeout(() => {
                playing = false;
                clock.textContent = '0:00';
                cards.forEach(item => item.classList.remove('show'));
            }, 5000);
        }
        else {
            clickCount = 0;
        }
    }
};