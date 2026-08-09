import s from "./SpecialOffer.module.scss"
import Link from "next/link"

export function SpecialOffer() {
    return (
        <section className={s.specialOffer}>
            <div className={s.specialOffer__content}>
                <h2 className={s.specialOffer__title}>Специальное предложение!</h2>
                <p className={s.specialOffer__subtitle}>Первая мойка — со скидкой 20%!</p>
                <p className={s.specialOffer__description}>Записывайся онлайн и попробуй качество AquaShine.</p>
                <Link href={'/booking'} className={s.specialOffer__link}>
                    <span className={s.linkText}>Записаться</span>
                    <span className={s.flame}></span>
                </Link>
            </div>
        </section>
    )
};