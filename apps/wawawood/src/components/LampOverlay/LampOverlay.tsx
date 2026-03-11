import { useEffect, useRef, useState } from "react";

import type Lamp from "../../interface/lamp.interface";
import "./LampOverlay.css";

interface LampOverlayProps {
  lamp: Lamp;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onOpenModal: (lamp: Lamp) => void;
}

const LampOverlay = ({
  lamp,
  onMouseEnter,
  onMouseLeave,
  onOpenModal,
}: LampOverlayProps) => {
  const [position, setPosition] = useState<{
    left: number;
    bottom: number;
    width: number;
    height: number;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const cardElement = document.querySelector(
      `[data-lamp-id="${lamp.id}"]`
    ) as HTMLElement;

    if (!cardElement) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const rect = cardElement.getBoundingClientRect();
      setPosition({
        left: rect.left,
        bottom: window.innerHeight - rect.bottom,
        width: rect.width,
        height: rect.height,
      });
    };

    updatePosition();

    // Démarrer invisible puis activer l'animation après que le navigateur ait rendu l'élément
    setIsVisible(false);
    // Réinitialiser showVideo seulement quand on change de lamp
    setShowVideo(false);

    // Utiliser requestAnimationFrame pour s'assurer que l'élément est rendu avant l'animation
    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = requestAnimationFrame(() => {
        setIsVisible(true);
        animationFrameRef.current = null;
      });
    });

    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
    };
  }, [lamp.id]);

  // Afficher la vidéo après 1 seconde si elle existe
  useEffect(() => {
    if (isVisible && lamp.video && !showVideo) {
      videoTimeoutRef.current = setTimeout(() => {
        setShowVideo(true);
        videoTimeoutRef.current = null;
      }, 1000);

      return () => {
        if (videoTimeoutRef.current) {
          clearTimeout(videoTimeoutRef.current);
        }
      };
    }
    // Réinitialiser seulement si on change de lamp
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, lamp.video, lamp.id]);

  // Lancer la vidéo automatiquement quand elle est affichée
  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Erreur lors de la lecture de la vidéo:", error);
      });
    }
  }, [showVideo]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    setIsVisible(false);

    // Ne pas réinitialiser showVideo pour garder la vidéo
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      onMouseLeave();
      hideTimeoutRef.current = null;
    }, 300); // Durée de l'animation CSS
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Annuler le timeout de fermeture pour éviter que l'overlay disparaisse
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    onOpenModal(lamp);
  };

  if (!position) {
    return null;
  }

  return (
    <div
      className="lamp-overlay"
      data-visible={isVisible}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        left: `${position.left}px`,
        bottom: `${position.bottom}px`,
        width: `${position.width}px`,
      }}
    >
      <div className="lamp-overlay-media" onClick={handleClick}>
        <img
          src={lamp.images[0]}
          alt={lamp.name}
          className="lamp-overlay-image"
        />
        {lamp.video && (
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL || ""}/lamp/video/${lamp.video}`}
            className="lamp-overlay-video"
            data-visible={showVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </div>

      <div className="lamp-overlay-content">
        <h3 className="lamp-overlay-name">{lamp.name}</h3>

        <p className="lamp-overlay-description">{lamp.description}</p>

        <div className="lamp-overlay-footer">
          <button
            className="lamp-overlay-cta button-primary button-sm"
            onClick={handleClick}
          >
            Détails
          </button>

          {Boolean(lamp.tag) && (
            <span className="lamp-overlay-tag">{lamp.tag}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LampOverlay;
