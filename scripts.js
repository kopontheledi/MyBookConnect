import {BOOKS_PER_PAGE, books, authors, genres } from "./data.js";
//change themes
const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};
const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
}
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
const changeTheme = (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector('[data-settings-overlay]').style.display = 'none'
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector('[data-settings-overlay]').style.display = 'none'
      }
}
saveButton.addEventListener('click', changeTheme)
//---------------------------------------------------------------------------------------------------------------------------------
const fragment = document.createDocumentFragment()
let startIndex = 0;
let endIndex = 36
  // Extract a subset of books to display based on startIndex and endIndex
const extracted = books.slice(startIndex, endIndex)
// Loop over each book in the extracted array
for (let i = 0; i < extracted.length; i++) {
// Create a new preview element using a dl tag
const preview = document.createElement('dl')
// Add class and dataset attributes to the preview element
preview.className = 'preview'
preview.dataset.id = books[i].id
preview.dataset.title = books[i].title
preview.dataset.image = books[i].image
preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
preview.dataset.description = books[i].description
preview.dataset.genre = books[i].genres
// Add HTML content to the preview element
preview.innerHTML= /*html*/`
  <div>
    <image class='preview__image' src="${books[i].image}" alt="book pic"/>
  </div>
  <div class='preview__info'>
    <dt class='preview__title'>${books[i].title}</dt>
    <dt class='preview__author'>By ${authors[books[i].author]}</dt>
  </div>
`;
// Append the preview element to the fragment
fragment.appendChild(preview)
}
//----------------------------------------------------------------------------------------------------------------------------
// Get the booklist element and append the fragment containing book previews
const booklist1 = document.querySelector('[data-list-items]')
booklist1.appendChild(fragment)
//Search Button
// Get the search button element and add event listener to show the search overlay
const searchbutton = document.querySelector("[data-header-search]");
const handleSearchButtonClick = (event) => {
  document.querySelector("[data-search-overlay]").style.display = "block";
};
// Get the search cancel button element and add event listener to hide the search overlay
const searchCancel = document.querySelector("[data-search-cancel]");
const handleSearchCancel = (event) => {
    document.querySelector("[data-search-overlay]").style.display = "none";
};
// Get the search button element and add a click event listeners to it
searchbutton.addEventListener('click', handleSearchButtonClick);
searchCancel.addEventListener('click', handleSearchCancel);
//----------------------------------------------------------------------------------------------------------------------------
//Settings
// select the 'senttingbutton' and define function to handle setting button click event
const settingbutton = document.querySelector("[data-header-settings]");
const handleSettingButtonClick = (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "block";
};
// select the 'sentting Cancel button' and define function to handle setting cancel button with click event
const settingCancel = document.querySelector('[data-settings-cancel]');
const handleSettingCancelClick = () => {
  document.querySelector("[data-settings-overlay]").style.display = "none";
}
// Get the settings button element and add a click event listeners to it
settingbutton.addEventListener('click', handleSettingButtonClick);
settingCancel.addEventListener('click', handleSettingCancelClick);
//------------------------------------------------------------------------------------------------------------------------------
//code to display book details
// Function to toggle details overlay and show book details
const detailsToggle = (event) => {
const overlay1 = document.querySelector('[data-list-active]');
const title = document.querySelector('[data-list-title]')
const subtitle = document.querySelector('[data-list-subtitle]')
const description = document.querySelector('[data-list-description]')
const image1 = document.querySelector('[data-list-image]')
const imageblur = document.querySelector('[data-list-blur]')
// Show details overlay if a book is clicked by using if statements
if (event.target.dataset.id) {
    overlay1.style.display = "block";
}
if (event.target.dataset.description) {
    description.innerHTML = event.target.dataset.description;
}
if (event.target.dataset.subtitle) {
    subtitle.innerHTML = event.target.dataset.subtitle;
}
if (event.target.dataset.title) {
    title.innerHTML = event.target.dataset.title;
}
if (event.target.dataset.image) {
    image1.setAttribute('src', event.target.dataset.image);
    imageblur.setAttribute('src', event.target.dataset.image);
}
};
//------------------------------------------------------------------------------------------------------------------------------
// select the 'details of the book button' and define function to handle the close button with click event
const detailsClose = document.querySelector('[data-list-close]');
const handleDetailsClose = (event) => {
  document.querySelector("[data-list-active]").style.display = "none";
};
detailsClose.addEventListener('click', handleDetailsClose);
// select the 'bookclick' and define function to handle the close button with click event
const bookclick = document.querySelector('[data-list-items]')
bookclick.addEventListener('click', detailsToggle)
//Authors Dropdown Option
const authorSelect = document.querySelector("[data-search-authors]");
const allAuthorOption = document.createElement('option');
allAuthorOption.value = "authors";
allAuthorOption.textContent = "All authors";
authorSelect.appendChild(allAuthorOption);
/* This code loops through the authors object and creates a new option element for each author,
then appends it to the select element with the data attribute "search-authors".*/
// For each author, a new option element is created with the value set to the author's ID and the text content set to the author's name.
for (const authorId in authors) {
  const optionElement = document.createElement('option')
  optionElement.value = authorId
  optionElement.textContent = authors[authorId]
  authorSelect.appendChild(optionElement) // The new option element is appended to the select element
}
//Genre Dropdown Option
//set the value of the option element to "all", set the text content of the option element to "All Genre"
const genreSelect = document.querySelector("[data-search-genres]"); //declared variable
const allGenreOption = document.createElement('option'); //declared variable
allGenreOption.value = "all";
allGenreOption.textContent = "All Genre";
genreSelect.appendChild(allGenreOption); // add the new option element to the genre select dropdown
//Created a list of options for selecting genres, and appends those options to a dropdown select element in the HTML.
for (const genreId in genres) {
  const optionElement = document.createElement('option')
  optionElement.value = genreId
  optionElement.textContent = genres[genreId]
  genreSelect.appendChild(optionElement)
}
//---------------------------------------------------------------------------------------------------------------------------------
// Show more button
const showMoreButton = document.querySelector("[data-list-button]");
showMoreButton.textContent = 'More Books'
showMoreButton.addEventListener("click", () => {
  const fragment = document.createDocumentFragment();
  startIndex += 36;
  endIndex += 36;
  const startIndex1 = startIndex;
  const endIndex1 = endIndex;
  console.log(startIndex1);
  console.log(endIndex1);
  const extracted = books.slice(startIndex1, endIndex1);
  for (const {
    author,
    image,
    title,
    id,
    description,
    published,
  } of extracted) {
    const preview = document.createElement("dl");
    preview.className = "preview";
    preview.dataset.id = id;
    preview.dataset.title = title;
    preview.dataset.image = image;
    preview.dataset.subtitle = `${authors[author]} (${new Date(
      published
    ).getFullYear()})`;
    preview.dataset.description = description;
    preview.dataset.genre = genres
    preview.innerHTML = /*html*/ `
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`;
    fragment.appendChild(preview);
  }
  const booklist1 = document.querySelector("[data-list-items]");
  booklist1.appendChild(fragment);
});
//----------------------------------------------------------------------------------------------------------------------------