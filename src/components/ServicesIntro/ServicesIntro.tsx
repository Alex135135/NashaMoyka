import s from "./ServicesIntro.module.scss"

export function ServicesIntro() {
    return (
        <section className={s.servicesIntro}>
            <div className={s.content}>
                <h1 className={s.title}>Экспресс-уход премиум класса для вашего автомобиля</h1>
                <p className={s.description}>В автомойке AquaShine мы переосмыслили стандарты чистоты, сочетая инновационные технологии с индивидуальным подходом. Наш 5-этапный процесс очистки гарантирует глубокое восстановление первоначального вида вашего авто.</p>
            </div>
            <div className={s.videoContainer}>
                <video className={s.videoContainer}
                    src="/video1.mp4"
                    autoPlay
                    muted
                    playsInline
                    loop
                ></video>
            </div>
        </section>
    )
};