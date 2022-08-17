const usernameDisplay = document.querySelector("#username-display");
const timerDisplay = document.querySelector("#timer-display");

var time, timeInterval;
var images,
  selections,
  answers = [];

const loadImages = async () => {
  for (let i = 0; i < 12; i++) {
    const url = await getRandomImage();

    const data = {
      key: i,
      url,
    };

    for (let j = 0; j < 2; j++) {
      images.push(data);
    }
  }

  images.sort(randomize);
};

const clearSelections = () => {
  while (selections.length > 0) {
    selections.pop();
  }
};

const handleCardSelection = (e) => {
  const elem = e.target;
  const key = elem.offsetParent.getAttribute("data-key");

  if (selections.length === 2 && !elem.classList.contains("selected")) {
    return;
  }

  if (selections.length <= 2 && !elem.classList.contains("selected")) {
    elem.classList.remove("animate__fadeIn");
    elem.classList.remove("animate__delay-1s");
    elem.classList.add("animate__fadeOut");
    elem.classList.add("selected");

    selections.push({ key, elem });
  }

  const [first, second] = selections;

  if (!!first && !!second && first.key !== second.key) {
    selections = [];

    second.elem.classList.remove("selected");
    first.elem.classList.remove("selected");

    setTimeout(() => {
      first.elem.classList.remove("animate__fadeOut");
      second.elem.classList.remove("animate__fadeOut");
    }, 1000);
    second.elem.classList.add("animate__fadeIn");

    return;
  }

  if (!!first && !!second) {
    first.elem.offsetParent.classList.add("animate__animated");
    first.elem.offsetParent.classList.add("animate__bounceOut");

    second.elem.offsetParent.classList.add("animate__animated");
    second.elem.offsetParent.classList.add("animate__bounceOut");

    selections = [];

    answers.push(key);
  }

  if (answers.length === 12) {
    clearInterval(timeInterval);
    timerDisplay.classList.remove("animate__animated");
    timerDisplay.classList.remove("animate__pulse");
    timerDisplay.classList.remove("animate__infinite");
    timerDisplay.innerHTML = "Parabéns, você ganhou!";

    const username = sessionStorage.getItem("MemoryGameLoginSession");

    const restart = confirm(
      `Parabéns, ${
        username.split(" ")[0]
      }, você ganhou!! \n\rDeseja jogar novamente?`
    );

    if (restart) {
      startGame();
    } else {
      clearCards();
    }
  }
};

const startTimer = () => {
  timeInterval = setInterval(() => {
    time--;

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes < 1 && seconds < 10) {
      timerDisplay.style.color = "red";
      timerDisplay.classList.add("animate__animated");
      timerDisplay.classList.add("animate__pulse");
      timerDisplay.classList.add("animate__infinite");
    }

    if (seconds === 0) {
      clearInterval(timeInterval);
      timerDisplay.classList.remove("animate__animated");
      timerDisplay.classList.remove("animate__pulse");
      timerDisplay.classList.remove("animate__infinite");
    }

    if (time > 0) {
      timerDisplay.innerHTML = `${minutes}:${seconds} min`;
      return;
    }

    timerDisplay.innerHTML = "Acabou o tempo!";

    setTimeout(() => {
      const restart = confirm(
        `${usernameDisplay.innerHTML}, você perdeu :( \n\rDeseja reiniciar o jogo?`
      );

      if (restart) {
        startGame();
      } else {
        clearCards();
      }
    }, 500);
  }, 1000);
};

const clearCards = () => {
  const cards = document.querySelectorAll(".game-card");

  for (let card of cards) {
    card.remove();
  }
};

const startGame = async () => {
  time = 120;
  timeInterval = undefined;

  images = [];
  selections = [];

  clearCards();

  await loadImages();

  for (let image of images) {
    addGameCard(image.key, image.url);
  }

  const cards = document.querySelectorAll(".game-card");

  for (let card of cards) {
    card.addEventListener("click", handleCardSelection);
  }

  startTimer();
};

window.onload = async () => {
  const username = sessionStorage.getItem("MemoryGameLoginSession");

  usernameDisplay.innerHTML = `Olá, ${username.split(" ")[0]}!`;

  await startGame();
};
