import type Lamp from "../../interface/lamp.interface";
import LampCard from "../LampCard/LampCard";
import "./Collection.css";

interface CollectionProps {
  lamps: Lamp[];
  onOpenModal: (lamp: Lamp) => void;
  onLampOverlayVideoActiveChange?: (active: boolean) => void;
}

const Collection = (props: CollectionProps) => {
  const { lamps, onOpenModal, onLampOverlayVideoActiveChange } = props;

  return (
    <section className="collection">
      {lamps.map((lamp) => (
        <LampCard
          key={lamp.id}
          {...lamp}
          onOpenModal={onOpenModal}
          onLampOverlayVideoActiveChange={onLampOverlayVideoActiveChange}
        />
      ))}
    </section>
  );
};

export default Collection;
