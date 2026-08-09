import s from "./Footer.module.scss"
import Link from "next/link"
import Image from "next/image"
export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footer__top}>
        <article className={s.footer__section}>
          <h3 className={s.section__title}>Контакты:</h3>
          <p className={s.section__text}>ул. Чистоты, 7</p>
          <p className={s.section__text}>Пн-Вс: 8:00–22:00</p>
          <p className={s.section__text}>+7 (495) 123-45-67</p>
        </article>

        <article className={s.footer__section}>
          <h3 className={s.section__title}>Навигация:</h3>
          <Link href={'/'} className={s.section__link}>Главная</Link>
          <Link href={'/services'} className={s.section__link}>Услуги</Link>
          <Link href={'/booking'} className={s.section__link}>Запись</Link>
        </article>

        <article className={s.footer__section}>
          <h3 className={s.section__title}>СоцСети:</h3>
          <div className={s.socials}>
            <a href="#" className={s.social__link}>
              <div className={s.icon_container}>
                <Image
                  src="/vk.png"
                  alt="Vkontakte"
                  width={40}
                  height={40}
                  className={s.social__icon}
                />
              </div>
            </a>
            <a href="#" className={s.social__link}>
              <div className={s.icon_container}>
                <Image
                  src="/odnoklassniki.png"
                  alt="odnoklassniki"
                  width={40}
                  height={40}
                  className={s.social__icon}
                />
              </div>
            </a>
            <a href="#" className={s.social__link}>
              <div className={s.icon_container}>
                <Image
                  src="/telegram.png"
                  alt="telegram"
                  width={40}
                  height={40}
                  className={s.social__icon}
                />
              </div>
            </a>
          </div>
        </article>
      </div>

      <div className={s.footer__divider}></div>

      <div className={s.footer__bottom}>
        <Link href={'/'} className={s.footer__logo}>
          <div className={s.logoContainer}>
            <Image
              src="/Logo.png"
              alt="AquaShine Logo"
              fill
              className={s.logo}
            />
          </div>
          <span className={s.logolink__span}>AquaShine</span>
        </Link>
        <p className={s.copyright}>© 2025 AquaShine. Все права защищены.</p>
      </div>
    </footer>
  )
};