const addGameCard = (key, url) => {
  const button = document.createElement("button");
  button.setAttribute("class", "game-card");
  button.setAttribute("data-key", key);

  const image = document.createElement("img");
  image.setAttribute("src", url);
  image.setAttribute("alt", "card");
  image.setAttribute("class", "game-card__image");

  const cape = document.createElement("img");
  cape.setAttribute("src", "./images/cape.png");
  cape.setAttribute("alt", "Cape");
  cape.setAttribute("class", "game-card__cape");

  cape.classList.add("animate__animated");
  cape.classList.add("animate__fadeIn");
  cape.classList.add("animate__delay-1s");

  button.appendChild(image);
  button.appendChild(cape);

  document.querySelector("#game").appendChild(button);
};
