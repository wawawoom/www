import { useEffect, useMemo, useRef, useState } from "react";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiColorAlias,
  WuiLink,
  WuiLinkColor,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTextWeight,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import type Lamp from "../../interface/lamp.interface";
import "./Modal.css";

interface ModalProps {
  lamp: Lamp | null;
  isOpen: boolean;
  onClose: () => void;
}

interface MediaItem {
  type: "video" | "image";
  src: string;
  alt?: string;
}

const Modal = ({ lamp, isOpen, onClose }: ModalProps) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const lampVideoSrc = lamp?.video?.desktop;

  const mediaList = useMemo<MediaItem[]>(() => {
    if (!lamp) return [];

    const medias: MediaItem[] = [];

    // Ajouter la vidéo en premier si elle existe
    if (lampVideoSrc) {
      medias.push({
        type: "video",
        src: lampVideoSrc,
      });
    }

    // Ajouter toutes les images
    if (lamp.images && lamp.images.length > 0) {
      lamp.images.forEach((image) => {
        medias.push({
          type: "image",
          src: image,
          alt: `${lamp.name} - Image`,
        });
      });
    }

    return medias;
  }, [lamp, lampVideoSrc]);

  // Réinitialiser l'index quand la modal s'ouvre ou que le lamp change
  useEffect(() => {
    if (isOpen && lamp) {
      setSelectedMediaIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, lamp?.id]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = carouselRef.current;

    if (!container) return;

    // Initial check
    updateScrollButtons();

    // Listen to scroll events
    container.addEventListener("scroll", updateScrollButtons);

    // Listen to resize events
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [mediaList]);

  if (!isOpen || !lamp || mediaList.length === 0) {
    return null;
  }

  const selectedMedia = mediaList[selectedMediaIndex];

  const handleThumbnailClick = (index: number) => {
    setSelectedMediaIndex(index);
  };

  const getScrollAmount = (): number => {
    if (!carouselRef.current) return 0;

    const container = carouselRef.current;
    const firstThumbnail = container.querySelector(
      ".modal-thumbnail"
    ) as HTMLElement;

    if (!firstThumbnail) return 0;

    const thumbnailWidth = firstThumbnail.offsetWidth;
    const gap = parseFloat(
      getComputedStyle(container).getPropertyValue("gap") || "12"
    );

    // Scroller de 3 miniatures à la fois
    return thumbnailWidth * 3 + gap * 3;
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-media-container">
          {selectedMedia.type === "video" ? (
            <video
              src={selectedMedia.src}
              controls
              className="modal-media"
              key={selectedMediaIndex}
            />
          ) : (
            <img
              src={selectedMedia.src}
              alt={selectedMedia.alt || lamp.name}
              className="modal-media"
              key={selectedMediaIndex}
            />
          )}
        </div>

        <div className="modal-body">
          {mediaList.length > 1 && (
            <div className="modal-images-wrapper">
              <button
                className="modal-nav modal-nav-prev"
                onClick={scrollLeft}
                data-active={canScrollLeft}
              >
                ‹
              </button>

              <div className="modal-images" ref={carouselRef}>
                {mediaList.map((media, index) => (
                  <div
                    key={index}
                    className={`modal-thumbnail ${
                      index === selectedMediaIndex ? "active" : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    {media.type === "video" ? (
                      <video
                        src={media.src}
                        muted
                        className="modal-thumbnail-media"
                      />
                    ) : (
                      <img
                        src={media.src}
                        alt={
                          media.alt || `${lamp.name} - Thumbnail ${index + 1}`
                        }
                        className="modal-thumbnail-media"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                className="modal-nav modal-nav-next"
                onClick={scrollRight}
                data-active={canScrollRight}
              >
                ›
              </button>
            </div>
          )}

          <div className="modal-title-wrapper">
            <WuiTitle
              as={WuiTitleAs.H1}
              look={WuiTitleLook.H2}
              color={WuiColorAlias.NEUTRAL_0}
              className="modal-title"
            >
              {lamp.name}
            </WuiTitle>

            {lamp?.tags && lamp?.tags?.length > 0 && (
              <div className="tags">
                {lamp.tags.map((tag) => (
                  <WuiBadge
                    className="tag"
                    color={WuiBadgeColor.SUCCESS}
                    key={tag}
                  >
                    {tag}
                  </WuiBadge>
                ))}
              </div>
            )}
          </div>

          {lamp.description && (
            <WuiText
              as={WuiTextAs.P}
              size={WuiTextSize.L}
              color={WuiColorAlias.NEUTRAL_0}
              className="modal-description"
              dangerouslySetInnerHTML={{ __html: lamp.description }}
            />
          )}

          {lamp.details && (
            <WuiText
              as={WuiTextAs.P}
              color={WuiColorAlias.NEUTRAL_200}
              weight={WuiTextWeight.LIGHT}
              className="modal-details"
              dangerouslySetInnerHTML={{ __html: lamp.details }}
            />
          )}

          {lamp?.technic && lamp.technic.length > 0 && (
            <>
              <WuiTitle
                as={WuiTitleAs.H3}
                look={WuiTitleLook.H5}
                color={WuiColorAlias.NEUTRAL_0}
                className="modal-technic-title wui-mb-20"
              >
                Caractéristiques techniques
              </WuiTitle>

              <ul className="modal-technic">
                {lamp.technic.map((tech, index) => (
                  <li key={index}>
                    <WuiText
                      as={WuiTextAs.SPAN}
                      color={WuiColorAlias.NEUTRAL_100}
                      weight={WuiTextWeight.LIGHT}
                    >
                      {tech}
                    </WuiText>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* {lamp.price !== undefined && lamp.price > 0 && (
            <div className="modal-price">{lamp.price} €</div>
          )} */}

          <WuiLink
            href={`mailto:wawawoodstudio@gmail.com?subject=${encodeURIComponent(
              lamp.name
            )}`}
            color={WuiLinkColor.SECONDARY}
            target="_blank"
            rel="noreferrer"
          >
            Envoyer un message
          </WuiLink>
        </div>
      </div>
    </div>
  );
};

export default Modal;
