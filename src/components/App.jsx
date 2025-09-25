import { useState } from 'react';
import { languages } from "../languages";
import { getRandomWord } from '../utils';
import Confetti from 'confetti-react';
import GameStatus from './GameStatus';
import LangChips from './LangChips';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import A11y from './A11y';

export default function App() {

    //state values
    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
    const [guessedLetters, setGuessedLetters] = useState([]);

    //derived values
    let wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;

    const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter));
    const isGameLost = wrongGuessCount >= languages.length - 1;
    const isGameOver = isGameWon || isGameLost;
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);


    const addGuessedLetter = (letter) => {
        setGuessedLetters((prevGuess) => {
            return prevGuess.includes(letter) ? prevGuess : [...prevGuess, letter]
        })
    }

    function newGame() {
        setCurrentWord(getRandomWord());
        setGuessedLetters([]);
    }


    return (
        <>
            {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}

            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>

            <GameStatus
                isGameLost={isGameLost}
                isGameOver={isGameOver}
                isGameWon={isGameWon}
                isLastGuessIncorrect={isLastGuessIncorrect}
                wrongGuessCount={wrongGuessCount}
            />

            <LangChips wrongGuessCount={wrongGuessCount} />

            <WordDisplay
                currentWord={currentWord}
                isGameLost={isGameLost}
                guessedLetters={guessedLetters}
            />

            {/* Combined visually-hidden aria-live region for status update */}
            <A11y
                currentWord={currentWord}
                guessedLetters={guessedLetters}
                lastGuessedLetter={lastGuessedLetter}
            />

            <Keyboard
                currentWord={currentWord}
                guessedLetters={guessedLetters}
                isGameOver={isGameOver}
                addGuessedLetter={addGuessedLetter}
            />

            <div className="new-game">
                {isGameOver && <button onClick={newGame}>New Game</button>}
            </div>
        </>
    )
}