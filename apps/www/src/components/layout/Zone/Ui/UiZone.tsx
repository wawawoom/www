import {
  WuiColorAlias,
  WuiLink,
  WuiLinkColor,
  WuiModal,
  WuiButton,
  WuiButtonColor,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { Section } from "../../../../ts/enum/section.enum";
import Gallery from "../../../Gallery/Gallery";
import { useState } from "react";

export const UiZone = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;

  const [openTestModal, setOpenTestModal] = useState(false);

  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2}>
        UI / UX designer
      </WuiTitle>



      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_900}
        size={WuiTextSize.S}
      >
        Trained as a graphic designer, I quickly turned to web development
        because as a freelance webmaster I did not want to depend on a developer
        to build my company. After many late nights learning the basics of web
        development, I was able to create first very simple showcase sites, then
        increasingly complex ones. Adobe Flash was a major revelation at the
        time—I could finally combine my graphic ideas with the interaction that
        an original and attractive website required. I soon spoke ActionScript 3
        as a second language :) I still remember Steve Jobs’s announcement at
        the iPhone 1 presentation. « All the web on a smartphone »… Not quite—he
        had just killed Flash technology…
      </WuiText>

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

      <h2>I'm passionate about :</h2>

      <Gallery
        items={[
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "UI",
            onClick: () => {
              setOpenTestModal(true);
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UX",
            name: "User XP",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "CSS",
            name: "CSS design",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Photography",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Videos",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Painting",
          },
        ]}
      />

      <WuiModal
        open={openTestModal}
        onClose={() => setOpenTestModal(false)}
        title="Modal title"
        footer={
          <WuiButton color={WuiButtonColor.DARK} onClick={() => setOpenTestModal(false)}>
            Close
          </WuiButton>
        }
      >
        <WuiText as={WuiTextAs.P}>Your content here.</WuiText>
      </WuiModal>
    </>
  );
};
