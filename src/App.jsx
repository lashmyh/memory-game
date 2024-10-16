
import './App.css'
import { useState, useEffect } from 'react';
import { ScoreBoard } from './Scoreboard';
import { Card } from './Card';
import { Round } from './Round';
import { GameOver } from './GameOver';
import { HighestScore } from './HighestScore';

//function to shuffle an array
const shuffleArray = (array) => {  
  array.sort(() => Math.random() - 0.5);
  return array;
} 

function App() {
  const [characters, setCharacters] = useState([]); 
  const [clickedCharacters, setClickedCharacters] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [round, setRound] = useState(1);
  const [highestScore, setHighestScore] = useState(0);

  //fetch character data from PokeAPI
  useEffect(() => {
    // Fetch character data from API, on every mount
    const fetchCharacters = async () => {


      //generate 16 random integers between 1 and 100
      const arr = [];
      while (arr.length < 16) {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        if (!arr.includes(randomNum)) {
          arr.push(randomNum);
        };
      };

      const dataPromises = arr.map(async (index) => {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
        const data = await result.json();
        return {
          name: data.name,
          sprite: data.sprites.front_default,
        };
      });

      const pokemon = await Promise.all(dataPromises);
      setCharacters(pokemon);

    };

    fetchCharacters();
  }, []);

  const handleCardClick = (name) => {
    if (clickedCharacters.includes(name)) {
      ///game over 
      setGameOver(true);
    } else {
      //update score, add to clicked and reshuffle cards
      setScore(score + 1);
      setRound(round + 1);
      if (score + 1>= highestScore) {
        setHighestScore(score + 1);
      };
      setClickedCharacters([...clickedCharacters, name]);
      setCharacters(shuffleArray([...characters]));

    };
  };

  const restartGame = () => {
    setScore(0);
    setClickedCharacters([]);
    setGameOver(false)
    setRound(1);
  }


  return (
    <div className='container'>
      <header>
        <div>
          <Round round={round}/>
        </div>
        <div className='scores'>
          <ScoreBoard score={score}/>
          <HighestScore highestScore={highestScore}/>
        </div>
      </header>
      {gameOver ? (
        <GameOver onRestart={restartGame}/>
      ) : (
        <div className='cards'>
        {characters.length > 15 ? (
          characters.map((character) => (
            <Card onClick={() => handleCardClick(character.name)} character={character} key={character.name}/>
          ))
        ) : (
          <p>Loading cards...</p>
        )}
      </div>
      )}
    </div>
  );
}

export default App;
