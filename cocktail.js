/**
 * CS 310
 * Michael Kennedy
 * Cocktails Lab05
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
    // update page with a random cocktail
    // TODO: click event listener for the "Pick one for me!" button
    // uncheck the radio button when 
    let button = document.getElementById('random');
    button.addEventListener('click', () => {
      makeRequest();
    });

    let checkedbutton = qs("input[name='flexRadioDefault']:checked");

    checkedbutton.checked = false;

    let pickbutton = document.getElementById('random');
    pickbutton.classList.add('margintop');
    // TODO: click event listener for the radio buttons

    let radiobutton = document.querySelectorAll("input[name='flexRadioDefault']");
    for (let i = 0; i < radiobutton.length; i++) {
      radiobutton[i].addEventListener('click', () => {
        let drinkName = radiobutton[i].value;
        makeRequest(drinkName);
      });

    }


  }

  /**
   * TODO: Fetch data from the CocktailDB api! 
   * Noted that this API returns JSON, not plain text!
   * @param {string} drink_name - the cocktail's name
   *                 !!! random cocktail if drink_name is undefined
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


    // TODO: 1. make a fetch to the API
    //       2. check the status of the promise
    //       3. parse the data
    //       4. show the cocktail
    //       5. catch the error message if promise rejected.
    fetch(url)
      .then(checkStatus)      // helper function provide to ensure request is successful or not
      .then(showCocktail)
      .catch(console.log);

  }

  /**
   * show a cocktail's info
   * @param {object} res - the response data in JSON format
   */
  function showCocktail(res) {

    console.log(res);
    // TODO: clear the innerHTML of #cocktail-area so it's ready for 
    // showing the new cocktail's info
    let parent = document.getElementById('cocktail-area');
    parent.innerHTML = "";
    let pickbutton = document.getElementById('random');
    pickbutton.classList.remove('margintop');

    // TODO: create a new <img> 
    let cocktail = res.drinks[0];
    console.log(cocktail);
    let image = document.createElement('img');
    image.src = cocktail.strDrinkThumb;
    parent.appendChild(image);

    parent.classList.add('whitebackground');
    let cocktailimage = document.getElementById('cocktailpicture');
    cocktailimage.classList.add('hide');


    // TODO: create a new <h1> for title  
    let title = document.createElement('h1');
    title.innerText = cocktail.strDrink;
    parent.appendChild(title);


    // TODO: create a new <p> for instruction
    let instruction = document.createElement('p');
    instruction.innerText = cocktail.strInstructions;
    parent.appendChild(instruction);

    let line = document.createElement('hr');
    parent.appendChild(line);

    // TODO: create a new <h2> for "Ingredients:" sub-title
    let subtitle = document.createElement('h2');
    subtitle.innerText = 'Ingredients';
    parent.appendChild(subtitle);

    // TODO: create a new <ul> for a list of ingredients
    let ul = document.createElement("ul");
    let i = 1;
    let ingredient = "strIngredient" + i;
    let measure = "strMeasure" + i;
    while (cocktail[ingredient]) {
      // TODO: create <li> for one ingredient and its measure
      let li = document.createElement('li');
      if (cocktail[measure])
        li.innerText = cocktail[ingredient] + ": " + cocktail[measure];
      else li.innerText = cocktail[ingredient];
      parent.appendChild(li);
      // update key
      i++;
      ingredient = "strIngredient" + i;
      measure = "strMeasure" + i;
    }
    id("cocktail-area").appendChild(ul);

  }



  /* ------------------------------ Helper Functions below ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
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
