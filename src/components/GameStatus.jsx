/* eslint-disable react/prop-types */
import clsx from "clsx";
import { languages } from "../languages";
import { getFarewellText } from '../utils';

export default function GameStatus({ isGameLost, isGameOver, isGameWon, isLastGuessIncorrect, wrongGuessCount }) {

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return <p className='farewell-text'>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
        }

        if (isGameWon) {
            return <><h2>You win!</h2> <p>Well done!🎉</p></>
        }

        if (isGameLost) {
            return <><h2>Game over! 😭</h2> <p>You lose! Better start learning Assembly</p></>
        }
    }

    return (
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
    )
}