import { WuiBadge, WuiText, WuiTextAs } from "@wawawoom/wui";

import "./Badges.css";
import type { BadgesProps } from "./Badges.props";

export const Badges = (props: BadgesProps) => {
  const { badges } = props;

  if (!badges || !Array.isArray(badges) || badges?.length === 0) {
    return null;
  }

  return (
    <WuiText as={WuiTextAs.P} className="badges">
      {badges.map((badge, index) => (
        <WuiBadge
          key={`badge-${index}`}
          color={badge.color}
          size={badge.size}
          style={{ color: badge.textColor }}
        >
          {badge.label}
        </WuiBadge>
      ))}
    </WuiText>
  );
};
