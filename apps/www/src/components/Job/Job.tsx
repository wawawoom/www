import type { ReactElement } from "react";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiColorAlias,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
} from "@wawawoom/wui";

import "./Job.css";
import type { JobProps } from "./Job.props";

export const Job = (props: JobProps) => {
  const { logoUrl, companyName, duration, jobTitle, badges, description } =
    props;

  return (
    <article className="job">
      <header>
        <img
          src={logoUrl}
          alt={`Logo ${companyName}`}
          loading="lazy"
          width="80"
          height="80"
        />

        <div>
          <WuiTitle as={WuiTitleAs.H4} style={{ margin: 0 }}>
            {companyName}
          </WuiTitle>

          {Boolean(duration) && (
            <WuiText
              as={WuiTextAs.P}
              style={{ margin: 0 }}
              size={WuiTextSize.S}
              color={WuiColorAlias.SUCCESS_900}
            >
              {duration}
            </WuiText>
          )}
        </div>
      </header>

      <div className="content">
        {jobTitle && (
          <WuiTitle as={WuiTitleAs.H5} style={{ margin: 0 }}>
            {jobTitle}
          </WuiTitle>
        )}

        {badges && badges.length > 0 && (
          <div className="badges">
            {badges.map((badge: string | ReactElement) => {
              if (typeof badge === "string") {
                return (
                  <WuiBadge
                    key={`badge_${badge}`}
                    color={WuiBadgeColor.TRANSPARENT}
                    size={WuiBadgeSize.L}
                  >
                    {badge}
                  </WuiBadge>
                );
              } else {
                return badge;
              }
            })}
          </div>
        )}

        {description && (
          <WuiText as={WuiTextAs.P} className="description">
            {description}
          </WuiText>
        )}
      </div>
    </article>
  );
};
