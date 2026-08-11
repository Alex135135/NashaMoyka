"use client";

import { IServicePattern } from "@/types/types";
import s from "./Service.module.scss";
import Link from "next/link";
import { memo, useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";


const CheckIcon = memo(() => (
  <svg className={s.checkIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#4CAF50" />
    <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));
CheckIcon.displayName = 'CheckIcon';


const VideoPlayer = memo(({ src, poster }: { src: string; poster?: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => setIsLoading(false);
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className={s.videoError}>
        <span>Не удалось загрузить видео</span>
        {poster && (
          <Image
            src={poster}
            alt="Видео временно недоступно"
            width={800}
            height={450}
            className={s.fallbackImage}
          />
        )}
      </div>
    );
  }

  return (
    <div className={s.videoWrapper}>
      {isLoading && <div className={s.videoLoader}>Загрузка...</div>}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        loop
        className={isLoading ? s.videoHidden : s.videoVisible}
        preload="metadata"
      />
    </div>
  );
});
VideoPlayer.displayName = 'VideoPlayer';


export const Service = memo(({
  title,
  description,
  features,
  details,
  video,
  poster,
  ctaText = "Записаться онлайн",
  ctaLink = "/booking"
}: IServicePattern & {
  poster?: string;
  ctaText?: string;
  ctaLink?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <section
      className={`${s.service} ${isHovered ? s.serviceHovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={s.container}>

        <div className={s.mediaBlock}>
          <header className={s.header}>
            <h2 className={s.title}>{title}</h2>
            <p className={s.subtitle}>{description}</p>
          </header>

          <div className={s.videoContainer}>
            <VideoPlayer src={video} poster={poster} />
          </div>
        </div>


        <div className={s.infoBlock}>
          <h3 className={s.infoTitle}>Что включено:</h3>

          {features?.length > 0 && (
            <ul className={s.includedList}>
              {features.map((item, index) => (
                <li key={index} className={s.listItem}>
                  <CheckIcon />
                  <span className={s.itemText}>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {details?.length > 0 && (
            <ul className={s.detailsList}>
              {details.map((item, index) => (
                <li key={index} className={s.detailItem}>
                  {item}
                </li>
              ))}
            </ul>
          )}

          <Link
            href={ctaLink}
            className={`${s.bookingLink} ${isHovered ? s.bookingLinkHovered : ''}`}
          >
            {ctaText}
            <span className={s.arrowIcon}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
});

Service.displayName = 'Service';