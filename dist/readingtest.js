// modal
document.addEventListener('DOMContentLoaded', function () {
    const markerCursor = `url('data:image/svg+xml;charset=utf-8,<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="%23000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><polygon style="fill:%233B67AA;" points="82.106,382.366 135.162,435.422 64.111,506.473 0,464.472 "></polygon><polygon style="fill:%230094E2;" points="108.633,408.894 82.106,382.367 0,464.472 32.055,485.473 "></polygon><path style="fill:%23B4B4B4;" d="M149.722,263.099L47.028,365.793c-7.132,7.132-7.131,18.693,0,25.825l78.883,78.883 c7.131,7.131,18.693,7.132,25.825,0L254.43,367.806L149.722,263.099z"></path><path style="fill:%23E0E0E0;" d="M202.075,315.453L149.721,263.1L47.027,365.794c-7.131,7.131-7.131,18.694,0,25.825l39.442,39.442 L202.075,315.453z"></path><path style="fill:%2321C25E;" d="M214.302,453.552L501.6,166.254c13.867-13.867,13.867-36.348,0-50.215L401.489,15.928 c-13.867-13.867-36.348-13.867-50.215,0L63.976,303.226L214.302,453.552z"></path><path style="fill:%2354E68B;" d="M451.545,65.983l-50.056-50.056c-13.867-13.867-36.348-13.867-50.214,0L63.976,303.226l75.163,75.163 L451.545,65.983z"></path><rect x="64.32" y="302.42" transform="matrix(0.7071 0.7071 -0.7071 0.7071 295.2834 -19.0306)" style="fill:%23E0E0E0;" width="212.587" height="89.007"></rect><rect x="79.878" y="264.833" transform="matrix(0.7071 0.7071 -0.7071 0.7071 257.6967 -3.4624)" style="fill:%23F1F1F1;" width="106.299" height="89.007"></rect></g></svg>') 16 0, auto`;

    // Toggle popup logic
    document.querySelectorAll('[data-popup]').forEach((button) => {
        button.addEventListener('click', function () {
            const popupId = button.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            if (popup) {
                if (popup.classList.contains('hidden')) {
                    popup.classList.remove('hidden'); 
                    popup.classList.add('block');    
                    
                    if (popupId === 'popupHighlight') {
                        document.body.style.cursor = markerCursor;
                    }
                } else {
                    popup.classList.add('hidden');   
                    popup.classList.remove('block'); 

                    if (popupId === 'popupHighlight') {
                        document.body.style.cursor = 'auto';
                    }
                }
            }
        });
    });

    // Close popup logic
    document.querySelectorAll('[data-popup-close]').forEach((button) => {
        button.addEventListener('click', function () {
            const popupId = button.getAttribute('data-popup-close');
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.classList.add('hidden');   
                popup.classList.remove('block'); 
                
                if (popupId === 'popupHighlight') {
                    document.body.style.cursor = 'auto';
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    function adjustPopupPosition() {
        const footer = document.querySelector('footer');
        const popup = document.getElementById('questions');
        if (footer && popup) {
            const footerHeight = footer.offsetHeight;
            popup.style.bottom = `${footerHeight + 2}px`; 
        }
    }

    adjustPopupPosition();
    window.addEventListener('resize', adjustPopupPosition);
});

// timer toggle
document.addEventListener("DOMContentLoaded", function () {
    const timeDisplay = document.getElementById("timeDisplay");
    const iconDisplay = document.getElementById("iconDisplay");
    const toggleButton = document.getElementById("toggleButton");

    toggleButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (timeDisplay.classList.contains("hidden")) {
            timeDisplay.classList.remove("hidden");
            iconDisplay.classList.add("hidden");
            toggleButton.textContent = "Hide";
        } else {
            timeDisplay.classList.add("hidden");
            iconDisplay.classList.remove("hidden");
            toggleButton.textContent = "Show";
        }
    });
});

// mark review svg
const button1 = document.getElementById('reviewButton');
const icon1 = document.getElementById('reviewIcon');

button1.addEventListener('click', () => {
    if (icon1.getAttribute('fill') === 'none') {
        icon1.setAttribute('fill', '#dc2626');
        button1.classList.add('border-red-600');
    } else {
        icon1.setAttribute('fill', 'none');
        button1.classList.remove('border-red-600');
    }
});

// options svg focus effect
document.querySelectorAll('[data-color]').forEach(button => {
    const svgIcon = button.querySelector('svg');
    const fillColor = button.getAttribute('data-color');
    const originalColor = svgIcon.getAttribute('fill');

    // Change SVG fill on focus
    button.addEventListener('focus', () => {
        svgIcon.setAttribute('fill', fillColor);
    });

    // Revert SVG fill on blur
    button.addEventListener('blur', () => {
        svgIcon.setAttribute('fill', originalColor);
    });
});

document.getElementById('testButton').addEventListener('click', () => {
    const indexButtons = document.querySelectorAll('.index-button');

    indexButtons.forEach(button => {
        // Toggle visibility when clicked
        button.style.display = button.style.display === 'none' || button.style.display === '' ? 'block' : 'none';
    });
});

// options strike off
const buttonn = document.getElementById("testButton");

buttonn.addEventListener("click", () => {
    buttonn.classList.toggle("active"); 
    buttonn.style.backgroundColor = buttonn.classList.contains("active") ? "blue" : ""; 
    buttonn.style.color = buttonn.classList.contains("active") ? "white" : ""; 
});

const buttons = document.querySelectorAll(".index-button");

buttons.forEach((button) => {
    const parentDiv = button.previousElementSibling; 
    const originalText = button.textContent.trim(); // Save the original button text

    button.addEventListener("click", () => {
        if (parentDiv.classList.contains("with-line")) {
            // Undo the strike-through and re-enable interactions
            parentDiv.classList.remove("with-line", "disabled-container");
            parentDiv.style.pointerEvents = ""; // Re-enable interactions
            parentDiv.style.opacity = ""; // Restore opacity
            button.textContent = originalText; // Reset button text
            button.style.textDecoration = 'line-through'
            // Re-apply border when undoing and keep rounded corners
            button.style.border = "1px solid black"; // Add border when returning to normal state
            button.style.padding = '2px 6px'
            button.style.fontSize = '12px'

        } else {
            // Add strike-through and disable interactions
            parentDiv.classList.add("with-line", "disabled-container");
            parentDiv.style.pointerEvents = "none"; // Disable interactions
            parentDiv.style.opacity = "0.6"; // Dim the container
            button.textContent = "Undo"; // Update button text to "Undo"

            // Remove border when strike-through is active
            button.style.border = "none"; // Remove border
            button.style.textDecoration = 'underline'
            button.style.padding = '0px'
            button.style.fontSize = '9px'
        }
    });
});