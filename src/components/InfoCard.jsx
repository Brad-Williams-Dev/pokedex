import React from "react";
import { colors, badgeColors } from "./helpers/colors";
import "../index.css";

function InfoCard({ pokemon, setShow, base_stat }) {
  const closeCard = () => {
    setShow(false);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div className="flex flex-row justify-between rounded-3xl bg-white w-[40em] h-[35em]">
        <div
          className="flex flex-col justify-around mb-5 w-[20em] h-[35em] p-10  bg-[url('https://github.com/Brad-Williams-Dev/pokedex/blob/main/src/images/pokeball.png?raw=true')] bg-contain bg-no-repeat bg-right"
          style={{
            backgroundColor: colors[pokemon.types[0].type.name],
            borderTopLeftRadius: "1em",
            borderBottomLeftRadius: "1em",
          }}
        >
          <h2 className="text-5xl capitalize text-center text-white mt-15">
            {pokemon.name}
          </h2>
          <img
            className="w-30 h-40 mb-[6em] m-auto"
            src={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
          />
          <p className="text-center -mt-20">
            <span className="text-2xl text-white">Abilities </span>
            {pokemon.abilities.map((ability) => (
              <h2
                className="text-[#fff] text-sm mr-2 px-2.5 py-2.5 shadow-xl rounded-lg capitalize mt-5 flex flex-col justify-around"
                style={{
                  backgroundColor: badgeColors[pokemon.types[0].type.name],
                }}
              >
                {ability.ability.name}
              </h2>
            ))}
          </p>
        </div>

        <div className="flex flex-col items-center bg-white rounded-3xl">
          <button
            className="fixed text-red-500 text-md -mr-[14em] mt-4"
            onClick={closeCard}
          >
            ❌
          </button>
          <p className="text-lg text-slate-400 mr-[7em] mt-[2em] capitalize">
            <h2 className="text-2xl pb-6 font-bold text-green-500">
              Base Stats
            </h2>
            {pokemon.stats.map((stats) => (
              <h3>
                {stats.stat.name} {stats.base_stat}
                <div className="bg-gray-100 rounded-full h-1.5 mb-4 dark:bg-gray-200">
                  <div
                    className="h-1.5 rounded-full dark:bg-green-500 bg-green-400 progress-bar__fill"
                    style={{
                      width: `${stats.base_stat}%`,
                      clipPath: `inset(0 ${100 - stats.base_stat}% 0 0)`,
                      animation: "fill-bar 2.5s ease-in-out forwards",
                    }}
                  ></div>
                </div>
              </h3>
            ))}
          </p>

          <span className="w-full mb-4 text-slate-400 font-bold text-xl mt-5">
            Total:{" "}
            {pokemon.stats.reduce((total, stats) => total + stats.base_stat, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
export default InfoCard;
