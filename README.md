# Last Oasis Resource Calculator

A simple web application for calculating the resources needed to craft equipment in the game Last Oasis.

## Features

- Intuitive interface for selecting items and quantities
- Automatic calculation of total required resources
- Save and load predefined "loadouts"
- Responsive design that works on mobile and desktop devices
- Search functionality to quickly find items
- Category filtering to organize items
- No installation required, just a web browser

## How to Use

1. Open the `index.html` file in any modern web browser
2. Select the items you want to craft by checking the boxes
3. Enter the quantity of each item using the number fields
4. Click "Calculate Resources" to see the list of required materials
5. Use "Reset" to clear all selections
6. You can save your custom loadouts or load predefined loadouts

## Installation

No installation required. Simply download all files and open `index.html` in your browser.

## Hosting Options

To share the calculator with friends, you can:

1. **GitHub Pages**: Upload the project to a GitHub repository and enable GitHub Pages.
2. **Netlify**: Drag and drop the project folder to Netlify Drop.
3. **Vercel**: Upload the project to a repository and connect it with Vercel.

All these options offer free hosting for static sites like this one.

## Web Scraping Data from Craftpedia

To import additional recipes from craftpedia.info/last-oasis, you can use a web scraping script. Here's how to do it:

### Method 1: Using a Browser Extension

1. Install a browser extension like "Web Scraper" or "Data Miner"
2. Create a scraping configuration to extract item names and recipes
3. Export the data as JSON
4. Format the data to match the structure in `script.js`
5. Use the `importCraftpediaData()` function to load the data

### Method 2: Using Python

You can create a Python script using libraries like BeautifulSoup or Scrapy. Here's a basic example:

```python
import requests
from bs4 import BeautifulSoup
import json
import re

def scrape_craftpedia():
    url = "https://craftpedia.info/last-oasis/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Extract items and recipes (this will need to be customized based on the site structure)
    items = {}
    
    # Save to a JSON file
    with open('craftpedia_data.json', 'w') as f:
        json.dump(items, f)
    
    print("Data scraped successfully!")

if __name__ == "__main__":
    scrape_craftpedia()
```

After running the script, you'll need to format the data to match the structure in `script.js`.

### Data Structure

The data needs to be in this format:

```javascript
{
    "item_id": {
        name: "Item Name",
        category: "category",
        subcategory: "subcategory",
        craftQuantity: 1,
        resources: {
            "resource1": quantity1,
            "resource2": quantity2,
            // ...
        }
    },
    // More items...
}
```

## Customization

To add new items manually, edit the `itemsDatabase` object in the `script.js` file.

To add new categories:
1. Add new category buttons in the HTML
2. Update the CSS if needed
3. No changes needed in JavaScript as it's dynamically handled

## Future Development

Possible improvements for future versions:

- Add more equipment categories
- Import data directly from craftpedia.info
- Add detailed information about each item
- Include item images
- Add an advanced search system to find items quickly
- Multi-language support 