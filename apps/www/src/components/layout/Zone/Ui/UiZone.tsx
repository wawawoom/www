import { useState } from "react";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiButton,
  WuiButtonColor,
  WuiColorAlias,
  WuiLink,
  WuiLinkColor,
  WuiModal,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { Section } from "../../../../ts/enum/section.enum";

export const UiZone = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;

  const [openTestModal, setOpenTestModal] = useState(false);

  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2}>
        UI / UX designer
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        My background in graphic arts enables me to design and implement clear,
        consistent, and user-centered web and mobile interfaces.
      </WuiText>

      <WuiText as={WuiTextAs.P} className="badges">
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          Figma
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          CSS
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          Illustrator
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          Photoshop
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          Photography
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          Painting
        </WuiBadge>
      </WuiText>

      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_900}
        size={WuiTextSize.S}
      >
        My passion for graphic arts began with drawing and naturally evolved
        into painting, where I developed a strong interest in applied arts and
        visual communication. These disciplines taught me how to use
        composition, color, contrast, and visual balance to convey meaning
        effectively. I also practice analog photography, which deepened my
        understanding of light, framing, and attention to detail, as well as the
        discipline required by the film development process. My interest later
        expanded into video, where I explored motion and visual storytelling.
        Today, these artistic foundations are central to my work as a UI/UX
        designer, enabling me to imagine, sketch, and design clear, consistent,
        and user-centered interfaces, and to implement them effectively for web
        and mobile platforms by combining visual sensitivity with technical
        precision.
      </WuiText>

      <WuiLink
        href="/ui"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.UI);
        }}
      >
        Let’s dive in
      </WuiLink>

      <WuiModal
        open={openTestModal}
        onClose={() => setOpenTestModal(false)}
        title="Modal title"
        footer={
          <WuiButton
            color={WuiButtonColor.DARK}
            onClick={() => setOpenTestModal(false)}
          >
            Close
          </WuiButton>
        }
      >
        <WuiText as={WuiTextAs.P}>Your content here.</WuiText>
      </WuiModal>
    </>
  );
};
