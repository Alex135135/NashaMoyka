import s from "./Card.module.scss"
import { ICard } from "@/types/types"

export function Card({ index, description, title }: ICard) {
  return (
    <article className={s.card}>
      <div className={s.card__indexContainer}>
        <span className={s.card__index}>{index}</span>
      </div>
      <div className={s.card__content}>
        <h3 className={s.card__title}>{title}</h3>
        <p className={s.card__description}>{description}</p>
      </div>
    </article>
  )
};