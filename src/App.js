//
//    Assignment 5
//    Name: Al Hochbaum
//    Date: 11/11/2023
//    Description: A bundle of cuteness!

import React, { useMemo, useState } from "react";
import "./styles.css";
import "mvp.css";

export default function App() {
  const [numberOfCatQuotes, SetNumberOfCatQuotes] = useState("");
  const [toggle, setToggle] = useState("off");
  const buttonClass = toggle;

  function deleteQuote(event) {
    event.preventDefault();
    const olTag = document.getElementById("catList");
    olTag.innerHTML = "";
  }

  function LoadTextData(event) {
    event.preventDefault();

    const apiRequestQuotes =
      "https://meowfacts.herokuapp.com/?count=" + `${numberOfCatQuotes}`;

    const apiRequestEncodedQuotes = encodeURI(apiRequestQuotes);
    fetch(apiRequestEncodedQuotes)
      .then((response) => response.json())
      .then((data) => loadImageData(data));
  }

  function loadImageData(dataTextData) {
    const apiRequestImages =
      "https://api.thecatapi.com/v1/images/search?limit=" +
      `${numberOfCatQuotes}`;

    const apiRequestEncodedImages = encodeURI(apiRequestImages);
    fetch(apiRequestEncodedImages)
      .then((response) => response.json())
      .then((dataImageData) => createList(dataTextData, dataImageData));
  }

  function createList(catQuotes, catImages) {
    const olTag = document.getElementById("catList");

    const catImagesArray = catImages;
    const catArray = catQuotes["data"];

    catArray.forEach((catElement, index) => {
      let ulTag = document.createElement("ul");
      let liTextTag = document.createElement("li");
      let liImageTag = document.createElement("li");
      let imgTag = document.createElement("img");

      liTextTag.innerHTML = `${catElement}`;

      imgTag.src = `${catImagesArray[index]["url"]}`;
      liImageTag.id = "catImg";
      liImageTag.appendChild(imgTag);
      ulTag.appendChild(liTextTag);
      ulTag.appendChild(liImageTag);

      olTag.append(ulTag);
    });
  }

  return (
    <>
      <div id="webpage-window-container">
        <form>
          <ul id="formLayout">
            <li id="formInput">
              <label htmlFor="catCount">Level Of Cuteness: </label>
              <input
                name="catCount"
                value={numberOfCatQuotes}
                onChange={(event) => SetNumberOfCatQuotes(event.target.value)}
              />
            </li>
            <li id="formButtons">
              <button
                type="submit"
                className={buttonClass}
                onClick={(event) => {
                  LoadTextData(event);
                  setToggle("on");
                }}
                id="get"
              >
                Get Quote
              </button>
              <button
                type="reset"
                onClick={(event) => {
                  setToggle("off");
                  deleteQuote(event);
                }}
                id="reset"
              >
                Reset
              </button>
            </li>
          </ul>
        </form>

        <ol id="catList"></ol>
      </div>
    </>
  );
}
