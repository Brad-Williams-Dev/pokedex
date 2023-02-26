import React, { useState, useEffect } from "react";
import { colors, badgeColors } from "./helpers/colors";
import axios from "axios";
import InfoCard from "./InfoCard";
import "../index.css";

function Cards({ search }) {
  const [pokeData, setPokeData] = useState([]);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = [""];

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1008")
      .then(function (response) {
        // handle success
        setIsLoading(true);
        const pokemon = response.data.results;
        const pokemonPromises = pokemon.map((p) => axios.get(p.url));
        Promise.all(pokemonPromises)
          .then((pokemonResponses) => {
            const pokemonData = pokemonResponses.map((res) => res.data);
            setPokeData(pokemonData);
            setIsLoading(false);
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

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowInfoCard(true);
  };

  function handleTypeSelect(type) {
    setSelectedType(type);
  }

  function LoadingBar() {
    return (
      <div className="w-full h-full flex justify-center">
        <img
          src="https://github.com/Brad-Williams-Dev/pokedex/blob/main/src/images/pokeball-load.png?raw=true"
          alt="pokeball"
          className="h-[25em] animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 md:p-20">
      {isLoading ? (
        <LoadingBar />
      ) : (
        <div className="grid grid-cols-1 w-auto gap-6 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pokeData.map((pokemon) =>
            pokemon.name.toLowerCase().includes(search) ? (
              <div
                key={pokemon.id}
                className="py-5 m-auto w-full h-full hover:scale-105 cursor-pointer"
                onClick={() => handleCardClick(pokemon)}
              >
                <div
                  className="rounded-3xl shadow p-10 flex flex-row h-full bg-[url('https://github.com/Brad-Williams-Dev/pokedex/blob/main/src/images/pokeball.png?raw=true')] bg-contain bg-no-repeat bg-right"
                  style={{
                    backgroundColor: colors[pokemon.types[0].type.name],
                  }}
                >
                  <div className="p-5 flex-grow">
                    <div className="flex flex-col -ml-10 -mt-10 w-[10em]">
                      <h5 className="mb-0 text-2xl font-bold tracking-tight text-slate-600 ">
                        #{pokemon.id}
                      </h5>
                      <h5 className="mb-2 text-4xl font-bold tracking-tight text-opal-300 capitalize">
                        {pokemon.name}
                      </h5>
                    </div>
                    <div className="mt-[6em] -ml-10 ">
                      <span
                        className="text-[#fff] text-xl mr-2 px-2.5 py-2.5 shadow-xl rounded-lg capitalize"
                        style={{
                          backgroundColor:
                            badgeColors[pokemon.types[0].type.name],
                        }}
                      >
                        {pokemon.types[0].type.name}
                      </span>
                      {/* Checks if pokemon has a second type */}
                      {pokemon.types[1] ? (
                        <span
                          className="text-[#fff] text-xl mr-2 py-2.5 px-2.5 shadow-xl rounded-lg capitalize"
                          style={{
                            backgroundColor:
                              badgeColors[pokemon.types[1].type.name],
                          }}
                        >
                          {pokemon.types[1].type.name}
                        </span>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-t-lg mb-4 h-48 w-48 pr-10"
                      src={pokemon.sprites.other.home.front_default}
                      alt="pokemon-img"
                    />
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
      {showInfoCard && (
        <div className="info-card-wrapper">
          <InfoCard pokemon={selectedPokemon} setShow={setShowInfoCard} />
        </div>
      )}
    </div>
  );
}

export default Cards;
