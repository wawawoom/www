import {
  WuiColorAlias,
  WuiLink,
  WuiLinkColor,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { Section } from "../../../../ts/enum/section.enum";

export const WebZone = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;

  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2} color={WuiColorAlias.NEUTRAL_0}>
        Web developper
      </WuiTitle>

      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_0}
        size={WuiTextSize.S}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </WuiText>

      <WuiLink
        href="/web"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.WEB);
        }}
      >
        See more
      </WuiLink>
    </>
  );
};
