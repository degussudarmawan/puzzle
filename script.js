// Function to make side navigation
function openNav() {
	document.getElementById("sidenavbar").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
	document.getElementById("sidenavbar").style.width = "0";
	document.getElementById("main").style.marginLeft = "0";
}

// Function to make an element draggable
function makeElementDraggable(el, index) {
	let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

	el.onmousedown = dragAndPlaySound;
	el.ontouchstart = dragAndPlaySound;

	function dragAndPlaySound(e) {
		if (index === 6) {	// play brat for piece that has brat color
			const clickSound = new Audio('apple.mp3');
			playSound(clickSound); // Play the sound on click
		}
		dragMouseDown(e);
	};

	function dragMouseDown(e) {
		e.preventDefault();

		// Get the mouse cursor position at startup
		if (e.type === 'touchstart') {
			mouseX = e.touches[0].clientX;
			mouseY = e.touches[0].clientY;
		} else {
			mouseX = e.clientX;
			mouseY = e.clientY;
		}
		
		document.onmouseup = closeDragElement;
		document.ontouchend = closeDragElement; // For touch devices
		document.onmousemove = elementDrag;
		document.ontouchmove = elementDrag; // For touch devices
	}

	function playSound(clickSound) {
		clickSound.currentTime = 0; // Rewind to the start
		clickSound.play(); // Play the sound
	}

	function elementDrag(e) {
		e.preventDefault();
		// Calculate the new cursor position
		if (e.type === 'touchmove') {
			posX = mouseX - e.touches[0].clientX;
			posY = mouseY - e.touches[0].clientY;
			mouseX = e.touches[0].clientX;
			mouseY = e.touches[0].clientY;
		} else {
			posX = mouseX - e.clientX;
			posY = mouseY - e.clientY;
			mouseX = e.clientX;
			mouseY = e.clientY;
		}

		// Set the element's new position
		el.style.top = (el.offsetTop - posY) + "px";
		el.style.left = (el.offsetLeft - posX) + "px";
	}

	function closeDragElement() {
		// Stop moving when the mouse button is released
		document.onmouseup = null;
		document.ontouchend = null; // For touch devices
		document.onmousemove = null;
		document.ontouchmove = null; // For touch devices
	}
}

// Make the element with id "piece" draggable
document.querySelectorAll('.grid-item').forEach((item, index) => {
	item.id = `piece${index + 1}`;
	item.style.top = `${index * 150}px`; // Adjust initial positions as needed
	item.style.left = `${index * 100}px`;
	makeElementDraggable(item, index);
});

// Shuffle all the pieces
function shuffleElements() {
	const elements = document.querySelectorAll('.grid-item');
	const container = document.querySelector('.grid-container');

	elements.forEach(el => {
		// Generate random positions within the container
		const maxX = container.clientWidth - el.clientWidth;
		const maxY = container.clientHeight - el.clientHeight;
		const randomX = Math.floor(Math.random() * maxX);
		const randomY = Math.floor(Math.random() * maxY);

		// Set the new position
		el.style.left = `${randomX}px`;
		el.style.top = `${randomY + 300}px`;
	});
}

const shuffleBtn = document.querySelector('.guess');
shuffleBtn.addEventListener('click', shuffleElements);