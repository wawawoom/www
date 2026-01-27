import type { Meta, StoryObj } from "@storybook/react";

import { WuiText } from "./WuiText/WuiText";
import { WuiTextAs, WuiTextSize, WuiTextWeight } from "./WuiText/WuiText.props";
import { WuiTitle } from "./WuiTitle/WuiTitle";
import { WuiTitleAs, WuiTitleLook } from "./WuiTitle/WuiTitle.props";

const meta = {
  title: "Components/Typography",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const DocumentExample: Story = {
  render: () => (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H1}>
        Exemple de document complet
      </WuiTitle>

      <WuiText size={WuiTextSize.L} as={WuiTextAs.P}>
        Ceci est une introduction en taille L qui présente le sujet principal du
        document.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H2}>
        Section principale
      </WuiTitle>

      <WuiText size={WuiTextSize.M} as={WuiTextAs.P}>
        Ce paragraphe utilise la taille M, qui est la taille par défaut pour le
        corps de texte. Il offre une lisibilité optimale pour les contenus
        longs.
      </WuiText>

      <WuiText as={WuiTextAs.P}>
        Un deuxième paragraphe pour illustrer la continuité du texte et montrer
        comment plusieurs paragraphes s'enchaînent dans un document structuré.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H3} look={WuiTitleLook.H3}>
        Sous-section avec différents formats
      </WuiTitle>

      <WuiText weight={WuiTextWeight.BOLD} as={WuiTextAs.P}>
        Ce texte est en gras pour mettre en évidence un point important.
      </WuiText>

      <WuiText as={WuiTextAs.P}>
        Et ce texte revient à la normale pour continuer le contenu.
      </WuiText>

      <WuiText size={WuiTextSize.S} as={WuiTextAs.P}>
        Ce texte plus petit peut être utilisé pour des notes ou des informations
        complémentaires.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H4} look={WuiTitleLook.H4}>
        Détails supplémentaires
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        Cette section utilise un titre H4 pour organiser le contenu de manière
        hiérarchique.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H5} look={WuiTitleLook.H5}>
        Point de détail
      </WuiTitle>

      <WuiText size={WuiTextSize.XS} as={WuiTextAs.P}>
        Un texte en XS pour des annotations ou des précisions mineures.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H6} look={WuiTitleLook.H6}>
        Note finale
      </WuiTitle>

      <WuiText size={WuiTextSize.XXS} as={WuiTextAs.P}>
        Une note très discrète en XXS pour compléter l'information.
      </WuiText>
    </div>
  ),
};
