/* eslint-disable react/prop-types */
import clsx from "clsx";

export default function Keyboard({guessedLetters, currentWord, isGameOver, addGuessedLetter}) {

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    

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

    return (
        <section className="keyboard">
            {keyButtons}
        </section>
    )
}