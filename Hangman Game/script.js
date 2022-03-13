const wordEL = document.getElementById('word');
const wrongLettersEL = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll('.figure-part')

const words = ['application', 'programing', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = ['w', 'i', 'z', 'a', 'r', 'd'];
const wrongLetters = [];

//Show the hidden word
function displayWord() {
    wordEL.innerHTML = `
   ${selectedWord
            .split('')
            .map(letter =>
                `<span class="letter">${correctLetters.includes(letter) ? letter : ''}
         </span>` )
            .join('')}
   `;

    const innerWord = wordEL.innerText.replace(/\n/g, '')

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won!'
        popup.style.display = 'flex';
    }
}

//Update the wrong letters
function updateWrongLettersEL() {

    //display wrong letters
    wrongLettersEL.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    //display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';

        } else {
            part.style.display = 'none';
        }
    })

    //check if lost 
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You Lost !'
        popup.style.display = 'flex'

    } else {

    }
}

//show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


// KeyDown Letter press

window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEL();
            } else {
                showNotification();
            }
        }
    }


})

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)]
    displayWord();
    updateWrongLettersEL();
    popup.style.display = 'none';
})

displayWord();