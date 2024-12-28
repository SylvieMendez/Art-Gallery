//Selectors
const searchButton = document.querySelector(".searchBtn");
const galleryElement = document.querySelector(".gallery");

const searchContainer = document.querySelector(".search-container");
const backHomeButton = document.querySelector(".back-home");

const query = document.querySelector(".search").value;
const searchURL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}`;

//Formatting the images
function formatImageData(data) {
  return data.map( item => ({
    url: item.urls.small,
    alt: item.alt_description || "Photo",
  }));
}

//Displays after search
function displayImages(images) {
  galleryElement.innerHTML = "";

      images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.url;
        imgElement.alt = image.alt;
        imgElement.classList.add("gallery-img");
        galleryElement.appendChild(imgElement);
      });
}

//Event listeners
searchButton.addEventListener("click", () => {
  const query = document.querySelector(".search").value;
  const searchURL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}`;

  if(!query) {
    alert("Please enter a search term!");
    return;
  }

  searchContainer.classList.add("hidden");
  backHomeButton.style.display = "block";

  fetch(searchURL)
    .then(response => response.json())
    .then(data => {
      const formattedImages = formatImageData(data.results);
      displayImages(formattedImages);
})
  .catch(error => console.error("Error fetching images: ", error));
});

backHomeButton.addEventListener("click", () => {
  window.location.reload();
});