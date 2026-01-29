import { WuiLink, WuiLinkColor } from "@wawawoom/wui";

import { Section } from "../ts/enum/section.enum";
import type { ZoneProps } from "./zone.props";

export const MobZone = (props: ZoneProps) => {
  const { onOpenModal } = props;

  return (
    <article>
      <h1>React Native developper</h1>
      <p>I'm a mobile React Native developper</p>

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
    </article>
  );
};
