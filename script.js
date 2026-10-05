const board = document.getElementById("game-board");
const liquid = document.getElementById("liquid");
const spyglass = document.getElementById("spyglass");

let x = 50;
let y = 50;

function moveSpyGlass(clientX, clientY) {

  const rect = board.getBoundingClientRect();

  const mouseX = clientX - rect.left;
  const mouseY = clientY - rect.top;

  x = Math.max(0, Math.min(mouseX, rect.width));
  y = Math.max(0, Math.min(mouseY, rect.height));

  spyglass.style.left = x + "px";
  spyglass.style.top = y + "px";

  liquid.style.maskImage =
    `radial-gradient(circle 49px at ${x}px ${y}px, transparent 98%, black 100%)`;

  liquid.style.webkitMaskImage =
    `radial-gradient(circle 49px at ${x}px ${y}px, transparent 98%, black 100%)`;
}


/* Mouse controls */

board.addEventListener("mousemove", function(event) {

  moveSpyGlass(event.clientX, event.clientY);

});


/* Touch controls */

board.addEventListener("touchmove", function(event) {

  const touch = event.touches[0];

  moveSpyGlass(touch.clientX, touch.clientY);

}, { passive: true });


/* Starting position */

const startingRect = board.getBoundingClientRect();

moveSpyGlass(
  startingRect.left + startingRect.width / 2,
  startingRect.top + startingRect.height / 2
);const hiddenObjects = document.querySelectorAll(".hidden-object");
const checklistItems = document.querySelectorAll(".find-item");
const scoreDisplay = document.getElementById("score");
const winScreen = document.getElementById("win-screen");
const playAgainButton = document.getElementById("play-again");

let score = 0;
const foundObjects = new Set();

hiddenObjects.forEach(function(object) {

  object.addEventListener("click", function() {

    const objectName = object.dataset.object;

    if (foundObjects.has(objectName)) {
      return;
    }

    foundObjects.add(objectName);
    score++;

    scoreDisplay.textContent = score;
    if (score === 12) {

  setTimeout(function() {
    winScreen.classList.add("show");
  }, 400);

}

    object.classList.add("found");

    const matchingChecklistItem =
      document.querySelector('.find-item[data-object="' + objectName + '"]');

    if (matchingChecklistItem) {
      matchingChecklistItem.classList.add("found");
    }

  });

});

function randomiseObjects() {

  const positions = [
    [10, 18],
    [28, 17],
    [47, 18],
    [67, 17],
    [87, 20],

    [17, 40],
    [38, 39],
    [59, 41],
    [80, 40],

    [10, 62],
    [30, 61],
    [50, 63],
    [70, 61],
    [89, 64],

    [19, 82],
    [40, 81],
    [61, 82],
    [82, 81]
  ];

  /* Shuffle the available hiding places */

  for (let i = positions.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [positions[i], positions[j]] =
      [positions[j], positions[i]];

  }

  /* Give each object a new position */

  hiddenObjects.forEach(function(object, index) {

    object.style.left = positions[index][0] + "%";
    object.style.top = positions[index][1] + "%";

  });

}


playAgainButton.addEventListener("click", function() {

  score = 0;

  foundObjects.clear();

  scoreDisplay.textContent = "0";

  hiddenObjects.forEach(function(object) {
    object.classList.remove("found");
  });

  checklistItems.forEach(function(item) {
    item.classList.remove("found");
  });

  randomiseObjects();

  winScreen.classList.remove("show");

});
randomiseObjects();