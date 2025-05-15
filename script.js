// Function to fetch the button data from JSON file
async function loadButtonData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to load data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading button data:', error);
        return [];
    }
}

// Function to create buttons from data
function createButtons(data) {
    const buttonsContainer = document.getElementById('buttons');
    
    data.forEach(item => {
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'button';
        buttonDiv.onclick = function() { openAndCopyTextFile(this); };
        
        // Create the title text
        buttonDiv.appendChild(document.createTextNode(item.title));
        
        // Create the hidden span with code
        const span = document.createElement('span');
        span.textContent = item.code;
        buttonDiv.appendChild(span);
        
        // Add the button to the container
        buttonsContainer.appendChild(buttonDiv);
    });
}

// Function to handle button click - open and copy text
function openAndCopyTextFile(element) {
    const codeText = element.querySelector('span').textContent;
    // Copy to clipboard
    navigator.clipboard.writeText(codeText)
        .then(() => {
           // alert('Code copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    const buttonData = await loadButtonData();
    createButtons(buttonData);
});
