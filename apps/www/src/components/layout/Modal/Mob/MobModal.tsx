import {
  WuiColorAlias,
  WuiLink,
  WuiLinkColor,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
} from "@wawawoom/wui";

import { useModal } from "../../../../context/ModalContext";
import Gallery from "../../../Gallery/Gallery";

export const MobModal = () => {
  const { openDreamJobModal } = useModal();

  const onClickDreamJob = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openDreamJobModal();
  };

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        color={WuiColorAlias.NEUTRAL_0}
        style={{ marginTop: 0 }}
      >
        React Native developer
      </WuiTitle>

      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_0}
        size={WuiTextSize.XL}
      >
        I design and build scalable, user-centered mobile applications using the
        React Native framework.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        Back in 2012, I was working on the Hoozin website and got to experiment
        with responsive web design for mobile browsers, using JavaScript,
        jQuery, media queries and Bootstrap. I quickly saw the limits of that
        approach: it was not a perfect solution, and native development still
        offered a better user experience.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        Later, on other projects, I was able to work with React Native and see
        how well the framework fit my needs. I could keep using a technology I
        already knew—React—and deliver both an iOS and an Android app from a
        single codebase, with performance close to native. I committed fully to
        it and made it my main focus for building mobile products.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        I shipped two production mobile apps in close collaboration with two
        backend developers, who exposed data through REST and GraphQL APIs,
        while I was responsible for the UI/UX and frontend development of the
        web app associated with the mobile apps.
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_0}
        className="mt-44"
      >
        And now?
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        As I am looking for new opportunities, I aim to specialize in the
        creation and implementation of design systems—from defining scalable,
        consistent systems in design tools to translating them into
        production-ready React component libraries documented with Storybook. My
        combined experience in design and development allows me to approach this
        from both perspectives and deliver interfaces that are both functional
        and visually coherent.{" "}
        <WuiLink
          href="#"
          onClick={(e) => {
            e.stopPropagation();
            onClickDreamJob(e);
          }}
          color={WuiLinkColor.NONE}
        >
          Check my ideal role description.
        </WuiLink>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_0}
        className="mt-44"
      >
        Let me show you
      </WuiTitle>

      <Gallery
        items={[
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Eyescyou",
            name: "Eyescyou",
            textColor: WuiColorAlias.NEUTRAL_0,
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Stent AI",
            name: "Stent AI",
            textColor: WuiColorAlias.NEUTRAL_0,
          },
        ]}
      />
    </>
  );
};
