'use client'
import Link from "next/link"
import s from "./Header.module.scss"
import { useEffect, useState } from "react"
import Image from "next/image"
export function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function checkWidth() {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setMenuIsOpen(false)
    }

    checkWidth()
    window.addEventListener('resize', checkWidth)

    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  return (
    <header className={s.header}>
      <Link href={'/'} className={s.header__logolink}>
        <div className={s.logoContainer}>
          <Image
            src="/Logo.png"
            alt="AquaShine Logo"
            fill
            className={s.logo}
          />
        </div>
        <span className={s.logolink__span}>НашаМойка</span>
      </Link>

      {isMobile ? (
        <>
          <button
            className={`${s.menuButton} ${menuIsOpen ? s.open : ''}`}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`${s.mobileMenu} ${menuIsOpen ? s.open : ''}`}>
            <nav className={s.mobileNav}>
              <ul className={s.nav__ul}>
                <li className={s.ul__li}><Link href={'/booking'} className={s.ul__link} onClick={() => setMenuIsOpen(false)}>Запись</Link></li>
                <li className={s.ul__li}><Link href={'/services'} className={s.ul__link} onClick={() => setMenuIsOpen(false)}>Услуги</Link></li>
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <nav className={s.header__nav}>
          <ul className={s.nav__ul}>
            <li className={s.ul__li}><Link href={'/booking'} className={s.ul__link}>Запись</Link></li>
            <li className={s.ul__li}><Link href={'/services'} className={s.ul__link}>Услуги</Link></li>
          </ul>
        </nav>
      )}
    </header>
  )
}