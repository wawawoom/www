import { useTranslation } from "react-i18next";

import {
  WuiBadgeColor,
  WuiBadgeSize,
  WuiColorValue,
  WuiLink,
  WuiLinkColor,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { useTheme } from "../../context/ThemeContext";
import { Section } from "../../ts/enum/section.enum";
import { Badges } from "../Badges/Badges";

export const PortfolioZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;
  const { t } = useTranslation();

  const { theme, getWhiteColor } = useTheme();

  const badgeConfiguration = {
    color: WuiBadgeColor.TRANSPARENT,
    textColor: WuiColorValue.BLUE_0,
    size: WuiBadgeSize.M,
  };

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        look={WuiTitleLook.H2}
        color={getWhiteColor()}
      >
        {t("portfolioZone.title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()}>
        {t("portfolioZone.intro")}
      </WuiText>

      <Badges
        badges={[
          {
            ...badgeConfiguration,
            label: t("designSystemZone.designTokens"),
          },
        ]}
      />

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H4}>
        Smood
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        Development of a large-scale front-end e-commerce platform (Next.js /
        TypeScript)
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul className="wui-ma-0">
          <li>
            Conception, maintenance et évolutions d'un design système Smood en
            React, utilisation cross projets (checkout, smoothie)
          </li>
          <li>Refonte checkout en react + utilisation de Snack</li>
          <li>
            Smood 2.0 : refonte du site web avec guidelines design + migration
            de la stack technique en next js (symphony / stencil avant)
          </li>
          <li>
            Gift card : Refonte de la page d'achat des gift cards + paiement
          </li>
          <li>Retail 2.0 : Refonte des pages dédiées aux commerces / migros</li>
        </ul>
      </WuiText>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H4}>
        GTL Studio
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        Development of mobile apps in React Native.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul className="wui-ma-0">
          <li>
            Création d'une app mobile React Native Eyescyou. Utilisation des
            features natives, telles que la caméra, le GPS, le localStorage etc.
            Communication en GraphQL avec le serveur.
          </li>
          <li>
            Reprise du code d'une app mobile React Native Totem, gestion de
            synchronisation de listes de contacts.
          </li>
        </ul>
      </WuiText>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H4}>
        Stent AI
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        Development of mobile apps in React Native and frontend website.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul>
          <li>
            Création d'une app mobile React Native Stent AI. Maquettes, UI et
            UX.
          </li>
          <li>
            Création d'une web app de gestion de campagnes de recrutement et de
            génération de leads sur LinkedIn. Recueil des besoins métiers,
            maquettes des écrans pour validation avec les différentes équipes
            basées en France et au Canada.
          </li>
          <li>
            Charte graphique, maquettes, UI et UX de l'application mobile
            développée en React Native. (React 16.8 Hooks)
          </li>
        </ul>
      </WuiText>

      <WuiTitle as={WuiTitleAs.H2} look={WuiTitleLook.H4}>
        Hoozin
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        Designed and implemented responsive interfaces for the Hoozin enterprise
        social network, with modular JavaScript architecture.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul>
          <li>
            Création d'un framework JavaScript modulaire pour le reseau social
            d'entreprise Hoozin. Utilisation de jQuery, HTML, CSS, JavaScript.
          </li>
          <li>
            Participation à la conception et à la mise en place d'un système de
            gestion de contenu.
          </li>
          <li>
            Création d'une app "Whiteboard" pour la collaboration en direct.
            Utilisation des WebSockets pour la communication en temps réel.
          </li>
          <li>
            Création d'une IDE pour le developpement de plugins. Utilisation de
            jQuery, HTML, CSS, JavaScript.
          </li>
          <li>
            Maquettes, UI et UX de tous les écrans et les apps internes à
            Hoozin.
          </li>
        </ul>
      </WuiText>

      <WuiLink
        href="/portfolio"
        color={theme === "dark" ? WuiLinkColor.PRIMARY : WuiLinkColor.SECONDARY}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.PORTFOLIO);
        }}
      >
        {t("portfolioZone.underTheHood")}
      </WuiLink>
    </>
  );
};
