import type Lamp from "../../interface/lamp.interface";
import LampCard from "../LampCard/LampCard";
import "./Collection.css";

interface CollectionProps {
  lamps: Lamp[];
  onOpenModal: (lamp: Lamp) => void;
}

const Collection = (props: CollectionProps) => {
  const { lamps, onOpenModal } = props;

  return (
    <section className="collection">
      <div className="collection-images">
        {lamps.map((lamp) => (
          <LampCard key={lamp.id} {...lamp} onOpenModal={onOpenModal} />
        ))}
      </div>
    </section>
  );
};

export default Collection;
