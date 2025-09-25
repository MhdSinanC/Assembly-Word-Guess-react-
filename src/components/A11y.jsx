/* eslint-disable react/prop-types */
import { languages } from "../languages"

export default function A11y({currentWord, guessedLetters, lastGuessedLetter}) {

    return (
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
    )
}