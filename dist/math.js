var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);

const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");
const popupWindow = document.getElementById("popupWindow");
const dragHandle = document.getElementById("drag");
const fullscreenBtn = document.getElementById('fullscreen');
const fullscreenIcon = fullscreenBtn.querySelector('svg'); // The SVG icon inside the fullscreen button

openPopup.addEventListener("click", () => {
    popupWindow.style.display = "block";
    popupWindow.style.top = "50%";
    popupWindow.style.left = "50%";
    popupWindow.style.transform = "translate(-50%, -50%)";
});

closePopup.addEventListener("click", () => {
    popupWindow.style.display = "none";
});

// Dragging Logic
let isDragging = false;
let offsetX, offsetY;

dragHandle.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = popupWindow.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const rect = popupWindow.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // Restrict within viewport
        newLeft = Math.max(0, Math.min(newLeft, viewportWidth - rect.width));
        newTop = Math.max(0, Math.min(newTop, viewportHeight - rect.height));

        popupWindow.style.left = `${newLeft}px`;
        popupWindow.style.top = `${newTop}px`;
        popupWindow.style.transform = "none";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

// Fullscreen Logic
fullscreenBtn.addEventListener('click', () => {
    if (popupWindow.classList.contains('fullscreen')) {
        // Exit fullscreen: reset size
        popupWindow.style.width = '600px';
        popupWindow.style.height = '600px';
        document.exitFullscreen && document.exitFullscreen();
        popupWindow.classList.remove('fullscreen');
        document.getElementById('calculator').style.width = '565px';
        document.getElementById('calculator').style.height = '550px';
        
        // Change icon to full screen
        fullscreenIcon.innerHTML = `
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4C3 3.44772 3.44772 3 4 3H8C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5H6.41421L9.70711 8.29289C10.0976 8.68342 10.0976 9.31658 9.70711 9.70711C9.31658 10.0976 8.68342 10.0976 8.29289 9.70711L5 6.41421V8C5 8.55228 4.55228 9 4 9C3.44772 9 3 8.55228 3 8V4ZM16 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9C19.4477 9 19 8.55228 19 8V6.41421L15.7071 9.70711C15.3166 10.0976 14.6834 10.0976 14.2929 9.70711C13.9024 9.31658 13.9024 8.68342 14.2929 8.29289L17.5858 5H16C15.4477 5 15 4.55228 15 4C15 3.44772 15.4477 3 16 3ZM9.70711 14.2929C10.0976 14.6834 10.0976 15.3166 9.70711 15.7071L6.41421 19H8C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21H4C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16V17.5858L8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929ZM14.2929 14.2929C14.6834 13.9024 15.3166 13.9024 15.7071 14.2929L19 17.5858V16C19 15.4477 19.4477 15 20 15C20.5523 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H16C15.4477 21 15 20.5523 15 20C15 19.4477 15.4477 19 16 19H17.5858L14.2929 15.7071C13.9024 15.3166 13.9024 14.6834 14.2929 14.2929Z" fill="#ffffff"></path>
                </g>
            </svg>`;
    } else {
        // Enter fullscreen: adjust popup size
        popupWindow.requestFullscreen && popupWindow.requestFullscreen();
        popupWindow.style.width = '92vw';
        popupWindow.style.height = '90vh';
        popupWindow.classList.add('fullscreen');
        document.getElementById('calculator').style.width = '100vw';
        document.getElementById('calculator').style.height = '90vh';

        // Change icon to exit fullscreen
        fullscreenIcon.innerHTML = `
            <svg class="w-4 h-4 p-1" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#fff;} </style> <g> <polygon class="st0" points="461.212,314.349 314.342,314.349 314.342,461.205 357.596,417.973 451.591,511.985 512,451.599 417.973,357.581 "></polygon> <polygon class="st0" points="50.788,197.667 197.659,197.667 197.659,50.797 154.42,94.043 60.394,0.025 0,60.417 94.027,154.428 "></polygon> <polygon class="st0" points="94.035,357.588 0.016,451.599 60.394,511.992 154.42,417.973 197.668,461.205 197.668,314.349 50.788,314.349 "></polygon> <polygon class="st0" points="417.99,154.428 512,60.401 451.591,0.008 357.58,94.035 314.342,50.797 314.342,197.651 461.212,197.651 "></polygon> </g> </g></svg>`;
    }
});