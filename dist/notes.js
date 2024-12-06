// drag button
const popup = document.getElementById('popupHighlight');
const dragBtn = document.getElementById('drag');

// Initialize variables for dragging
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

dragBtn.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;

    // Prevent default behavior to avoid text selection while dragging
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        popup.style.left = `${e.clientX - offsetX}px`;
        popup.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.querySelectorAll('.editor-btn').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const editor = document.getElementById('editor');
        
        // Apply highlight color
        if (action.startsWith('highlight')) {
            const color = action.split('-')[1];
            let bgColor;
            switch (color) {
                case 'yellow':
                    bgColor = '#fefcbf'; // yellow
                    break;
                case 'blue':
                    bgColor = '#bbdefb'; // blue
                    break;
                case 'green':
                    bgColor = '#bbf7d0'; // green
                    break;
                case 'pink':
                    bgColor = '#fbcfe8'; // pink
                    break;
            }
            document.execCommand('backColor', false, bgColor);
        } 
        // Apply underline
        else if (action === 'underline') {
            document.execCommand('underline');
        } 
        // Apply italic
        else if (action === 'italic') {
            document.execCommand('italic');
        }
        // Clear formatting
        else if (action === 'clear') {
            clearFormatting();
        }
    });
});

// Function to clear all applied formatting
function clearFormatting() {
    document.execCommand('removeFormat');
    
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents();
    
    const span = document.createElement('span');
    span.appendChild(selectedText);
    range.insertNode(span);

    // Remove styles
    span.style.backgroundColor = ''; 
    span.style.fontWeight = ''; 
    span.style.fontStyle = ''; 
    span.style.textDecoration = ''; 

    // Clean up empty nodes
    if (span.innerHTML.trim() === "") {
        span.parentNode.removeChild(span);
    }
}

const editor = document.getElementById("editor");

editor.addEventListener("keydown", function (event) {
    event.preventDefault();
});

editor.addEventListener("input", function (event) {
    event.preventDefault(); 
});

editor.addEventListener("paste", function (event) {
    event.preventDefault(); 
});

document.addEventListener('DOMContentLoaded', () => {
    const contentSection = document.getElementById('contentSection');
    const toggleNotesButton = document.getElementById('toggleNotesColumn');
    const notes = []; // Array to store notes

    // Toggle Notes Column Visibility
    toggleNotesButton.addEventListener('click', () => {
        let notesColumn = document.getElementById('notesColumn');

        if (notesColumn) {
            saveHeadings();

            notesColumn.remove();
            toggleNotesButton.innerHTML = '<svg class="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="left-square" class="icon glyph" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20,2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2ZM14.62,15.22a1,1,0,0,1,.16,1.4A1,1,0,0,1,14,17a1,1,0,0,1-.62-.22l-5-4a1,1,0,0,1,0-1.56l5-4a1,1,0,0,1,1.24,1.56L10.6,12Z" style="fill:#231f20"></path></g></svg>';
            contentSection.classList.remove('grid-cols-3');
            contentSection.classList.add('grid-cols-2');
        } else {
            contentSection.classList.remove('grid-cols-2');
            contentSection.classList.add('grid-cols-3');

            notesColumn = document.createElement('div');
            notesColumn.id = 'notesColumn';
            notesColumn.className = 'notes-column border-l p-4 overflow-y-auto';
            notesColumn.innerHTML = `
                <h2 class="font-bold text-lg mb-2">Notes</h2>
                <ul id="notesList" class="space-y-4"></ul>
            `;
            contentSection.insertBefore(notesColumn, contentSection.children[1]);

            renderNotes();
            toggleNotesButton.innerHTML = '<svg class="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="left-square" class="icon glyph" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20,2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2ZM14.62,15.22a1,1,0,0,1,.16,1.4A1,1,0,0,1,14,17a1,1,0,0,1-.62-.22l-5-4a1,1,0,0,1,0-1.56l5-4a1,1,0,0,1,1.24,1.56L10.6,12Z" style="fill:#231f20"></path></g></svg>';
        }
    });

    function saveHeadings() {
        const noteInputs = document.querySelectorAll('.note-item input');
        noteInputs.forEach((input) => {
            const index = input.dataset.index;
            notes[index].heading = input.value;
        });
    }

    function renderNotes() {
        const notesList = document.getElementById('notesList');
        if (notesList) {
            notesList.innerHTML = ''; // Clear existing notes
            notes.forEach((note, index) => {
                const noteItem = document.createElement('li');
                noteItem.className = 'note-item';
                noteItem.innerHTML = `
                    <div class="border-2 border-gray-400 rounded-md p-2 my-2">
                        <div class="flex justify-between space-x-4 items-start py-2 border-b border-gray-200">
                            <p class="text-gray-800 mb-2 text-sm">${note.content}</p>
                            <button class="delete-note bg-red-200 hover:bg-red-100 duration-200 text-white p-2 px-3 rounded" data-index="${index}">
                                <svg class="w-4 h-4" fill="#e81111" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#e81111"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>
                            </button>
                        </div>
                        <input type="text" class="block w-full mb-2 p-2 border-b border-gray-400 focus:outline-none" 
                            value="${note.heading}" 
                            placeholder="Enter note heading" 
                            data-index="${index}" 
                        />
                    </div>
                `;
                notesList.appendChild(noteItem);
            });
        }
    }

    // Delete note by index
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-note')) {
            const noteIndex = event.target.dataset.index;
            notes.splice(noteIndex, 1); 

            // Re-render the notes column
            const notesColumn = document.getElementById('notesColumn');
            if (notesColumn) {
                renderNotes();
            }
        }
    });

    // Add Note on Button Click
    document.body.addEventListener('click', (event) => {
        if (event.target.dataset.action === 'add-note') {
            const selectedText = window.getSelection().toString().trim();
            if (selectedText) {
                let notesColumn = document.getElementById('notesColumn');
                if (!notesColumn) {
                    contentSection.classList.remove('grid-cols-2');
                    contentSection.classList.add('grid-cols-3');

                    // Create the notes column
                    notesColumn = document.createElement('div');
                    notesColumn.id = 'notesColumn';
                    notesColumn.className = 'notes-column border-l p-4 overflow-y-auto';
                    notesColumn.innerHTML = `
                        <h2 class="font-bold text-lg mb-2">Notes</h2>
                        <ul id="notesList" class="space-y-4"></ul>
                    `;
                    contentSection.insertBefore(notesColumn, contentSection.children[1]);
                }

                // Add the new note
                notes.push({ heading: '', content: selectedText });

                // Update the notes column
                renderNotes();

                // Clear text selection
                window.getSelection().removeAllRanges();
            } else {
                alert('Please select some text to add as a note.');
            }
        }
    });
});