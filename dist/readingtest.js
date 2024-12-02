// modal
document.addEventListener('DOMContentLoaded', function () {
    // Toggle popup
    document.querySelectorAll('[data-popup]').forEach((button) => {
        button.addEventListener('click', function () {
            const popupId = button.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            if (popup) {
                if (popup.classList.contains('hidden')) {
                    popup.classList.remove('hidden'); // Show popup
                    popup.classList.add('block');    // Ensure popup is displayed
                } else {
                    popup.classList.add('hidden');   // Hide popup
                    popup.classList.remove('block'); // Remove block display
                }
            }
        });
    });
    document.querySelectorAll('[data-popup-close]').forEach((button) => {
        button.addEventListener('click', function () {
            const popupId = button.getAttribute('data-popup-close');
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.classList.add('hidden');   // Hide popup
                popup.classList.remove('block'); // Remove block display if present
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
            popup.style.bottom = `${footerHeight + 2}px`; // Position above footer
        }
    }

    // Adjust on page load and window resize
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

const buttonn = document.getElementById("testButton");

buttonn.addEventListener("click", () => {
    buttonn.classList.toggle("active"); // Toggle the active state
    buttonn.style.backgroundColor = buttonn.classList.contains("active") ? "blue" : ""; // Change color to blue when active
    buttonn.style.color = buttonn.classList.contains("active") ? "white" : ""; // Adjust text color for contrast
});

const buttons = document.querySelectorAll(".index-button");

buttons.forEach((button) => {
    const parentDiv = button.previousElementSibling; // Get the sibling container
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
