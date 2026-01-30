import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiLink,
  WuiLinkColor,
  WuiLinkSize,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";
import { WuiColorAlias } from "@wawawoom/wui";

import { Job } from "../../Job/Job";

export const MeModal = () => {
  return (
    <>
      <img
        src="/img/nicolas-payrouse.webp"
        alt="Nicolas Payrouse"
        className="avatar"
      />

      <WuiTitle
        as={WuiTitleAs.H1}
        color={WuiColorAlias.NEUTRAL_900}
        style={{ marginBottom: 0 }}
      >
        Nicolas Payrouse
        <WuiBadge
          size={WuiBadgeSize.L}
          color={WuiBadgeColor.WARNING}
          style={{ marginLeft: "1rem", position: "relative", top: "-2rem" }}
        >
          Open to work !
        </WuiBadge>
      </WuiTitle>

      <WuiTitle
        as={WuiTitleAs.H2}
        look={WuiTitleLook.H5}
        color={WuiColorAlias.SUCCESS_900}
        style={{ marginBottom: "2rem" }}
      >
        Web Designer & Développeur front-end
      </WuiTitle>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XXL}>
        I eat JavaScript for breakfast, savor UI for lunch, and fall asleep
        thinking about my next UX challenge.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        Graphiste de formation, je me suis rapidement tourné vers le
        développement web, car je souhaitais en tant que webmaster à mon compte
        ne pas dépendre d'un développeur pour créer ma société. Après de longues
        nuits à apprendre les bases du développement web, j'ai pu créer tout
        d'abord des sites vitrines très simples, puis de plus en plus complexes.
        Adobe Flash a été une grande révélation à l'époque, je pouvais enfin
        concilier mes idées graphiques et l'interaction que nécessitait un site
        web original et attractif. Rapidement je parlais l'ActionScript 3 en
        deuxième langue :) Je me souviens encore parfaitement de l'annonce de
        Steve Jobs lors de la présentation de l'iPhone 1. « All the web on a
        smartphone »… Pas vraiment, il venait de tuer la technologie Flash…
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        Je me suis donc tourné vers le développement Javascript natif et jQuery.
        Le projet sur lequel je travaillais à ce moment-là, nécessitait une
        interface responsive pour les navigateurs web mobiles. Les media-queries
        et Bootstrap n'avaient alors plus de secrets pour moi. Mais… Il est
        évident que ce n'était pas une solution parfaite. Le développement natif
        procurait de meilleures performances UX. Il a alors fallu attendre la
        sortie de React Native pour que je trouve mon Graal. Développement JS
        mais performances très proches du Natif ! Et cerise sur le gâteau, un
        seul code pour iOs et Android. Je plonge alors corps et âme dans ce
        framework en créant deux apps mobiles (en production) en étroite
        collaboration avec deux développeurs backend qui me fournissent l'accès
        aux données au travers d'API Rest et GraphQL. En parallèle je m'occupe
        de la UI / UX et du développement Front-end de la webapp associée à
        l'app mobile.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        Actuellement je travaille pour Smood en tant que développeur front-end
        du site web dédié aux end users. Nous développons sur NextJs en
        TypeScript.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        Nicolas.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        Vous recherchez un développeur Web ou React Native Senior doté d'un sens
        du design et de l'expérience utilisateur ? Parlons en ! 06 31 796 781
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H3}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        Expériences professionnelles
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-smood.png"
        companyName="Smood"
        duration="Depuis Nov. 2021 ± 4 ans"
        jobTitle="Développeur Front-end &amp; Design system"
        badges={[
          "React",
          "NextJs",
          "HTML",
          "CSS / SASS",
          "Javascript",
          "Typescript",
          "Jest",
          "Cypress",
          "Git",
          "Storybook",
          "Web Responsive",
          "Web Performance",
          "Web SEO",
        ]}
        description="Développement du site web de la société Suise Smood.ch, spécialisée dans la commande et la livraison de repas, fleurs, courses... Site web responsive développé sur le framework NextJs en React et TypeScript. Développement de tests unitaires en Jest et tests e2e / composants avec Cypress. Développement d'une librairie de composants UI documentés avec Storybook."
      />

      <Job
        logoUrl="/img/job/logo-gtl.png"
        companyName="GTL Studio"
        duration="Nov. 2018 à Nov. 2021 ± 3 ans"
        jobTitle="Développeur mobile"
        badges={[
          "React native",
          "Firebase",
        ]}
        description="Développement d'une app mobile en React Native pour la société Eyescyou. Le développement de cette application m'a permis de toucher à différents domaines comme les Notifications Firebase, l'enregistrement et la diffusion de vidéos, la géolocalisation, le stockage de données en LocalStorage, appels vers une API graphQL, et des problématiques spécifiques liées à Android et / ou iOs..."
      />

      <Job
        logoUrl="/img/job/logo-stent.png"
        companyName="Stent AI"
        duration="Nov. 2018 à Nov. 2021 ± 3 ans"
        jobTitle="Graphiste & développeur front-end & mobile"
        badges={[
          "HTML",
          "CSS",
          "Javascript",
          "jQuery",
          "React native",
          "React",
          "Illustrator",
          "Photoshop",
        ]}
        description="Développement d'une web app de gestion de campagnes de recrutement et de génération de leads sur LinkedIn. Recueil des besoins métiers, maquettes des écrans pour validation avec les différentes équipes basées en France et au Canada. Framework maison à base de javascript natif et jQuery. Charte graphique, maquettes, UI et UX de l'application mobile développée en React Native. (React 16.8 Hooks)"
      />

      <Job
        logoUrl="/img/job/logo-hoozin.png"
        companyName="Hoozin"
        duration="Fév. 2012 à Nov. 2018 ± 6 ans"
        jobTitle="Graphiste & développeur front-end"
        badges={[
          "HTML",
          "CSS",
          "Javascript",
          "jQuery",
          "Responsive WebDesign",
          "React",
          "AngularJS",
          "WebSocket",
          "Illustrator",
          "Photoshop",
        ]}
        description="En tant que lead graphique, ma mission consiste à maquetter sur Illustrator chaque écran du réseau social d'entreprise hoozin, créé par Prexens en début d'année 2012. Chaque écran doit être étudié pour répondre aux différentes contraintes des terminaux sur lesquels le site sera consulté : écrans de bureau, tablettes et smartphones. J'ai également pour mission d'intégrer ces écrans en utilisant les standards actuels, le HTML, le CSS (Less), et le Javascript. Un des aspects importants de mon travail a été d'organiser le code JavaScript sous forme de modules pour proposer à d'autres développeurs de créer leurs propres applications dans l'app store de hoozin."
      />

      <Job
        logoUrl="/img/job/logo-wawawoom.png"
        companyName="WaWaWooM"
        duration="Avril 2005 à Juin 2012 ± 7 ans"
        jobTitle="Webmaster Freelance"
        badges={[
          "HTML",
          "CSS",
          "Javascript",
          "jQuery",
          "Flash / ActionScript 3",
          "PHP",
          "MySQL",
          "WordPress",
          "Illustrator",
          "Photoshop",
        ]}
        description={`Infographiste et développeur web freelance.
Création de sites internet statiques et dynamiques.
Réalisation de vidéos 3D.
Mise en place de solutions de gestion de bases de données Filemaker.
Création de charte graphique.
Solutions e-commerce.
Paiement en ligne.
Développement de projets personnels orientés Web.`}
      />

      <Job
        logoUrl="/img/job/logo-genghis-mind.png"
        companyName="Genghis Mind"
        duration="Mai 2003 à Avril 2005 ± 2 ans"
        jobTitle="Webmaster Freelance"
        badges={["Flash / ActionScript 3", "Illustrator", "Photoshop", "Filemaker"]}
        description={`Co-réalisateur d'un automate de distribution de denrées alimentaires ouvert 24/24. Projet à l'état de prototype. Responsable de l'interface de commande et du programme qui gère l'emplacement de chaque produit dans l'espace de stockage.`}
      />

      <Job
        logoUrl="/img/job/logo-jsshark.png"
        companyName="JS Shark"
        duration="Oct. 2002 à Avril 2003 ± 6 mois"
        jobTitle="Day trader"
        badges={["TradeStation", "Filemaker"]}
        description={`Gestion de portefeuille boursier, sur le marché américain (NASDAQ). Création de programmes de trading automatisés sur la plateforme TradeStation 7. Création d'une base de données Filemaker permettant de gérer les trades effectués.`}
      />

      <Job
        logoUrl="/img/job/logo-exhibit.png"
        companyName="Exhib'It"
        duration="Oct. 2002 à Avril 2003 ± 6 mois"
        jobTitle="Infographiste"
        badges={["Illustrator", "Photoshop"]}
        description={`Responsable de l'utilisation d'une imprimante grand format de type VUTEK. Calibrage couleurs, gestion RIP, impression grand et très grand format sur différents supports. Création graphique d'affiches grand format pour des sociétés comme TF1, Festival de Cannes, Citroën, Carrefour...`}
      />

      <Job
        logoUrl="/img/job/logo-design70.png"
        companyName="Design 70"
        duration="Fév. 2001 à Mars 2002 ± 1 an"
        jobTitle="Infographiste & Développeur Web"
        badges={["HTML", "CSS", "Javascript", "PHP", "Illustrator", "Photoshop", "Filemaker"]}
        description={`Gestion d'une interface web, destinée à vendre du mobilier de collection. Création et utilisation d'une base de données Filemaker Pro servant à suivre les demandes et les commandes des clients. Gestion automatisée des emails entrant par le site Web. Utilisation quotidienne de logiciels de création graphique de sites Web, Macromedia Dreamweaver & Flash.`}
      />

      <Job
        logoUrl="/img/job/logo-octo.png"
        companyName="Octo Communication"
        duration="Sept. 1998 à Déc. 2000 ± 2 ans"
        jobTitle="Infographiste"
        badges={["Illustrator", "Photoshop", "Filemaker"]}
        description={`Création graphique de dépliants publicitaires destinés à la vente par correspondance. Mise en place d'un système de gestion de commande client et de fabrication automatisé. Utilisation quotidienne de machines de découpe d'adhésifs de type SUMMAGRAPHICS, ainsi que d'une imprimante sur vinyle de type GERBER.`}
      />

      <WuiTitle
        as={WuiTitleAs.H3}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        Compétences
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-graphisme.jpg"
        companyName="UI / UX"
        jobTitle="Graphiste"
        badges={["Figma", "Illustrator", "Photoshop", "UI / UX", "Wireframes", "Prototyping"]}
        description={<>Maîtrise complète des outils de création graphique Adobe (Illustrator, Photoshop) pour la conception d'interfaces utilisateur modernes et intuitives. Spécialisé dans la création de wireframes, maquettes haute-fidélité et prototypes interactifs. Approche centrée utilisateur avec une attention particulière aux détails et à l'expérience utilisateur optimale sur tous les supports (desktop, tablette, mobile).<br /><br /><WuiLink href="/ui" color={WuiLinkColor.LIGHT} size={WuiLinkSize.S}>En savoir plus</WuiLink></>}
      />

      <Job
        logoUrl="/img/job/logo-dev.jpg"
        companyName="Web"
        jobTitle="Développeur web"
        badges={["HTML",
          "CSS",
          "Javascript",
          "React",
          "NextJs",
          "Typescript",
          "Jest",
          "Cypress",
          "Canvas",
          "SVG",
          "Bootstrap",
          "Git",
          "Storybook",
          "Web Responsive"]}
        description={<>Développement d'applications web modernes avec React, Next.js et TypeScript. Expertise en HTML5, CSS3 (SASS/LESS) et JavaScript ES6+ pour créer des interfaces utilisateur performantes et responsives. Maîtrise des outils de test (Jest, Cypress), de versioning (Git) et de documentation (Storybook). Optimisation des performances web, SEO et accessibilité. Expérience avec Canvas, SVG et les technologies web avancées.<br /><br /><WuiLink href="/web" color={WuiLinkColor.LIGHT} size={WuiLinkSize.S}>En savoir plus</WuiLink></>}
      />

      <Job
        logoUrl="/img/job/logo-dev-mobile.jpg"
        companyName="Mobile"
        jobTitle="Développeur mobile"
        badges={["React Native", "Firebase"]}
        description={<>Développement d'applications mobiles cross-platform avec React Native pour iOS et Android. Intégration de services Firebase (authentification, base de données, notifications push, analytics). Gestion des fonctionnalités natives (caméra, géolocalisation, stockage local) et optimisation des performances. Publication sur les stores Apple et Google Play avec suivi des métriques et mises à jour continues.<br /><br /><WuiLink href="/mob" color={WuiLinkColor.LIGHT} size={WuiLinkSize.S}>En savoir plus</WuiLink></>}
      />

      <WuiTitle
        as={WuiTitleAs.H3}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        Cursus scolaire
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-arenes.jpg"
        companyName="BTS"
        duration="Juin 1998"
        jobTitle="Étudiant en Communication visuelle"
        description="Mention assez bien"
      />

      <Job
        logoUrl="/img/job/logo-ltgc.jpg"
        companyName="Baccalauréat F12"
        duration="Juin 1996"
        jobTitle="Étudiant en Arts Appliqués"
        description="Mention bien"
      />
    </>
  );
};
