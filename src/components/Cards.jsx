import React, { useState, useEffect } from "react";
import { colors, badgeColors } from "./helpers/colors";
import axios from "axios";

function Cards() {
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(function (response) {
        // handle success
        const pokemon = response.data.results;
        const pokemonPromises = pokemon.map((p) => axios.get(p.url));
        Promise.all(pokemonPromises)
          .then((pokemonResponses) => {
            const pokemonData = pokemonResponses.map((res) => res.data);
            setPokeData(pokemonData);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="grid grid-cols-4 p-20">
      {pokeData.map((pokemon) => (
        <div key={pokemon.id} className="py-5 m-auto w-[25em] h-[14em]">
          <div
            className="opacity-100 max-w-md rounded-3xl shadow p-10 flex flex-row h-full bg-[url('https://github.com/Brad-Williams-Dev/pokedex/blob/main/src/components/images/pokeball.png?raw=true')] bg-contain bg-no-repeat bg-right"
            style={{
              backgroundColor: colors[pokemon.types[0].type.name],
            }}
          >
            <div className="p-5">
              <div className="flex flex-col -ml-10 -mt-10 w-[10em]">
                <h5 className="mb-0 text-2xl font-bold tracking-tight text-slate-500 ">
                  #{pokemon.id}
                </h5>
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-[#fff]">
                  {pokemon.name.slice(0, 1).toUpperCase() +
                    pokemon.name.slice(1)}
                </h5>
              </div>
              <div className="mt-4 -ml-10">
                <span
                  className="text-[#fff] text-xl mr-2 px-2.5 py-2.5 shadow-xl rounded-lg "
                  style={{
                    backgroundColor: badgeColors[pokemon.types[0].type.name],
                  }}
                >
                  {pokemon.types[0].type.name.slice(0, 1).toUpperCase() +
                    pokemon.types[0].type.name.slice(1)}
                </span>
                {/* Checks if pokemon has a second type */}
                {pokemon.types[1] ? (
                  <span
                    className="text-[#fff] text-xl mr-2 py-2.5 px-2.5 shadow-xl rounded-lg"
                    style={{
                      backgroundColor: badgeColors[pokemon.types[1].type.name],
                    }}
                  >
                    {pokemon.types[1].type.name.slice(0, 1).toUpperCase() +
                      pokemon.types[1].type.name.slice(1)}
                  </span>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <img
              className="rounded-t-lg ml-[4em] scale-100"
              src={pokemon.sprites.front_default}
              alt="pokemon-img"
            />
          </div>
          <div
            className={`absolute top-0 left-0 right-0 bottom-0 rounded-t-lg ${
              colors[pokemon.types[0]?.type.name ?? "default"]
            }`}
            style={{ opacity: "0.7" }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
