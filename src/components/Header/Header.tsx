'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import s from './Header.module.scss'

const MOBILE_BREAKPOINT = 768

export function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Обработчик изменения ширины окна
  const handleResize = useCallback(() => {
    const isMobileNow = window.innerWidth < MOBILE_BREAKPOINT
    setIsMobile(isMobileNow)
    if (!isMobileNow) setMenuIsOpen(false)
  }, [])

  // Закрытие меню при клике вне него
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuIsOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setMenuIsOpen(false)
    }
  }, [menuIsOpen])

  // Закрытие меню при нажатии Escape
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && menuIsOpen) {
      setMenuIsOpen(false)
    }
  }, [menuIsOpen])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleResize, handleClickOutside, handleKeyDown])

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (menuIsOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuIsOpen, isMobile])

  const toggleMenu = () => setMenuIsOpen(prev => !prev)
  const closeMenu = () => setMenuIsOpen(false)

  const navLinks = [
    { href: '/booking', label: 'Запись' },
    { href: '/services', label: 'Услуги' },
  ]

  return (
    <header className={s.header} role="banner">
      <Link href="/" className={s.header__logolink} aria-label="На главную">
        <div className={s.logoContainer}>
          <Image
            src="/Logo.png"
            alt="AquaShine Logo"
            fill
            sizes="(max-width: 768px) 40px, 60px"
            priority
            className={s.logo}
          />
        </div>
        <span className={s.logolink__span}>НашаМойка</span>
      </Link>

      {isMobile ? (
        <>
          <button
            ref={buttonRef}
            className={`${s.menuButton} ${menuIsOpen ? s.open : ''}`}
            onClick={toggleMenu}
            aria-expanded={menuIsOpen}
            aria-controls="mobile-menu"
            aria-label={menuIsOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <span />
            <span />
            <span />
          </button>

          <div
            ref={menuRef}
            id="mobile-menu"
            className={`${s.mobileMenu} ${menuIsOpen ? s.open : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню навигации"
          >
            <nav className={s.mobileNav} aria-label="Мобильная навигация">
              <ul className={s.nav__ul}>
                {navLinks.map(({ href, label }) => (
                  <li key={href} className={s.ul__li}>
                    <Link href={href} className={s.ul__link} onClick={closeMenu}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <nav className={s.header__nav} aria-label="Основная навигация">
          <ul className={s.nav__ul}>
            {navLinks.map(({ href, label }) => (
              <li key={href} className={s.ul__li}>
                <Link href={href} className={s.ul__link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}