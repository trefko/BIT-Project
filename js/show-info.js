const back = document.querySelector(".head>h3");

function getShow(card) {
  const img = document.querySelector(".img");
  img.src = card.image.original;

  const id = document.querySelector(".id");
  id.textContent = `Id: ${card.id}`;

  const show = document.querySelector(".show-name");
  show.textContent = `Name: ${card.name}`;

  const status = document.querySelector(".status");
  status.textContent = `Status: ${card.status}`;

  const runtime = document.querySelector(".runtime");
  runtime.textContent = `Runtime: ${card.runtime}`;

  const premiered = document.querySelector(".premiered");
  premiered.textContent = `Premiered: ${card.premiered}`;

  const description = document.querySelector(".description");
  description.innerHTML = `Description: ${card.summary}`;
}

const result = document.querySelector(".result");
function getOption(string) {
  const API = `https://api.tvmaze.com/search/shows?q=${string}`;
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      makeOptions(data);
    });
}

function makeOptions(data) {
  result.innerHTML = "";

  data.forEach((e) => {
    const txt = document.createElement("p");
    txt.textContent = e.show.name;
    result.append(txt);
    txt.addEventListener("click", () => {
      localStorage.setItem("show", JSON.stringify(e.show));
      location.href = "../BitShow/show-info.html";
    });
  });
}

back.addEventListener("click", () => {
  window.location.pathname = "../BitShow/index.html";
});

const search = document.querySelector(".search");
search.addEventListener(
  "keyup",
  debounce(() => {
    getOption(search.value);
  })
);

function debounce(func, timeout = 700) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

window.addEventListener("load", () => {
  const getInfo = JSON.parse(localStorage.getItem("show"));
  getShow(getInfo);
});
