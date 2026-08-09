'use client'
import s from "./FAQ.module.scss"
import { useState } from "react"
import { faqs } from "@/data/data"
export function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    function toggleAccordion(index: number) {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className={s.faqSection}>
            <div className={s.container}>
                <h2 className={s.title}>Частые вопросы</h2>
                <p className={s.subtitle}>Все, что вы хотели знать о наших услугах</p>

                <div className={s.faqContainer}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${s.faqItem} ${activeIndex === index ? s.active : ''}`}
                        >
                            <button
                                className={s.question}
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={activeIndex === index}
                            >
                                <span className={s.questionText}>{faq.question}</span>
                                <span className={s.arrowIcon}></span>
                            </button>

                            <div className={s.answerContainer}>
                                <div className={s.answer}>{faq.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}