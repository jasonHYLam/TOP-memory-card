import { useEffect, useState } from "react"
export function Card({
    uniqueId, 
    setValidId, 
    addToKeysArray,
    increaseScore,
    clickedIdsArray,
    setClickedIdsArray,


    resetGame,
    keysArrayLength,
    removeKeyFromArray,
    randomiseKeysArray,
    }) {

    const [newName, setNewName] = useState('');
    const [newImageUrl, setImageUrl] = useState('');

  async function tryPokemonAPI() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${uniqueId}`,
      {mode: 'cors'});

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      const data = await response.json();

      let pokemonName = data.name;
      let imageUrl = data.sprites.back_default;

      return { pokemonName, imageUrl }
    }

    catch (error) {
      console.log(`Could not get products: ${error}.`)
    }
  }


  function checkIfClicked() {
    return (clickedIdsArray.includes(uniqueId))
  }

  function checkIfRemoveKeyIsValid() {
    return (keysArrayLength === 10)
  }

    useEffect(() => {

        tryPokemonAPI().then(({pokemonName, imageUrl}) => {
            setNewName(pokemonName);
            setImageUrl(imageUrl);
        })
    }, [uniqueId])

    return (
        <div 
        className="card"
        onClick={()=> {
            if (checkIfClicked()) {
                resetGame();
                return
            } else {
                if (checkIfRemoveKeyIsValid()) {
                    removeKeyFromArray();
                }
                setValidId();
                addToKeysArray();
                randomiseKeysArray()
                increaseScore();
                setClickedIdsArray([...clickedIdsArray, uniqueId]);

            }
        }}
        >
            <h2>{newName.toUpperCase()}</h2>
            <img className="sprite" src={newImageUrl} alt="" />
        </div>
    )
}