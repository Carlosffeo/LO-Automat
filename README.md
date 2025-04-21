# Last Oasis Resource Calculator

A simple static web application for calculating resources needed in the game Last Oasis.

## Deployment

This is a static HTML/CSS/JavaScript site with no build step required. Deployment should be straightforward:

1. Clone the repository
2. Deploy the files directly to a web server or a static site host like Netlify or GitHub Pages.
3. No build process, server-side code, or Node.js dependencies are needed.

## Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles
- `script.js` - JavaScript functionality
- `assets/` - Directory for images and other static assets

## Netlify Configuration

This project is configured for direct deployment on Netlify using:

- `netlify.toml` - Netlify configuration (specifies publish directory and no build command).
- `_redirects` - Basic redirect rule for handling paths.

Note: A `package.json` file is not needed for this project.

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

## Hosting Options

To share the calculator with friends, you can:

1. **GitHub Pages**: Upload the project to a GitHub repository and enable GitHub Pages.
2. **Netlify**: Connect your GitHub repository to Netlify. The `netlify.toml` file should handle the configuration.
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