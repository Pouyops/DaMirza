# Persian Word Finder (واژه‌ساز فارسی)

A minimalist, web-based tool that generates valid Persian words from a given set of letters. It cross-references permutations against a comprehensive Persian dictionary and ranks the results based on their real-world frequency.

## Features

* **Anagram Generation:** Input 3 or more Persian letters to discover all possible valid word combinations.
* **Smart Ranking:** Integrates a 50,000-word frequency database to sort results, ensuring the most common and useful words appear first.
* **Visual Verification:** Highly common words are marked with a checkmark (✔️) for quick identification.
* **Dynamic Filtering:** Instantly filter generated words by their character length (e.g., 3-letter, 4-letter) using interactive toggle buttons.
* **Modern UI:** A clean, responsive, and minimalist interface optimized for both desktop and mobile screens.

## Technologies Used

* **HTML5:** Semantic structure.
* **CSS3:** Modern styling using Grid/Flexbox and the Vazirmatn web font.
* **Vanilla JavaScript:** Core logic, asynchronous data fetching, and DOM manipulation without heavy frameworks.

## Setup and Usage

This project runs entirely in the browser and requires no backend setup or build tools.

1. Clone or download this repository.
2. Ensure `index.html`, `style.css`, and `script.js` are in the same directory.
3. Open `index.html` in any modern web browser.
4. *Note: An active internet connection is required upon loading to fetch the external dictionary databases.*

## Data Sources

This application relies on the following open-source data repositories:
* [Persian-Words-Database](https://github.com/shahind/Persian-Words-Database) for the distinct word validation list.
* [FrequencyWords](https://github.com/hermitdave/FrequencyWords) for the Persian 50k word frequency rankings.
