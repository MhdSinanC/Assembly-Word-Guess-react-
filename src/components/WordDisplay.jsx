/* eslint-disable react/prop-types */
export default function WordDisplay({currentWord, isGameLost, guessedLetters}) {

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

    return (
        <section className="random-word-container">
            {rWord}
        </section>
    )
}