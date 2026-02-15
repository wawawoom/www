import {
  WuiColorAlias,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
} from "@wawawoom/wui";

import Gallery from "../../../Gallery/Gallery";

export const UiModal = () => {
  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        color={WuiColorAlias.NEUTRAL_900}
        style={{ marginTop: 0 }}
      >
        UI/UX designer
      </WuiTitle>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XL}>
        My background in graphic arts enables me to design and implement clear,
        consistent, and user-centered web and mobile interfaces.
      </WuiText>

      <WuiText as={WuiTextAs.P}>
        From an early age, I developed a strong passion for graphic arts,
        beginning with drawing. Drawing taught me how to observe carefully,
        understand shapes, balance, and proportions, and translate ideas into
        clear visual forms. This foundation naturally evolved into painting,
        where I became particularly interested in applied arts and visual
        communication. Through painting, I learned how to use color, contrast,
        and composition intentionally to convey meaning, guide attention, and
        evoke emotion—skills that are directly transferable to interface design.
      </WuiText>

      <WuiText as={WuiTextAs.P}>
        I also practice analog photography, which deepened my understanding of
        light, framing, texture, and storytelling. Beyond capturing images, I am
        especially interested in the development process itself, from film
        selection to chemical processing, as it requires precision, patience,
        and anticipation of the final result. This experience strengthened my
        sensitivity to detail and visual coherence. My interest later expanded
        into video, where I explored motion, rhythm, and narrative flow—concepts
        that are highly relevant when designing dynamic and interactive digital
        experiences.
      </WuiText>

      <WuiText as={WuiTextAs.P}>
        Today, these artistic foundations are integral to my work as a UI/UX
        designer. They enable me to imagine, sketch, and design thoughtful,
        user-centered interfaces with strong visual clarity and consistency.
        Combined with my technical expertise, I am able not only to design
        interfaces but also to implement them effectively for web and mobile
        platforms. This unique combination of artistic sensibility and technical
        execution allows me to create digital products that are both
        aesthetically refined and functionally robust.
      </WuiText>

      <WuiTitle as={WuiTitleAs.H2} className="mt-44">
        A few logos I designed over time
      </WuiTitle>

      <Gallery
        items={[
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Canyon d'ici et d'ailleurs",
            name: "Canyon d'ici et d'ailleurs",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Lena Payrouse avocate",
            name: "Avocat",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "CSS",
            name: "CSS design",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Photography",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Videos",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Painting",
          },
        ]}
      />

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_900}
        className="mt-44"
      >
        Some UI/UX designs
      </WuiTitle>

      <Gallery
        items={[
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Canyon d'ici et d'ailleurs",
            name: "Canyon d'ici et d'ailleurs",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Lena Payrouse avocate",
            name: "Avocat",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "CSS",
            name: "CSS design",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Photography",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Videos",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Painting",
          },
        ]}
      />

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_900}
        className="mt-44"
      >
        Pictures and paintings
      </WuiTitle>

      <Gallery
        items={[
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Canyon d'ici et d'ailleurs",
            name: "Canyon d'ici et d'ailleurs",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Lena Payrouse avocate",
            name: "Avocat",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "CSS",
            name: "CSS design",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Photography",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Videos",
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "UI",
            name: "Painting",
          },
        ]}
      />
    </>
  );
};
