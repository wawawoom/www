import { Section } from "../../../ts/enum/section.enum.ts";
import { MeZone } from "../Me/MeZone.tsx";
import { MobZone } from "../Mob/MobZone.tsx";
import { UiZone } from "../Ui/UiZone.tsx";
import { WebZone } from "../Web/WebZone.tsx";
import type { ZoneExpandedProps } from "./ZoneExpanded.props.ts";

export const ZoneExpanded = (props: ZoneExpandedProps) => {
  const { section, onOpenModal } = props;

  return (
    <article>
      {section === Section.ME && <MeZone onOpenModal={onOpenModal} />}
      {section === Section.UI && <UiZone onOpenModal={onOpenModal} />}
      {section === Section.WEB && <WebZone onOpenModal={onOpenModal} />}
      {section === Section.MOB && <MobZone onOpenModal={onOpenModal} />}
    </article>
  );
};
