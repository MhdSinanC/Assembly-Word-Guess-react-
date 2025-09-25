/* eslint-disable react/prop-types */
import { languages } from "../languages";
import clsx from "clsx";

export default function LangChips({wrongGuessCount}) {

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

    return (
        <section className="langChips">
            {langButtons}
        </section>
    )

}