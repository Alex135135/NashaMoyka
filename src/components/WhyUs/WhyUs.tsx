import { ICards } from "@/types/types"
import { Card } from "../Card/Card"
import s from "./WhyUs.module.scss"

export function WhyUs({ title, texts }: ICards) {
  return (
    <section className={s.whyUs}>
      <div className={s.whyUs__container}>
        <h2 className={s.whyUs__title}>{title}</h2>
        <div className={s.whyUs__cards}>
          {texts.map((item, index) => (
            <Card
              key={index}
              index={index + 1}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
};