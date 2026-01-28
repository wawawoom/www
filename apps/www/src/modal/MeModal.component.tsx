import { WuiText, WuiTextAs, WuiTitle, WuiTitleAs, WuiTextSize } from "@wawawoom/wui";

import { WuiColorAlias } from "@wawawoom/wui";
import styles from "./modal.module.css";

export const MeModal = () => {
  return (
    <div className={styles.layout}>
      <img
        src="/img/nicolas-payrouse.webp"
        alt="Nicolas Payrouse"
        className="avatar"
      />

      <WuiTitle as={WuiTitleAs.H1} color={WuiColorAlias.NEUTRAL_900}>
        Nicolas Payrouse
      </WuiTitle>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XXL} color={WuiColorAlias.SUCCESS_900}>
        I eat JavaScript for breakfast, savor UI for lunch, and fall
        asleep thinking about my next UX challenge.
      </WuiText>
    </div>
  );
}