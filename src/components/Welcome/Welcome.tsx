import s from "./Welcome.module.scss"
import Link from "next/link"

export function Welcome() {
    return (
        <section className={s.welcome}>
            <h2 className={s.welcome__title}>Добро пожаловать на НашуМойку!</h2>
            <h1 className={s.welcome__headline}>Сияние вашего авто — наша страсть!</h1>
            <p className={s.welcome__text}>Профессиональная мойка всего за час!</p>
            <Link href={'/booking'} className={s.welcome__link}>Записаться</Link>
        </section>
    )
};