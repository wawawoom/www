import { WuiButton, WuiText, WuiTextAs, WuiTextSize, WuiTitle, WuiTitleAs, WuiTitleLook } from "@wawawoom/wui";
import { Section } from "../ts/enum/section.enum";
import type { ZoneProps } from "./zone.props";

export const MeZone = (props: ZoneProps) => {
  const { onOpenModal } = props;

  return (
    <article>
      <img
        src="/img/nicolas-payrouse.webp"
        alt="Nicolas Payrouse"
        className="avatar"
      />

      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2}>
        Nicolas Payrouse
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        I eat JavaScript for breakfast, savor UI for lunch, and fall
        asleep thinking about my next UX challenge.
      </WuiText>

      <WuiText as={WuiTextAs.P} className="badges">
        <span className="badge">UI</span>
        <span className="badge">UX</span>
        <span className="badge">JavaScript</span>
        <span className="badge">Typescript</span>
        <span className="badge">HTML</span>
        <span className="badge">CSS</span>
        <span className="badge">NextJs</span>
        <span className="badge">React</span>
        <span className="badge">React Native</span>
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XS}>
        📍 357 Chemin de Saquier - 06200 Nice
        <br />
        📱 wawawoom[@]gmail.com / 06 31 796 781
        <br />
        👨 Né le 5 Décembre 1978, marié, deux enfants.
        <br />
        🇬🇧 French, english spoken and written.
        <br />
        🚗 Titulaire du permis B
      </WuiText>

      <WuiButton onClick={() => {
        onOpenModal(Section.ME);
      }}>See more</WuiButton>
    </article>
  );
}