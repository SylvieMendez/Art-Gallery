//Display function 
function fetchAndDisplayImages(apiUrl, galleryElement, formatImageData, headers = {}) {

  galleryElement.innerHTML = '<div class="loading-spinner"></div>';

  fetch(apiUrl, {headers})
    .then(response => response.json())
    .then(data => {
      const images = formatImageData(data);
      galleryElement.innerHTML = ""; // Clear gallery

      images.forEach(image => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "image-container";

        const imgElement = document.createElement("img");
        imgElement.src = image.url;
        imgElement.alt = image.alt;
        imgElement.classList.add("gallery-img");

        imgElement.loading = "lazy";

        const overlay = document.createElement("div");
        overlay.className = "image-overlay";
        overlay.innerHTML = `
          <h3>${image.alt}</h3>
          <button class="favorite-btn">♡</button>
        `;

        imgElement.style.width = "200px";
        imgElement.style.height = "150px";
        imgElement.style.objectFit = "cover";

        console.log("Image dimensions: ", imgElement.style.width, imgElement.style.height);
        
        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(overlay);
        galleryElement.appendChild(imgContainer);

      });
    })
    .catch(error => {
      console.error("Error fetching images:", error);
      galleryElement.innerHTML = `
        <div class="error-message">
          Failed to load images. Please try again later.
        </div>
      `;
    });
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};
  

//API keys
const NASA_API_KEY = "zujjutLoqRWboN9scfMqHeUpWqB4xjR0Myyj0u98";
const UNSPLASH_API_KEY = "yyb301zT0Yr2kJ82em6upzST5LX2Z1s2jkucMK1Aios";
const PIXEL_API_KEY = "ojQU7PunyOUouQaO6ek4bZvwZJFfpdcCky7FR0dhltYYrnr3GrjhghqC";

//Selectors
const spaceGallery = document.querySelector("#space-gallery");
const natureGallery = document.querySelector("#nature-gallery");
const minimalGallery = document.querySelector("#minimal-gallery");
const travelGallery = document.querySelector("#travel-gallery");

// NASA API
const nasaUrl = `https://api.nasa.gov/planetary/apod?count=10&api_key=${NASA_API_KEY}`;
fetchAndDisplayImages(nasaUrl, spaceGallery, data => data
  .filter(item => item.media_type === "image")
  .map(item => ({url: item.url, alt: item.title || "Space Photo"}))
);

// Unsplash API
const unsplashNatureUrl = `https://api.unsplash.com/search/photos?query=nature&per_page=10&client_id=${UNSPLASH_API_KEY}`;
fetchAndDisplayImages(unsplashNatureUrl, natureGallery, data => 
  data.results.map(item => ({url: item.urls.small, alt: item.alt_description || "Nature Photo"}))
);

const unsplashMinimalUrl = `https://api.unsplash.com/search/photos?query=minimal&per_page=10&client_id=${UNSPLASH_API_KEY}`;
fetchAndDisplayImages(unsplashMinimalUrl, minimalGallery, data => 
  data.results.map(item => ({url: item.urls.small, alt: item.alt_description || "Minimal Photo"}))
);

//Pixel API
const pixelTravelUrl = `https://api.pexels.com/v1/search?query=travel&per_page=15&page=1`;
fetchAndDisplayImages(pixelTravelUrl, travelGallery, data => 
  data.photos.map(item => ({
    url: item.src.small, 
    alt: item.alt || "Travel Photo",
  })),
  {Authorization: PIXEL_API_KEY}
);