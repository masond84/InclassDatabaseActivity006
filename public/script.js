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
    const form = document.getElementById('edit-form');
    form.Title.value = painting.Title;
    form.lastName.value = painting.LastName;
    form.YearOfWork.value = painting.YearOfWork;
    form.Medium.value = painting.Medium;
    form.Description.value = painting.Description;

    form.onsubmit = async function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const updatedData = Object.fromEntries(formData.entries());
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