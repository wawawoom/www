import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiColorAlias,
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

import { useModal } from "../../../../context/ModalContext.ts";
import { Section } from "../../../../ts/enum/section.enum.ts";
import SocialLinks from "../../../SocialLinks/SocialLinks.tsx";
import "./ProfileZone.css";

export const ProfileZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;
  const { openDreamJobModal } = useModal();

  const badgeColor = WuiBadgeColor.TRANSPARENT;
  const badgeTextColor = WuiColorValue.PINK_0;
  const badgeSize = WuiBadgeSize.M;

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

      <WuiTitle
        as={WuiTitleAs.H1}
        look={WuiTitleLook.H2}
        color={WuiColorAlias.NEUTRAL_0}
      >
        Nicolas Payrouse
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        I design and structure scalable UI systems that bridge product vision
        and frontend architecture.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        I operate at the intersection of design, engineering, and product
        strategy — ensuring that interfaces are not just visually coherent, but
        structurally sound and built to scale across teams and platforms.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        Currently open to opportunities where UI architecture and design systems
        are considered strategic assets within product-driven organizations.{" "}
        <WuiLink
          href="#"
          onClick={(e) => {
            e.stopPropagation();
            onClickDreamJob(e);
          }}
          color={WuiLinkColor.NONE}
        >
          Discover my ideal role
        </WuiLink>
        .
      </WuiText>

      <WuiText as={WuiTextAs.P} className="badges">
        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          UI
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          UX
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          JavaScript
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          Typescript
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          HTML
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          CSS
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          NextJs
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          React
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          React Native
        </WuiBadge>
      </WuiText>

      <WuiText
        as={WuiTextAs.P}
        size={WuiTextSize.XS}
        color={WuiColorAlias.NEUTRAL_0}
      >
        <i className="fa-regular fa-compass"></i> Nice, France
        <br />
        <i className="fa-regular fa-address-card"></i> wawawoom[@]gmail.com /
        +33 (0)6 31 796 781
        <br />
        <i className="fa-solid fa-people-roof"></i> Born 5 December 1978
        <br />
        <i className="fa-solid fa-language"></i> French and English: spoken and
        written.
        <br />
        <i className="fa-solid fa-car"></i> Full driving licence (Category B)
      </WuiText>

      <SocialLinks />

      <WuiLink
        href="/profile"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.PROFILE);
        }}
      >
        View professional experience
      </WuiLink>
    </>
  );
};
