import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiLink,
  WuiLinkColor,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { useModal } from "../../../../context/ModalContext.ts";
import { Section } from "../../../../ts/enum/section.enum";
import SocialLinks from "../../../SocialLinks/SocialLinks";
import "./MeZone.css";

export const MeZone = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;
  const { openDreamJobModal } = useModal();

  const onClickDreamJob = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openDreamJobModal();
  };

  return (
    <>
      <WuiBadge
        size={WuiBadgeSize.L}
        color={WuiBadgeColor.WARNING}
        style={{
          marginLeft: "7rem",
          position: "absolute",
          top: "2rem",
          width: "max-content",
        }}
      >
        Open to work !
      </WuiBadge>

      <img
        src="/img/nicolas-payrouse.webp"
        alt="Nicolas Payrouse"
        className="avatar"
      />

      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2}>
        Nicolas Payrouse
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        I eat JavaScript for breakfast, savor UI for lunch, and fall asleep
        thinking about my next UX challenge. I’m currently actively seeking a
        new professional opportunity as a designer and React developer.{" "}
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

      <WuiText as={WuiTextAs.P} className="badges">
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          UI
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          UX
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          JavaScript
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          Typescript
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          HTML
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          CSS
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          NextJs
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          React
        </WuiBadge>

        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>
          React Native
        </WuiBadge>
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XS}>
        <i className="fa-regular fa-compass"></i> 357 Chemin de Saquier – 06200
        Nice, France
        <br />
        <i className="fa-regular fa-address-card"></i> wawawoom[@]gmail.com /
        +33 (0)6 31 796 781
        <br />
        <i className="fa-solid fa-people-roof"></i> Born 5 December 1978,
        married, two children.
        <br />
        <i className="fa-solid fa-language"></i> French and English: spoken and
        written.
        <br />
        <i className="fa-solid fa-car"></i> Full driving licence (Category B)
      </WuiText>

      <SocialLinks />

      <WuiLink
        href="/me"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.ME);
        }}
      >
        Check my work experience
      </WuiLink>
    </>
  );
};
