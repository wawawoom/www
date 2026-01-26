import { useEffect } from "react";

import {
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { navigateTo, useLocation } from "../hooks/useLocation.ts";

const Home = () => {
  // Détecter les changements d'URL et déclencher une action
  const currentPath = useLocation((pathname) => {
    // Action déclenchée à chaque changement d'URL
    console.log("URL changée vers:", pathname);

    // Exemple d'actions que vous pouvez faire ici :
    if (pathname === "/me") {
      console.log("Action spécifique pour /me");
      // Ajoutez votre logique ici (animation, scroll, etc.)
    } else if (pathname === "/") {
      console.log("Action spécifique pour /");
      // Ajoutez votre logique ici
    }
  });

  // Exemple : déclencher une action au montage du composant
  useEffect(() => {
    console.log("URL actuelle au montage:", currentPath);
  }, [currentPath]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Utiliser la fonction navigateTo qui déclenche automatiquement l'événement
    navigateTo("/nico");
  };
  return (
    <div id="app">
      <div className="container">
        <div className="zone me">
          <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H6}>
            nico.
          </WuiTitle>

          <article>
            <img
              src="/img/nicolas-payrouse.webp"
              alt="Nicolas Payrouse"
              className="avatar"
            />
            <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2}>
              Nicolas Payrouse
            </WuiTitle>

            <WuiText as={WuiTextAs.P}>
              I eat JavaScript for breakfast, savor UI for lunch, and fall
              asleep thinking about my next UX challenge.
            </WuiText>

            <WuiText as={WuiTextAs.P} className="badges">
              <span className="badge">UI</span>
              <span className="badge">UX</span>
              <span className="badge">JavaScript</span>
              <span className="badge">Typescript</span>
              <span className="badge">HTML</span>
              <span className="badge">CSS</span>
              <span className="badge">NextJs</span>
              <span className="badge">React</span>
              <span className="badge">React Native</span>
            </WuiText>

            <WuiText as={WuiTextAs.P} size={WuiTextSize.XS}>
              📍 357 Chemin de Saquier - 06200 Nice
              <br />
              📱 wawawoom[@]gmail.com / 06 31 796 781
              <br />
              👨 Né le 5 Décembre 1978, marié, deux enfants.
              <br />
              🇬🇧 French, english spoken and written.
              <br />
              🚗 Titulaire du permis B
            </WuiText>

            <a href="/nico" className="btn" onClick={handleLinkClick}>
              See more
            </a>
          </article>
        </div>

        <div className="zone ui">
          <h2>u(i/x).</h2>
          <article>
            <h1>UI / UX designer</h1>
            <p>
              Graphiste de formation, je me suis rapidement tourné vers le
              développement web, car je souhaitais en tant que webmaster à mon
              compte ne pas dépendre d'un développeur pour créer ma société.
              Après de longues nuits à apprendre les bases du développement web,
              j'ai pu créer tout d'abord des sites vitrines très simples, puis
              de plus en plus complexes. Adobe Flash a été une grande révélation
              à l'époque, je pouvais enfin concilier mes idées graphiques et
              l'interaction que nécessitait un site web original et attractif.
              Rapidement je parlais l'ActionScript 3 en deuxième langue :) Je me
              souviens encore parfaitement de l'annonce de Steve Jobs lors de la
              présentation de l'iPhone 1. « All the web on a smartphone »… Pas
              vraiment, il venait de tuer la technologie Flash…
            </p>
          </article>
        </div>

        <div className="zone web">
          <h2>web.</h2>
          <article>
            <h1>React developper</h1>
            <p>
              Je me suis donc tourné vers le développement Javascript natif et
              jQuery. Le projet sur lequel je travaillais à ce moment-là,
              nécessitait une interface responsive pour les navigateurs web
              mobiles. Les media-queries et Bootstrap n'avaient alors plus de
              secrets pour moi. Mais… Il est évident que ce n'était pas une
              solution parfaite. Le développement natif procurait de meilleures
              performances UX. Il a alors fallu attendre la sortie de React
              Native pour que je trouve mon Graal. Développement JS mais
              performances très proches du Natif ! Et cerise sur le gâteau, un
              seul code pour iOs et Android. Je plonge alors corps et âme dans
              ce framework en créant deux apps mobiles (en production) en
              étroite collaboration avec deux développeurs backend qui me
              fournissent l'accès aux données au travers d'API Rest et GraphQL.
              En parallèle je m'occupe de la UI / UX et du développement
              Front-end de la webapp associée à l'app mobile.
            </p>
          </article>
        </div>

        <div className="zone mobile">
          <h2>mob.</h2>

          <article>
            <h1>React Native developper</h1>
            <p>I'm a mobile React Native developper</p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Home;
