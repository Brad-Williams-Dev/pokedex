import React from "react";

function Header() {
  return (
    <div className="flex flex-row justify-around p-10">
      <div>
        <h2 className="text-6xl ml-20 mt-20 text-black-600 font-bold">
          Pokedex
        </h2>
        <p className="mt-5 ml-20 text-slate-500">
          Search for Pokemon by name or using the National Pokedex numer
        </p>
      </div>
      <div>
        <input
          type="text"
          className="bg-gray-200 border border-gray-500 rounded-lg w-96 h-10 mt-[7em] mr-[7em] text-gray-700 text-lg"
        />
      </div>
    </div>
  );
}

export default Header;