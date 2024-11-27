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