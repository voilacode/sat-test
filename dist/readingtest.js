// handling popups
// document.addEventListener('DOMContentLoaded', function () {
//     const hoverButtons = document.querySelectorAll('[data-popup]');
//     const clickButtons = document.querySelectorAll('[data-popup-click]');

//     // For hover-based modals
//     hoverButtons.forEach((button) => {
//         const popupId = button.getAttribute('data-popup');
//         const popup = document.getElementById(popupId);

//         button.addEventListener('mouseover', () => {
//             popup.classList.remove('hidden');
//         });

//         button.addEventListener('mouseleave', () => {
//             setTimeout(() => {
//                 if (!popup.matches(':hover') && !button.matches(':hover')) {
//                     popup.classList.add('hidden');
//                 }
//             }, 100);
//         });

//         popup.addEventListener('mouseleave', () => {
//             setTimeout(() => {
//                 if (!popup.matches(':hover') && !button.matches(':hover')) {
//                     popup.classList.add('hidden');
//                 }
//             }, 100);
//         });
//     });

//     // For click-based modals
//     clickButtons.forEach((button) => {
//         const popupId = button.getAttribute('data-popup-click');
//         const popup = document.getElementById(popupId);

//         button.addEventListener('click', () => {
//             popup.classList.toggle('hidden');
//         });

//         // Close popup when clicking outside
//         document.addEventListener('click', (event) => {
//             if (!popup.contains(event.target) && event.target !== button) {
//                 popup.classList.add('hidden');
//             }
//         });
//     });

//     document.querySelectorAll('[data-popup-close]').forEach((button) => {
//         button.addEventListener('click', function () {
//         const popupId = button.getAttribute('data-popup-close');
//         document.getElementById(popupId).classList.add('hidden');
//         });
//     });
// });

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
    // Popup toggle logic
    document.querySelectorAll('[data-popup]').forEach((button) => {
        button.addEventListener('click', function () {
            const popupId = button.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            if (popup) {
                if (popup.classList.contains('hidden')) {
                    popup.classList.remove('hidden');
                    popup.classList.add('block');
                } else {
                    popup.classList.add('hidden');
                    popup.classList.remove('block');
                }
            }
        });
    });
    document.querySelectorAll('[data-popup-close]').forEach((button) => {
        button.addEventListener('click', function () {
            const popupId = button.getAttribute('data-popup-close');
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.classList.add('hidden');
                popup.classList.remove('block');
            }
        });
    });

    // Highlight text
    let selectedColor = null;
    let selectedStyle = null;

    document.querySelectorAll('[data-highlight-color]').forEach((button) => {
        button.addEventListener('click', function () {
            selectedColor = this.getAttribute('data-highlight-color');
        });
    });

    document.querySelectorAll('[data-highlight-style]').forEach((button) => {
        button.addEventListener('click', function () {
            selectedStyle = this.getAttribute('data-highlight-style');
        });
    });

    document.addEventListener('mouseup', function () {
        const selectedText = window.getSelection();
        const range = selectedText.getRangeAt(0);

        if (!selectedText.isCollapsed && (selectedColor || selectedStyle)) {
            const span = document.createElement('span');
            if (selectedColor) span.style.backgroundColor = selectedColor;
            if (selectedStyle === 'underline') span.style.textDecoration = 'underline';
            if (selectedStyle === 'italic') span.style.fontStyle = 'italic';

            span.textContent = selectedText.toString();
            range.deleteContents();
            range.insertNode(span);

            // Reset styles after applying
            selectedColor = null;
            selectedStyle = null;
        }
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

// generating number blocks
document.addEventListener("DOMContentLoaded", function () {
    const questionsContainer = document.getElementById("questions-container");
    const totalQuestions = 27;

    for (let i = 1; i <= totalQuestions; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = "p-2 px-4 rounded border border-dashed border-black font-semibold text-blue-700 hover:bg-gray-100 duration-300";
        questionsContainer.appendChild(button);
    }
});

// mark review svg
const button = document.getElementById('reviewButton');
const icon = document.getElementById('reviewIcon');

button.addEventListener('click', () => {
    if (icon.getAttribute('fill') === 'none') {
        icon.setAttribute('fill', '#dc2626');
        button.classList.add('border-red-600');
    } else {
        icon.setAttribute('fill', 'none');
        button.classList.remove('border-red-600');
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


// document.querySelectorAll('.index-button').forEach((testButton, index) => {
//     testButton.addEventListener('click', () => {
//         const optionContainer = document.querySelectorAll('.option-container')[index];
//         let existingHR = optionContainer.querySelector('.dynamic-hr'); // Check for an existing <hr>

//         if (existingHR) {
//             // Remove <hr> if it already exists
//             existingHR.remove();
//         } else {
//             // Create and style the <hr>
//             const hr = document.createElement('hr');
//             hr.classList.add('dynamic-hr', 'my-2', 'border-t-2', 'border-gray-500');
//             optionContainer.appendChild(hr); // Append <hr> at the end of the container
//         }

//         // Toggle disabled state and style changes for buttons (optional)
//         const optionButton = optionContainer.querySelector('.option-btn');
//         if (optionButton) optionButton.disabled = !optionButton.disabled;

//         testButton.classList.toggle('opacity-50');
//         testButton.classList.toggle('cursor-not-allowed');
//     });
// });



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






document.getElementById('reviewButton').addEventListener('click', function () {
    document.getElementById('indexButton').style.display = 'inline-block';
});

// Get all elements with the class 'option-container'
const optionDivs = document.querySelectorAll(".option-container");

// Add click event listeners to each button inside the divs
optionDivs.forEach((div) => {
    const button = div.querySelector(".index-button");
    button.addEventListener("click", () => {
        div.classList.toggle("with-line");
    });
});
