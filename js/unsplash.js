const UNSPLASH_ACCESS_KEY = "WfwWY4aRDxfOQdrcWeEHL4rwuDBxMl365C0S1Fu5osw";
const UNSPLASH_URL = "https://api.unsplash.com/";
const UNSPLASH_SEARCH_URL = UNSPLASH_URL + "search/photos";

const categories = [
  "nature",
  "beach",
  "football",
  "flight",
  "airport",
  "montain",
  "park",
  "kids",
  "tools",
  "cars",
  "medicine",
  "sports",
];

const getRandomImage = async () => {
  const category = categories[randomIntFromInterval(0, categories.length - 1)];

  const data = await fetch(
    `${UNSPLASH_SEARCH_URL}?client_id=${UNSPLASH_ACCESS_KEY}&query=${category}&orientation=landscape&per_page=20`
  ).then((res) => res.json());

  const image = data.results[randomIntFromInterval(0, data.results.length - 1)];

  return image.urls.small;
};
