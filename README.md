# DaMirza

A lightweight, client-side web application that generates meaningful Persian words from a given set of jumbled letters. It is built as a Progressive Web App (PWA) style single-page HTML file, meaning it can be easily added to a mobile home screen and runs entirely in the browser. DaMirza helps you find the answers for A mirza by finding all the possible words.

## 🚀 Features

* **Fast & Client-Side:** All permutation and mathematical logic is handled natively in your browser using JavaScript. No backend server is required.
* **Massive Dictionary:** Automatically fetches and caches a comprehensive database of ~700,000 distinct Persian words on initial load.
* **Character Normalization:** Automatically handles common keyboard encoding issues (e.g., converting Arabic *Kaf* `ك` to Persian *Keh* `ک` and Arabic *Yaa* `ي` to Persian *Ye* `ی`).
* **Smart Sorting:** Results are displayed cleanly, sorted first by length (shortest to longest) and then alphabetically.
* **Mobile Ready:** Responsive design and meta tags included to support "Add to Home Screen" on iOS and Android devices.

## 💻 How to Use

Because this is a static web application, no installation or build steps are required. 

1. Simply open the `index.html` file in any modern web browser.
2. Wait a moment for the status indicator to turn green (`دیتابیس آماده است`).
3. Enter Persian letters separated by a space (e.g., `ک ک ب`).
4. Click **جستجوی کلمات** (Search Words).
5. The app will generate all valid words that can be made from those letters.

## 🛠️ Technologies Used

* **HTML5 / CSS3:** For structure and responsive styling.
* **Vanilla JavaScript (ES6+):** For DOM manipulation, API fetching, and permutation algorithms.
* **Fetch API:** For retrieving the external dictionary.

## 🙏 Acknowledgments

* The Persian dictionary database utilized in this project is sourced from [shahind/Persian-Words-Database](https://github.com/shahind/Persian-Words-Database).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
