import { useEffect, useRef } from "react";

import { WuiButton, WuiButtonColor, WuiButtonSize } from "@wawawoom/wui";

import type Lamp from "../../interface/lamp.interface";
import "./Hero.css";

const Hero = (props: {
  lamp: Lamp;
  onOpenModal: (lamp: Lamp) => void;
  isModalOpen: boolean;
}) => {
  const { lamp, onOpenModal, isModalOpen } = props;
  const { name, description, logo, video, images } = lamp;
  const videoRef = useRef<HTMLVideoElement>(null);
  const wasModalOpenRef = useRef(isModalOpen);

  const handleOpenDetails = () => {
    videoRef.current?.pause();
    onOpenModal(lamp);
  };

  useEffect(() => {
    const wasOpen = wasModalOpenRef.current;
    wasModalOpenRef.current = isModalOpen;
    if (wasOpen && !isModalOpen && video) {
      const el = videoRef.current;
      if (!el) return;
      void el.play().catch(() => {
        /* ignore: e.g. browser blocked before user gesture */
      });
    }
  }, [isModalOpen, video]);

  return (
    <>
      {video ? (
        <video
          ref={videoRef}
          src={`${video}`}
          autoPlay={true}
          muted={true}
          loop={true}
          className="hero-video"
        ></video>
      ) : (
        <img src={`${images[0]}`} alt={name} className="hero-image" />
      )}

      <div className="hero-content">
        {logo ? (
          <img src={logo} alt={name} className="hero-logo" />
        ) : (
          <h1 className="hero-name">{name}</h1>
        )}

        {description && <p className="hero-description">{description}</p>}

        <WuiButton
          className="hero-cta"
          color={WuiButtonColor.SECONDARY}
          size={WuiButtonSize.L}
          onClick={handleOpenDetails}
        >
          👁️ Détails
        </WuiButton>
      </div>
    </>
  );
};

export default Hero;
