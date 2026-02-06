import { WuiColorAlias, WuiLink, WuiLinkColor, WuiText, WuiTextAs, WuiTextSize } from "@wawawoom/wui";

import { Section } from "../../../../ts/enum/section.enum";

export const MobZone = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;

  return (
    <>
      <h1>React Native developper</h1>

      <WuiText as={WuiTextAs.P} className="description" color={WuiColorAlias.NEUTRAL_0} size={WuiTextSize.S}>
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

      <WuiLink
        href="/mob"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.MOB);
        }}
      >
        See more
      </WuiLink>
    </>
  );
};
