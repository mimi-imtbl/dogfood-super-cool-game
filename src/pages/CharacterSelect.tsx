/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./CharacterSelect.css";

type CharacterOption = {
  id: number;
  name: string;
};

const CharacterOptions: CharacterOption[] = [
  { id: 1, name: "ibis" },
  { id: 2, name: "bull" },
  { id: 3, name: "corgi" },
  { id: 4, name: "kookaburra" },
  { id: 5, name: "emu" },
  { id: 6, name: "wombat" },
  { id: 7, name: "kiwi" },
  { id: 8, name: "quokka" },
  { id: 9, name: "penguin" },
  { id: 10, name: "wallaby" },
];

const CharacterSelect = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterOption>(
    CharacterOptions[0]
  );

  const imageUrl = (id: number) =>
    `https://dogfooding2024.s3.amazonaws.com/images/character-image-${id}-1.png`;

  // const selectCharacter = (option: CharacterOption) => {
  //   console.log("@@@@@@ selected ", option);
  // };

  return (
    <div>
      <h1>CharacterSelect Page</h1>

      <div className="select-container">
        {CharacterOptions.map((option) => (
          <a
            key={option.id}
            className={`character ${
              option.id === selectedCharacter.id ? "character--selected" : ""
            }`}
            onClick={() => setSelectedCharacter(option)}
            href="#"
            role="button"
          >
            <img src={imageUrl(option.id)}></img>
          </a>
        ))}
      </div>

      <button>Let's go!</button>
    </div>
  );
};

export default CharacterSelect;
