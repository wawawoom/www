import { WuiLink, WuiLinkColor } from "@wawawoom/wui";

import { Section } from "../../../ts/enum/section.enum";

export const UiZone = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;

  return (
    <article>
      <h1>UI / UX designer</h1>

      <p>
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
      </p>

      <WuiLink
        href="/ui"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.UI);
        }}
      >
        See more
      </WuiLink>
    </article>
  );
};
