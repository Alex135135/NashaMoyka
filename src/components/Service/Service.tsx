"use client";

import { IServicePattern } from "@/types/types";
import s from "./Service.module.scss";
import Link from "next/link";
import { memo, useState, useCallback, useRef, useEffect, useMemo } from "react";
import Image from "next/image";


const CHECK_ICON_SIZES = { width: 20, height: 20 };
const VIDEO_DIMENSIONS = { width: 800, height: 450 };


const CheckIcon = memo(() => (
  <svg
    className={s.checkIcon}
    width={CHECK_ICON_SIZES.width}
    height={CHECK_ICON_SIZES.height}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    role="img"
  >
    <circle cx="10" cy="10" r="10" fill="#4CAF50" />
    <path
      d="M6 10L9 13L14 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
CheckIcon.displayName = 'CheckIcon';


const VideoPlayer = memo(({ src, poster }: { src: string; poster?: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    const handleLoadedData = () => setIsLoading(false);
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);


    if (isVisible) {
      video.play().catch(() => {

      });
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [isVisible]);


  const errorContent = useMemo(() => (
    <div className={s.videoError}>
      <span>Не удалось загрузить видео</span>
      {poster && (
        <Image
          src={poster}
          alt="Видео временно недоступно"
          width={VIDEO_DIMENSIONS.width}
          height={VIDEO_DIMENSIONS.height}
          className={s.fallbackImage}
          loading="lazy"
        />
      )}
    </div>
  ), [poster]);

  if (hasError) return errorContent;

  return (
    <div ref={containerRef} className={s.videoWrapper}>
      {isLoading && (
        <div className={s.videoLoader} role="status" aria-label="Загрузка видео">
          <span className={s.loaderSpinner} />
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={isVisible}
        muted
        playsInline
        loop
        className={isLoading ? s.videoHidden : s.videoVisible}
        preload="metadata"
        aria-label={`Видео: ${poster ? 'превью' : ''}`}
      />
    </div>
  );
});
VideoPlayer.displayName = 'VideoPlayer';


interface ServiceProps extends IServicePattern {
  poster?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
  id?: string;
}

export const Service = memo<ServiceProps>(({
  title,
  description,
  features = [],
  details = [],
  video,
  poster,
  ctaText = "Записаться онлайн",
  ctaLink = "/booking",
  className = "",
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);


  const featuresList = useMemo(() =>
    features.map((item, index) => (
      <li key={`feature-${index}`} className={s.listItem}>
        <CheckIcon />
        <span className={s.itemText}>{item}</span>
      </li>
    )),
    [features]
  );

  const detailsList = useMemo(() =>
    details.map((item, index) => (
      <li key={`detail-${index}`} className={s.detailItem}>
        {item}
      </li>
    )),
    [details]
  );

  return (
    <section
      id={id}
      className={`${s.service} ${isHovered ? s.serviceHovered : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`Услуга: ${title}`}
    >
      <div className={s.container}>
        <div className={s.mediaBlock}>
          <header className={s.header}>
            <h2 className={s.title}>{title}</h2>
            {description && (
              <p className={s.subtitle}>{description}</p>
            )}
          </header>

          {video && (
            <div className={s.videoContainer}>
              <VideoPlayer src={video} poster={poster} />
            </div>
          )}
        </div>

        <div className={s.infoBlock}>
          {features.length > 0 && (
            <>
              <h3 className={s.infoTitle}>Что включено:</h3>
              <ul className={s.includedList}>
                {featuresList}
              </ul>
            </>
          )}

          {details.length > 0 && (
            <ul className={s.detailsList}>
              {detailsList}
            </ul>
          )}

          <Link
            href={ctaLink}
            className={`${s.bookingLink} ${isHovered ? s.bookingLinkHovered : ''}`}
            aria-label={`Записаться на ${title}`}
          >
            <span>{ctaText}</span>
            <span className={s.arrowIcon} aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
});

Service.displayName = 'Service';

export { CheckIcon, VideoPlayer };