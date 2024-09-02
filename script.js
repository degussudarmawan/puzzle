// Function to make side navigation
function openNav() {
	document.getElementById("sidenavbar").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
	document.getElementById("sidenavbar").style.width = "0";
	document.getElementById("main").style.marginLeft= "0";
}

// Function to make an element draggable
function makeElementDraggable(el, index) {
	let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
	el.onmousedown = function (e) {

		if (index === 6) {	// play brat for piece that has brat color
			const clickSound = new Audio('apple.mp3');
			playSound(clickSound); // Play the sound on click
		}
		dragMouseDown(e);
	};

	function dragMouseDown(e) {
		e.preventDefault();
		// Get the mouse cursor position at startup
		mouseX = e.clientX;
		mouseY = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function playSound(clickSound) {
		clickSound.currentTime = 0; // Rewind to the start
		clickSound.play(); // Play the sound
	}

	function elementDrag(e) {
		e.preventDefault();
		// Calculate the new cursor position
		posX = mouseX - e.clientX;
		posY = mouseY - e.clientY;
		mouseX = e.clientX;
		mouseY = e.clientY;
		// Set the element's new position
		el.style.top = (el.offsetTop - posY) + "px";
		el.style.left = (el.offsetLeft - posX) + "px";
	}

	function closeDragElement() {
		// Stop moving when the mouse button is released
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

// Make the element with id "piece" draggable
document.querySelectorAll('.grid-item').forEach((item, index) => {
	item.id = `piece${index + 1}`;
	item.style.top = `${index * 150}px`; // Adjust initial positions as needed
	item.style.left = `${index * 100}px`;
	makeElementDraggable(item, index);
});