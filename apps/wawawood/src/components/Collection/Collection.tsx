import type Lamp from "../../interface/lamp.interface";
import LampCard from "../LampCard/LampCard";
import "./Collection.css";

interface CollectionProps {
  lamps: Lamp[];
  onOpenModal: (lamp: Lamp) => void;
  onLampOverlayVideoActiveChange?: (active: boolean) => void;
  hasUserInteracted: boolean;
}

const Collection = (props: CollectionProps) => {
  const {
    lamps,
    onOpenModal,
    onLampOverlayVideoActiveChange,
    hasUserInteracted,
  } = props;

  return (
    <section className="collection">
      {lamps.map((lamp) => (
        <LampCard
          key={lamp.id}
          {...lamp}
          onOpenModal={onOpenModal}
          onLampOverlayVideoActiveChange={onLampOverlayVideoActiveChange}
          hasUserInteracted={hasUserInteracted}
        />
      ))}
    </section>
  );
};

export default Collection;
