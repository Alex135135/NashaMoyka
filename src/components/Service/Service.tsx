import { IServicePattern } from "@/types/types"
import s from "./Service.module.scss"
import Link from "next/link"

export function Service({ title, description, features, details,video }: IServicePattern) {

  return (
    <section className={s.service}>
      <div className={s.container}>
        <div className={s.mediaBlock}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.subtitle}>{description}</p>

          <div className={s.videoContainer}>
            <video
              src={video}
              autoPlay
              muted
              playsInline
              loop
            ></video>
          </div>
        </div>

        <div className={s.infoBlock}>
          <h3 className={s.infoTitle}>Что включено:</h3>

          <ul className={s.includedList}>
            {features.map((item, index) => (
              <li key={index} className={s.listItem}>
                <span className={s.checkIcon}>✓</span>
                <span className={s.itemText}>{item}</span>
              </li>
            ))}
          </ul>

          <ul className={s.detailsList}>
            {details.map((item, index) => (
              <li key={index} className={s.detailItem}>
                {item}
              </li>
            ))}
          </ul>

          <Link href={'/booking'} className={s.bookingLink}>
            Записаться онлайн
          </Link>
        </div>
      </div>
    </section>
  )
};