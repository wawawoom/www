import { WuiLink, WuiLinkColor } from "@wawawoom/wui";

import { Section } from "../../../ts/enum/section.enum";

export const WebZone = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;

  return (
    <>
      <h1>React developper</h1>

      <p>

      </p>

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
