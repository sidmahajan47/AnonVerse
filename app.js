const API_KEY = 'KovsM5YjTE4n1sMfvBaie6A1fYmUiamAEOHZWlKP'; 
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

const apodContainer = document.getElementById('apod-container');
const surpriseBtn = document.getElementById('surprise-btn');
const musicBtn = document.getElementById('music-btn');
const audioPlayer = document.getElementById('ambient-music');


async function fetchAPOD(date = '') {
    try {
        apodContainer.innerHTML = '<div class="loading">Loading...</div>';
        const url = date ? `${APOD_URL}&date=${date}` : APOD_URL;
        const response = await fetch(url);
        const data = await response.json();

        apodContainer.innerHTML = `
            <h2>${data.title}</h2>
            ${data.media_type === 'image' ? 
                `<img id="apod-image" src="${data.url}" alt="${data.title}">` : 
                `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`
            }
            <p>${data.explanation}</p>
        `;
    } catch (error) {
        apodContainer.innerHTML = '<p>Failed to load APOD. Try again later!</p>';
    }
}


function getRandomAPODDate() {
    const start = new Date(1995, 5, 16);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
}


surpriseBtn.addEventListener('click', () => {
    const randomDate = getRandomAPODDate();
    fetchAPOD(randomDate);
});

musicBtn.addEventListener('click', () => {
    audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
});


fetchAPOD();