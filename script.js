const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchesFound = 0;
let gameOver = false;

document.getElementById('start-button').addEventListener('click', startGame);

function startGame() {
	document.getElementById('welcome-note').style.display = 'none';
	document.getElementById('game-container').style.display = 'flex';
	cards.forEach(card => {
		card.addEventListener('click', flipCard);
	});
}

function flipCard() {
	if (gameOver) return;
	const card = this;
	if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;
	flippedCards.push(card);
	card.classList.add('flipped');
	if (flippedCards.length === 2) {
		const [card1, card2] = flippedCards;
		const letter1 = card1.dataset.letter;
		const letter2 = card2.dataset.letter;
		if (letter1 === letter2) {
			card1.classList.add('matched');
			card2.classList.add('matched');
			matchesFound++;
			if (matchesFound === cards.length / 2) {
				gameOver = true;
				setTimeout(() => alert('You won!'), 500); // Slight delay before the alert
			}
			flippedCards = [];
		} else {
			setTimeout(() => {
				card1.classList.remove('flipped');
				card2.classList.remove('flipped');
				flippedCards = [];
			}, 1000);
		}
	}
}
