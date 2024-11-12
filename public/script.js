// Script for fetching and displaying data
// Fetch and display paintings in the sidebar
async function fetchPaintings() {
    try {
        const response = await fetch('/api/paintings');
        const paintings = await response.json();
        displayPaintings(paintings);
        setupSearchSortAndFilter(paintings);  // Initialize search, sort, and filter
    } catch (error) {
        console.error('Error fetching paintings:', error);
    }
}

// Display paintings in the sidebar
function displayPaintings(paintings) {
    const paintingList = document.getElementById('paintings-list');
    paintingList.innerHTML = '';

    paintings.forEach(painting => {
        // Create a container for each painting, functioning as an "Edit" button
        const container = document.createElement('div');
        container.classList.add("mb-4", "p-4", "bg-gray-100", "rounded-lg", "shadow", "flex", "justify-between", "items-center", "cursor-pointer", "hover:bg-gray-200");
        container.onclick = () => loadPainting(painting);  // Set up click event to load painting data

        // Title element aligned to the left
        const title = document.createElement('p');
        title.innerText = painting.Title || 'Untitled';
        title.classList.add("text-sm", "font-semibold", "text-gray-700");

        // Image element aligned to the right
        const img = document.createElement('img');
        img.src = `/images/${painting.ImageFileName}`;  // Use the image filename from the painting data
        img.alt = painting.Title || 'Untitled Painting';
        img.classList.add("w-20", "h-20", "object-cover", "rounded");

        // Add onerror event to handle missing images and use banksy.jpg as fallback
        img.onerror = () => {
            img.src = '/images/banksy.jpg';  // Set to dummy image if original image fails to load
            img.alt = 'Placeholder image';
        };

        // Append title and image to the container
        container.appendChild(title);
        container.appendChild(img);

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

// Setup sidebar search, sort, and filter functions
function setupSearchSortAndFilter(paintings) {
    const searchBar = document.getElementById('search-bar');
    const sortOptions = document.getElementById('sort-options');
    const lastNameFilter = document.getElementById('last-name-filter');

    function updateLastNameFilter(filteredPaintings) {
        // Clear and repopulate the last name filter dropdown
        lastNameFilter.innerHTML = '<option value="">Filter by artist</option>';
        const uniqueLastNames = Array.from(new Set(filteredPaintings.map(p => p.LastName).filter(Boolean)));
        uniqueLastNames.sort().forEach(lastName => {
            const option = document.createElement('option');
            option.value = lastName;
            option.textContent = lastName;
            lastNameFilter.appendChild(option);
        });
    }

    function applyFilters() {
        const query = searchBar.value.toLowerCase();
        const selectedLastName = lastNameFilter.value;

        // Filter paintings by title and selected last name
        let filteredPaintings = paintings.filter(painting =>
            (painting.Title && painting.Title.toLowerCase().includes(query)) &&
            (selectedLastName === "" || painting.LastName === selectedLastName)
        );

        // Update the last name filter dropdown based on current search results
        updateLastNameFilter(filteredPaintings);

        // Apply sorting
        const sortBy = sortOptions.value;
        filteredPaintings = filteredPaintings.sort((a, b) => {
            if (sortBy === 'title-asc') return a.Title.localeCompare(b.Title);
            if (sortBy === 'title-desc') return b.Title.localeCompare(a.Title);
            if (sortBy === 'year-asc') return (a.YearOfWork || 0) - (b.YearOfWork || 0);
            if (sortBy === 'year-desc') return (b.YearOfWork || 0) - (a.YearOfWork || 0);
        });

        displayPaintings(filteredPaintings);
    }

    // Set up search input listener
    searchBar.addEventListener('input', applyFilters);

    // Set up sort dropdown change listener
    sortOptions.addEventListener('change', applyFilters);

    // Set up last name filter change listener
    lastNameFilter.addEventListener('change', applyFilters);

    // Initially update the last name filter with all paintings
    updateLastNameFilter(paintings);
}

fetchPaintings();
