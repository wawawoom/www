import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type Lamp from "../../interface/lamp.interface";
import Collection from "../Collection/Collection";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Modal from "../Modal/Modal";

const App = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lamps, setLamps] = useState<Lamp[]>([]);
  const featuredLamp = lamps.find((lamp) => lamp.isFeatured) ?? null;

  // Dérivé de l’URL : la modal est ouverte quand l’URL contient un slug valide
  const selectedLamp =
    slug && lamps.length > 0
      ? (lamps.find((l) => l.slug === slug) ?? null)
      : null;
  const isModalOpen = !!selectedLamp;

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}db/db.json`)
      .then((response) => response.json())
      .then((data) => {
        setLamps(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du db.json:", error);
      });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleOpenModal = (lamp: Lamp) => {
    navigate(`/project/${lamp.slug}`, { replace: false });
  };

  const handleCloseModal = () => {
    navigate("/", { replace: false });
  };

  return (
    <>
      <Header />

      <div id="main">
        {featuredLamp && (
          <Hero lamp={featuredLamp} onOpenModal={handleOpenModal} />
        )}
      </div>

      {lamps.length > 0 && (
        <Collection lamps={lamps} onOpenModal={handleOpenModal} />
      )}

      <Modal
        lamp={selectedLamp}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default App;
