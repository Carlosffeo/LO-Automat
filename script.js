// Items database with required resources
const itemsDatabase = {
    // Armor
    redwood_armor: {
        name: "Redwood Armor",
        category: "armor",
        subcategory: "body",
        craftQuantity: 1,
        resources: {
            redwood: 25,
            clay: 25,
            nomad_cloth: 5
        }
    },
    carapace_boots: {
        name: "Carapace Boots",
        category: "armor",
        subcategory: "boots",
        craftQuantity: 1,
        resources: {
            chitin_plate: 8,
            nomad_cloth: 3,
            earth_wax: 15
        }
    },
    carapace_gauntlets: {
        name: "Carapace Gauntlets",
        category: "armor",
        subcategory: "gauntlets",
        craftQuantity: 1,
        resources: {
            chitin_plate: 12,
            nomad_cloth: 3,
            earth_wax: 10
        }
    },
    
    // Ammunition
    ceramic_bolts: {
        name: "Ceramic-Tipped Bolts",
        category: "ammo",
        subcategory: "bolts",
        craftQuantity: 5, // Crafted in batches of 5
        resources: {
            wood_shaft: 5,
            ceramic_shard: 8,
            fiber_weave: 20
        }
    },
    fire_bolt: {
        name: "Fire Bolt",
        category: "ammo",
        subcategory: "bolts",
        craftQuantity: 1,
        resources: {
            wood_shaft: 10,
            fiber_weave: 12,
            earth_wax: 8,
            phosphorus: 60
        }
    },
    
    // Medical
    sterile_bandage: {
        name: "Sterile Bandage",
        category: "medical",
        subcategory: "bandages",
        craftQuantity: 1,
        resources: {
            fiber_weave: 1,
            aloe_gel: 1
        }
    },
    primitive_bandage: {
        name: "Primitive Bandage",
        category: "medical",
        subcategory: "bandages",
        craftQuantity: 4, // Crafted in batches of 4
        resources: {
            fiber: 16,
            ash: 1
        }
    },
    
    // Tools
    chitin_repair_hammer: {
        name: "Chitin Repair Hammer",
        category: "tools",
        subcategory: "repair",
        craftQuantity: 1,
        resources: {
            wood_shaft: 14,
            chitin_plate: 10,
            rope: 5
        }
    }
};

// Resource names for display
const resourceNames = {
    aloe_gel: "Aloe Gel",
    ash: "Ash",
    ceramic_shard: "Ceramic Shard",
    chitin_plate: "Chitin Plate",
    clay: "Clay",
    earth_wax: "Earth Wax",
    fiber: "Fiber",
    fiber_weave: "Fiber Weave",
    nomad_cloth: "Nomad Cloth",
    phosphorus: "Phosphorus",
    redwood: "Redwood",
    rope: "Rope",
    wood_shaft: "Wood Shaft"
};

// Predefined loadouts
const predefinedLoadouts = {
    dinghy: {
        redwood_armor: 10,
        carapace_boots: 10,
        carapace_gauntlets: 10,
        ceramic_bolts: 200,
        fire_bolt: 20,
        sterile_bandage: 100,
        primitive_bandage: 120,
        chitin_repair_hammer: 5
    }
};

// DOM Elements
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const saveLoadoutBtn = document.getElementById('save-loadout-btn');
const loadoutSelect = document.getElementById('loadout-select');
const resourcesList = document.getElementById('resources-list');
const searchInput = document.getElementById('search-input');
const categoryFilters = document.querySelectorAll('.category-filter');
const categories = document.querySelectorAll('.category');
const checkboxes = document.querySelectorAll('.item-checkbox');
const quantities = document.querySelectorAll('.item-quantity');
const items = document.querySelectorAll('.item');
const copyResourcesBtn = document.getElementById('copy-resources-btn');
const copyFeedback = document.getElementById('copy-feedback');

// Store current resources for copy functionality
let currentResources = {};

// Function to calculate resources
function calculateResources() {
    const totalResources = {};
    
    // Loop through all selected checkboxes
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const itemId = checkbox.dataset.item;
            const quantity = parseInt(quantities[index].value);
            
            if (quantity > 0 && itemsDatabase[itemId]) {
                const item = itemsDatabase[itemId];
                const craftTimes = Math.ceil(quantity / item.craftQuantity);
                
                // Add up required resources
                for (const [resource, amount] of Object.entries(item.resources)) {
                    if (!totalResources[resource]) {
                        totalResources[resource] = 0;
                    }
                    totalResources[resource] += amount * craftTimes;
                }
            }
        }
    });
    
    // Store current resources for copy functionality
    currentResources = totalResources;
    
    // Update UI
    displayResources(totalResources);
    
    // Enable or disable copy button based on whether there are resources
    copyResourcesBtn.disabled = Object.keys(totalResources).length === 0;
}

// Function to display resources on the interface
function displayResources(resources) {
    resourcesList.innerHTML = '';
    
    // Sort resources alphabetically
    const sortedResources = Object.entries(resources).sort((a, b) => {
        return resourceNames[a[0]].localeCompare(resourceNames[b[0]]);
    });
    
    if (sortedResources.length === 0) {
        resourcesList.innerHTML = '<div class="resource-item">No items selected.</div>';
        return;
    }
    
    sortedResources.forEach(([resource, amount]) => {
        const resourceItem = document.createElement('div');
        resourceItem.className = 'resource-item';
        resourceItem.innerHTML = `
            <span>${resourceNames[resource] || resource}</span>
            <span>${amount}</span>
        `;
        resourcesList.appendChild(resourceItem);
    });
}

// Function to copy resources to clipboard
function copyResourcesToClipboard() {
    if (Object.keys(currentResources).length === 0) {
        return;
    }
    
    // Format the resources as text
    const resourcesText = Object.entries(currentResources)
        .sort((a, b) => resourceNames[a[0]].localeCompare(resourceNames[b[0]]))
        .map(([resource, amount]) => `${resourceNames[resource] || resource}: ${amount}`)
        .join('\n');
    
    // Copy to clipboard
    navigator.clipboard.writeText(resourcesText)
        .then(() => {
            // Show success message
            copyFeedback.textContent = 'Copied!';
            copyFeedback.classList.add('show');
            
            // Hide the message after 2 seconds
            setTimeout(() => {
                copyFeedback.classList.remove('show');
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy resources: ', err);
            copyFeedback.textContent = 'Copy failed';
            copyFeedback.classList.add('show');
            
            setTimeout(() => {
                copyFeedback.classList.remove('show');
            }, 2000);
        });
}

// Function to reset all fields
function resetFields() {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    quantities.forEach(input => {
        input.value = 0;
    });
    
    resourcesList.innerHTML = '';
    searchInput.value = '';
    
    // Reset category filters
    categoryFilters.forEach(filter => {
        filter.classList.remove('active');
        if (filter.dataset.category === 'all') {
            filter.classList.add('active');
        }
    });
    
    // Show all categories
    categories.forEach(category => {
        category.classList.remove('hide');
    });
    
    // Show all items
    items.forEach(item => {
        item.classList.remove('hide');
    });
    
    // Disable copy button
    copyResourcesBtn.disabled = true;
    
    // Clear current resources
    currentResources = {};
}

// Function to load a predefined loadout
function loadLoadout(loadoutName) {
    if (!predefinedLoadouts[loadoutName]) return;
    
    resetFields();
    
    const loadout = predefinedLoadouts[loadoutName];
    
    checkboxes.forEach((checkbox, index) => {
        const itemId = checkbox.dataset.item;
        
        if (loadout[itemId]) {
            checkbox.checked = true;
            quantities[index].value = loadout[itemId];
        }
    });
    
    calculateResources();
}

// Function to filter items by category
function filterByCategory(category) {
    categories.forEach(cat => {
        if (category === 'all' || cat.dataset.category === category) {
            cat.classList.remove('hide');
        } else {
            cat.classList.add('hide');
        }
    });
}

// Function to search items
function searchItems(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
        // If search is empty, show all items (respecting category filter)
        items.forEach(item => {
            item.classList.remove('hide');
        });
        return;
    }
    
    // Hide items that don't match the search
    items.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        if (itemText.includes(searchTerm)) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    });
}

// Function to save current loadout to localStorage
function saveCurrentLoadout(name) {
    const loadout = {};
    let hasItems = false;
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const itemId = checkbox.dataset.item;
            const quantity = parseInt(quantities[index].value);
            
            if (quantity > 0) {
                loadout[itemId] = quantity;
                hasItems = true;
            }
        }
    });
    
    if (!hasItems) {
        alert('No items selected to save');
        return false;
    }
    
    // Get existing loadouts from localStorage or initialize empty object
    const savedLoadouts = JSON.parse(localStorage.getItem('lastOasisLoadouts') || '{}');
    
    // Add new loadout
    savedLoadouts[name] = loadout;
    
    // Save back to localStorage
    localStorage.setItem('lastOasisLoadouts', JSON.stringify(savedLoadouts));
    
    // Add to select dropdown if not already there
    let optionExists = false;
    for (let i = 0; i < loadoutSelect.options.length; i++) {
        if (loadoutSelect.options[i].value === name) {
            optionExists = true;
            break;
        }
    }
    
    if (!optionExists) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        loadoutSelect.appendChild(option);
    }
    
    return true;
}

// Function to load saved loadouts from localStorage
function loadSavedLoadouts() {
    const savedLoadouts = JSON.parse(localStorage.getItem('lastOasisLoadouts') || '{}');
    
    // Add saved loadouts to predefined loadouts
    Object.entries(savedLoadouts).forEach(([name, loadout]) => {
        predefinedLoadouts[name] = loadout;
        
        // Add to select dropdown
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        loadoutSelect.appendChild(option);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load saved loadouts from localStorage
    loadSavedLoadouts();
    
    // Calculate button
    calculateBtn.addEventListener('click', calculateResources);
    
    // Reset button
    resetBtn.addEventListener('click', resetFields);
    
    // Copy resources button
    copyResourcesBtn.addEventListener('click', copyResourcesToClipboard);
    
    // Link checkboxes with quantity fields
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked && parseInt(quantities[index].value) === 0) {
                quantities[index].value = 1;
            }
        });
    });
    
    quantities.forEach((input, index) => {
        input.addEventListener('change', () => {
            if (parseInt(input.value) > 0 && !checkboxes[index].checked) {
                checkboxes[index].checked = true;
            } else if (parseInt(input.value) === 0 && checkboxes[index].checked) {
                checkboxes[index].checked = false;
            }
        });
    });
    
    // Load loadout from selector
    loadoutSelect.addEventListener('change', () => {
        const selectedLoadout = loadoutSelect.value;
        if (selectedLoadout) {
            loadLoadout(selectedLoadout);
        }
    });
    
    // Save current loadout
    saveLoadoutBtn.addEventListener('click', () => {
        const loadoutName = prompt('Enter loadout name:');
        if (loadoutName && loadoutName.trim() !== '') {
            if (saveCurrentLoadout(loadoutName.trim())) {
                alert(`Loadout "${loadoutName}" saved successfully.`);
            }
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchItems(e.target.value);
    });
    
    // Category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active state
            categoryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter items
            filterByCategory(filter.dataset.category);
        });
    });
});

// Import functionality - For the data from craftpedia.info
// This is a placeholder for the future scraping function
window.importCraftpediaData = function(craftpediaData) {
    // This function would be called with the scraped data
    // For now it's just a placeholder
    
    if (!craftpediaData || typeof craftpediaData !== 'object') {
        console.error('Invalid data format');
        return;
    }
    
    // Merge with existing database
    Object.assign(itemsDatabase, craftpediaData);
    
    // Refresh the UI to include the new items
    // This would require updating the DOM with new items
    console.log('Data imported successfully!');
}; 