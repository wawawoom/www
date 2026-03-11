import type { ReactElement } from "react";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiColorAlias,
  WuiColorValue,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
} from "@wawawoom/wui";

import { useTheme } from "../../context/ThemeContext";
import "./Job.css";
import type { JobProps } from "./Job.props";

export const Job = (props: JobProps) => {
  const { logoUrl, companyName, duration, jobTitle, badges, description } =
    props;

  const { theme, getWhiteColor } = useTheme();

  const getDurationColor = (): WuiColorAlias => {
    return theme === "dark"
      ? WuiColorAlias.DANGER_700
      : WuiColorAlias.DANGER_100;
  };

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
          {Boolean(companyName) && (
            <WuiTitle
              as={WuiTitleAs.H4}
              style={{ margin: 0 }}
              color={getWhiteColor()}
            >
              {companyName}
            </WuiTitle>
          )}

          {Boolean(duration) && (
            <WuiText
              as={WuiTextAs.P}
              style={{ margin: 0 }}
              size={WuiTextSize.S}
              color={getDurationColor()}
            >
              {duration}
            </WuiText>
          )}
        </div>
      </header>

      <div className="content">
        {Boolean(jobTitle) && (
          <WuiTitle
            as={WuiTitleAs.H5}
            color={getWhiteColor()}
            style={{ margin: 0 }}
          >
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
                    style={{ color: WuiColorValue.PINK_0 }}
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

        {description ? (
          typeof description === "string" ? (
            <WuiText
              as={WuiTextAs.P}
              color={getWhiteColor()}
              className="description"
            >
              {description}
            </WuiText>
          ) : (
            <>{description}</>
          )
        ) : null}
      </div>
    </article>
  );
};
