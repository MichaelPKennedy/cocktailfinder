/**
 * Michael Kennedy
 * Cocktail Finder
 */
"use strict";
(function () {

  const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

  window.addEventListener("load", init);

  /**
   * init function 
   * creates event listeners for all radio buttons 
   * creates event listener for the pick one for me button
   */
  function init() {
    let button = document.getElementById('random');
    button.addEventListener('click', () => {
      makeRequest();
    });

    let checkedbutton = qs("input[name='flexRadioDefault']:checked");

    checkedbutton.checked = false;

    let pickbutton = document.getElementById('random');
    pickbutton.classList.add('margintop');

    let radiobutton = document.querySelectorAll("input[name='flexRadioDefault']");
    for (let i = 0; i < radiobutton.length; i++) {
      radiobutton[i].addEventListener('click', () => {
        let drinkName = radiobutton[i].value;
        makeRequest(drinkName);
      });

    }


  }

  /**
   * @param {string} drink_name - the cocktail's name
   *               
   */
  function makeRequest(drink_name) {
    // TODO: format the API's url 
    let url;
    if (drink_name == null) {
      url = BASE_URL + 'random.php';
    }
    else {
      url = BASE_URL + 'search.php?s=' + drink_name;
    }


    fetch(url)
      .then(checkStatus)
      .then(showCocktail)
      .catch(console.log);

  }

  /**
   * shows a cocktail's info
   * @param {object} res - the response data in JSON format
   */
  function showCocktail(res) {

    console.log(res);

    let parent = document.getElementById('cocktail-area');
    parent.innerHTML = "";
    let pickbutton = document.getElementById('random');
    pickbutton.classList.remove('margintop');

    let cocktail = res.drinks[0];
    console.log(cocktail);
    let image = document.createElement('img');
    image.src = cocktail.strDrinkThumb;
    parent.appendChild(image);

    parent.classList.add('whitebackground');
    let cocktailimage = document.getElementById('cocktailpicture');
    cocktailimage.classList.add('hide');


    let title = document.createElement('h1');
    title.innerText = cocktail.strDrink;
    parent.appendChild(title);


    let instruction = document.createElement('p');
    instruction.innerText = cocktail.strInstructions;
    parent.appendChild(instruction);

    let line = document.createElement('hr');
    parent.appendChild(line);

    let subtitle = document.createElement('h2');
    subtitle.innerText = 'Ingredients';
    parent.appendChild(subtitle);

    let ul = document.createElement("ul");
    let i = 1;
    let ingredient = "strIngredient" + i;
    let measure = "strMeasure" + i;
    while (cocktail[ingredient]) {

      let li = document.createElement('li');
      if (cocktail[measure])
        li.innerText = cocktail[ingredient] + ": " + cocktail[measure];
      else li.innerText = cocktail[ingredient];
      parent.appendChild(li);

      i++;
      ingredient = "strIngredient" + i;
      measure = "strMeasure" + i;
    }
    id("cocktail-area").appendChild(ul);

  }



  /* ------------------------------ Helper Functions below ------------------------------ */

  /**
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response.json();
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
