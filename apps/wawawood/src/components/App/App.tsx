import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "@wawawoom/wui-css";

import type Lamp from "../../interface/lamp.interface";
import Collection from "../Collection/Collection";
import DataLoadError from "../DataLoadError/DataLoadError";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Modal from "../Modal/Modal";
import SocialMeta from "../SocialMeta/SocialMeta";

type DbLoadStatus = "loading" | "ready" | "error";

const App = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();
  const [dbLoadStatus, setDbLoadStatus] = useState<DbLoadStatus>("loading");
  const [dbLoadErrorMessage, setDbLoadErrorMessage] = useState<string>("");
  const [retryKey, setRetryKey] = useState<number>(0);

  const [lamps, setLamps] = useState<Lamp[]>([]);
  const [lampOverlayVideoActive, setLampOverlayVideoActive] =
    useState<boolean>(false);
  const featuredLamp = lamps.find((lamp) => lamp.isFeatured) ?? null;

  // Dérivé de l’URL : la modal est ouverte quand l’URL contient un slug valide
  const selectedLamp =
    slug && lamps.length > 0
      ? (lamps.find((l) => l.slug === slug) ?? null)
      : null;
  const isModalOpen = !!selectedLamp;

  useEffect(() => {
    const controller = new AbortController();

    const url = `${import.meta.env.BASE_URL}db/db.json`;

    fetch(url, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<unknown>;
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Format du catalogue invalide");
        }
        setLamps((data as Lamp[]).sort((a: Lamp, b: Lamp) => b.id - a.id));
        setDbLoadErrorMessage("");
        setDbLoadStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Erreur inconnue";

        setLamps([]);
        setDbLoadErrorMessage(message);
        setDbLoadStatus("error");
      });

    return () => controller.abort();
  }, [retryKey]);

  if (dbLoadStatus === "loading") {
    return <LoadingScreen />;
  }

  if (dbLoadStatus === "error") {
    return (
      <DataLoadError
        message={dbLoadErrorMessage}
        onRetry={() => {
          setDbLoadStatus("loading");
          setDbLoadErrorMessage("");
          setRetryKey((prev) => prev + 1);
        }}
      />
    );
  }

  const handleOpenModal = (lamp: Lamp) => {
    navigate(`/project/${lamp.slug}`, { replace: false });
  };

  const handleCloseModal = () => {
    navigate("/", { replace: false });
  };

  return (
    <>
      <SocialMeta lamp={selectedLamp} />

      <Header />

      <div id="main">
        {featuredLamp && (
          <Hero
            lamp={featuredLamp}
            onOpenModal={handleOpenModal}
            isModalOpen={isModalOpen}
            isLampOverlayVideoPlaying={lampOverlayVideoActive}
          />
        )}
      </div>

      {lamps.length > 0 && (
        <Collection
          lamps={lamps}
          onOpenModal={handleOpenModal}
          onLampOverlayVideoActiveChange={setLampOverlayVideoActive}
        />
      )}

      <Footer />

      <Modal
        lamp={selectedLamp}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default App;
