const form = document.querySelector("#loginForm");
const username = document.querySelector("#loginForm input[name=username]");
const loginBtn = document.querySelector("#loginForm button[type=submit]");

username.addEventListener("keyup", (e) => {
  const { value } = username;

  if (value.length < 8) {
    loginBtn.setAttribute("disabled", true);
  } else {
    loginBtn.removeAttribute("disabled");
  }

  if (e.keyCode === 13) {
    form.submit();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { value } = username;

  if (value.length < 8) {
    return;
  }

  sessionStorage.setItem("MemoryGameLoginSession", value);

  window.location.href = "./game.html";
});
