"use client";

import s from "./PopularServices.module.scss";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Типы для пропсов
interface IServiceItem {
    id: number;
    name: string;
    description: string;
    price: string;
    duration: string;
    icon: string;
    popular?: boolean;
}

interface IPopularServicesProps {
    title?: string;
    subtitle?: string;
    services: IServiceItem[];
    ctaText?: string;
    ctaLink?: string;
}


const ServiceCard = ({ service, index }: { service: IServiceItem; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(s.visible);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`${s.card} ${isHovered ? s.cardHovered : ''} ${s.cardHidden}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {service.popular && (
                <div className={s.popularBadge}>
                    <span>🔥 Популярно</span>
                </div>
            )}

            <div className={s.iconWrapper}>
                <Image
                    src={service.icon}
                    alt={service.name}
                    width={64}
                    height={64}
                    className={s.icon}
                />
            </div>

            <h3 className={s.cardTitle}>{service.name}</h3>
            <p className={s.cardDescription}>{service.description}</p>

            <div className={s.cardFooter}>
                <div className={s.priceBlock}>
                    <span className={s.priceLabel}>от</span>
                    <span className={s.priceValue}>{service.price}</span>
                </div>
                <div className={s.durationBlock}>
                    <span className={s.durationIcon}>⏱</span>
                    <span className={s.durationText}>{service.duration}</span>
                </div>
            </div>
        </div>
    );
};


export const PopularServices = ({
    title = "Популярные услуги",
    subtitle = "Выберите идеальный уход для вашего автомобиля",
    services,
    ctaText = "Смотреть все услуги",
    ctaLink = "/services",
}: IPopularServicesProps) => {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section className={s.popularServices} ref={sectionRef}>
            <div className={s.container}>

                <div className={s.header}>
                    <span className={s.badge}>⚡ ТОП УСЛУГ</span>
                    <h2 className={s.title}>{title}</h2>
                    <p className={s.subtitle}>{subtitle}</p>
                </div>


                <div className={s.grid}>
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>


                <div className={s.ctaWrapper}>
                    <Link href={ctaLink} className={s.ctaButton}>
                        {ctaText}
                        <span className={s.ctaArrow}>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};