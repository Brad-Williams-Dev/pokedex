import React, { useState } from "react";

function Header({ onSearchChange }) {
  return (
    <div class="flex flex-col md:flex-row md:justify-between p-5 -mb-10">
      <div>
        <h2 class="text-2xl md:text-6xl ml-5 md:ml-20 mt-5 md:mt-20 text-black-600 font-bold">
          Pokedex
        </h2>
        <p class="mt-3 md:mt-5 ml-5 md:ml-20 text-slate-500">
          Search for Pokemon by name!
        </p>
      </div>
      <div class="mt-5 md:mt-[7em] mx-5 md:mr-[7em]">
        <input
          type="text"
          class="bg-gray-200 border border-gray-500 rounded-lg w-full md:w-[30em] h-10 md:h-[3em] text-gray-700 text-lg text-center"
          placeholder="What Pokemon are you looking for?"
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}

export default Header;
