import { useState } from 'react';
import { languages } from "../languages";
import { getFarewellText, getRandomWord } from '../utils';
import clsx from 'clsx';
import Confetti from 'confetti-react';

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

    //static values
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    const langButtons = languages.map((lang, idx) => {
        const isLanguageLost = idx < wrongGuessCount;
        const styles = { backgroundColor: lang.backgroundColor, color: lang.color };
        return (
            <span
                key={lang.name}
                style={styles}
                className={clsx({ 'lost': isLanguageLost })}
            >
                {lang.name}
            </span>
        )
    })

    const rWord = currentWord.split('').map((letter, idx) => {
        return (
            <span
                key={idx}
                style={{ color: isGameLost && !guessedLetters.includes(letter) ? '#EC5D49' : 'inherit' }}
            >
                {isGameLost || guessedLetters.includes(letter) ? letter.toUpperCase() : ''}
            </span>
        )
    })

    const addGuessedLetter = (letter) => {
        setGuessedLetters((prevGuess) => {
            return prevGuess.includes(letter) ? prevGuess : [...prevGuess, letter]
        })
    }

    const keyButtons = alphabet.split('').map((letter, idx) => {

        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && currentWord.includes(letter);
        const isWrong = isGuessed && !currentWord.includes(letter);

        return (
            <button
                disabled={isGameOver}
                aria-label={`letter ${letter}`}
                aria-disabled={guessedLetters.includes(letter)}
                key={idx}
                onClick={() => addGuessedLetter(letter)}
                className={(clsx({ 'green-btn': isCorrect, 'red-btn': isWrong }))}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return <p className='farewell-text'>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
        }

        if (isGameWon) {
            return <><h2>You win!</h2> <p>Well done!🎉</p></>
        }

        if (isGameLost) {
            return <><h2>Game over!</h2> <p>You lose! Better start learning Assembly 😭</p></>
        }
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

            <section
                aria-live='polite'
                role='status'
                className={clsx('status-box', {
                    'green': isGameWon,
                    'red': isGameLost,
                    'farewell': !isGameOver && isLastGuessIncorrect
                })}
            >
                {renderGameStatus()}
            </section>

            <section className="langChips">
                {langButtons}
            </section>

            <section className="random-word-container">
                {rWord}
            </section>

            {/* Combined visually-hidden aria-live region for status update */}
            <section
                className='sr-only'
                aria-live='polite'
                role='status'
            >

                <p>
                    {currentWord.includes(lastGuessedLetter) ?
                        `Correct! The letter ${lastGuessedLetter} is in the wword` :
                        `Sorry, the letter ${lastGuessedLetter} is not in the word`
                    }
                    You have {languages.length - 1} attempts left.
                </p>

                <p>
                    Current word: {
                        currentWord.split('').map(letter =>
                            guessedLetters.includes(letter) ? letter + '.' : 'blank'
                        )
                    }

                </p>
            </section>

            <section className="keyboard">
                {keyButtons}
            </section>

            <div className="new-game">
                {isGameOver && <button onClick={newGame}>New Game</button>}
            </div>
        </>
    )
}