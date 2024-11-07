// Script for fetching and displaying data
// Fetch and display paintings in the sidebar
async function fetchPaintings() {
    try {
        const response = await fetch('/api/paintings');
        const paintings = await response.json();
        displayPaintings(paintings);    
    } catch (error) {
        console.error('Error fetching paintings:', error);
    }
}

// Display paintings in the sidebar
function displayPaintings(paintings) {
    const paintingList = document.getElementById('paintings-list');
    paintingList.innerHTML = '';

    paintings.forEach(painting => {
        const button = document.createElement('button');
        button.classList.add("block", "w-full", "text-left", "py-2", "px-4", "mb-2", "bg-gray-100", "rounded", "hover:bg-gray-200");
        button.innerText = painting.Title || 'Untitled';
        button.onclick = () => loadPainting(painting);
        paintingList.appendChild(button);
    });
}

// Load paintings data into the form
function loadPainting(painting) {
    // Grab the form element from the HTML file
    const form = document.getElementById('edit-form');

    // Populate the form fields with the data from paintings
    form.elements['Title'].value = painting.Title || 'null';  // Match the "name" attribute in HTML
    form.elements['LastName'].value = painting.LastName || 'null';  // Artist's Last Name
    form.elements['YearOfWork'].value = painting.YearOfWork || 'null';
    form.elements['Medium'].value = painting.Medium || 'null';
    form.elements['Description'].value = painting.Description || 'null';

    // Set up the form submission to update the painting
    form.onsubmit = async function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const updatedData = Object.fromEntries(formData.entries());

        console.log(`Updating painting with ID: ${painting._id}`);

        await fetch(`/api/paintings/${painting._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        alert('Painting updated successfully');
        fetchPaintings(); 
    };

    document.getElementById('painting-form').style.display = 'block';

}

fetchPaintings();