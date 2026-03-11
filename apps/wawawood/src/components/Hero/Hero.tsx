import type Lamp from "../../interface/lamp.interface";
import "./Hero.css";

const Hero = (props: { lamp: Lamp; onOpenModal: (lamp: Lamp) => void }) => {
  const { lamp, onOpenModal } = props;
  const { name, description, logo, video, images } = lamp;

  return (
    <>
      {video ? (
        <video
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

        <button
          className="hero-cta button-primary"
          onClick={() => onOpenModal(lamp)}
        >
          Détails
        </button>
      </div>
    </>
  );
};

export default Hero;
