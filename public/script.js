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
        // Create a container for each painting
        const container = document.createElement('div');
        container.classList.add("mb-4", "p-4", "bg-gray-100", "rounded-lg", "shadow", "flex", "flex-col", "items-center");

        // Generate a image URL using Lorem Picsum API
        const imageUrl = `https://picsum.photos/seed/${painting.PaintingID}/100/100`;

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = painting.Title || 'Untitled';
        img.classList.add("w-20", "h-20", "mb-2", "object-cover", "rounded");

        // Title element
        const title = document.createElement('p');
        title.innerText = painting.Title || 'Untitled';
        title.classList.add("text-sm", "font-semibold", "text-center", "mb-2");

        // Edit button
        const button = document.createElement('button');
        button.innerText = "Edit";
        button.classList.add("px-3", "py-1", "bg-blue-500", "text-white", "rounded", "hover:bg-blue-600", "focus:outline-none", "focus:ring", "focus:ring-blue-300");
        button.onclick = () => loadPainting(painting);

        container.appendChild(img);
        container.appendChild(title);
        container.appendChild(button);

        // Append the container to the painting list
        paintingList.appendChild(container);
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