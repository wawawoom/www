import { useState } from "react";

import {
  WuiButton,
  WuiButtonColor,
  WuiColorAlias,
  WuiLink,
  WuiLinkColor,
  WuiModal,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
} from "@wawawoom/wui";

import { getEnv } from "../../../../config/env.ts";
import { useModal } from "../../../../context/ModalContext";
import { Gallery } from "../../../Gallery/Gallery";

export const WebModal = () => {
  const { openDreamJobModal } = useModal();

  const [modalSourceCodeWebsiteIsOpen, setModalSourceCodeWebsiteIsOpen] =
    useState(false);
  const [modalStorybookIsOpen, setModalStorybookIsOpen] = useState(false);
  const [modalComponentsTestsIsOpen, setModalComponentsTestsIsOpen] =
    useState(false);

  const onClickDreamJob = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openDreamJobModal();
  };

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        color={WuiColorAlias.NEUTRAL_0}
        style={{ marginTop: 0 }}
      >
        Web developer
      </WuiTitle>

      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_0}
        size={WuiTextSize.XL}
      >
        I design and build scalable, user-centered websites using React and
        Next.js.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        My journey into web development began with a background in graphic
        design and a strong desire to build complete digital experiences
        independently. As a freelance webmaster, I realized early on that
        understanding development was essential to fully bring my ideas to life
        without relying on external developers. I progressively learned the
        foundations of web technologies, starting with simple websites and
        gradually moving toward more interactive and complex platforms. The
        emergence of Adobe Flash was a key moment for me, as it allowed me to
        combine visual design and interaction, and gave me my first real
        experience with programming through ActionScript 3.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        With the rise of smartphones and the sudden decline of Flash, I
        transitioned to modern web technologies, focusing on JavaScript,
        responsive design, and tools such as jQuery and Bootstrap. This
        evolution helped me better understand performance, adaptability, and
        cross-device user experience. I later discovered React and React Native,
        which offered an efficient way to build modern web and mobile
        applications using a shared technological foundation. I worked on
        production mobile applications in collaboration with backend developers,
        consuming REST and GraphQL APIs, while also contributing to UI/UX design
        and frontend implementation.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        Today, I work as a Frontend Developer using React, Next.js, and
        TypeScript to build the website of Smood.ch, a Swiss company that offers
        a meal delivery service. I have also contributed to the creation of a
        reusable component library documented with Storybook, helping improve
        consistency, maintainability, and development efficiency across
        projects. My combined experience in design and development allows me to
        approach problems from both perspectives and create interfaces that are
        both functional and visually coherent.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        My day-to-day stack at{" "}
        <WuiLink
          href="https://smood.ch"
          target="_blank"
          color={WuiLinkColor.NONE}
        >
          Smood
        </WuiLink>{" "}
        is primarily JavaScript and React, along with HTML and CSS (SASS). I
        place a strong emphasis on design, user experience, and pixel-perfect
        implementation. There, I have introduced and maintained testing
        practices: unit and component tests with Jest, and end-to-end tests with
        Cypress. I have also worked with WebSockets (Socket.io), optimized page
        loading performance—focusing on Core Web Vitals such as LCP, FCP, and
        CLS—and improved SEO through structured data. I design and build
        responsive interfaces from mobile to large screens.
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_0}
        className="mt-44"
      >
        And now?
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        As I am looking for new opportunities, I aim to specialize in the
        creation and implementation of design systems—from defining scalable,
        consistent systems in design tools to translating them into
        production-ready React component libraries documented with Storybook. My
        combined experience in design and development allows me to approach this
        from both perspectives and deliver interfaces that are both functional
        and visually coherent.{" "}
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

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_0}
        className="mt-44"
      >
        Let me show you
      </WuiTitle>

      <Gallery
        items={[
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Source code",
            name: "Source code",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              setModalSourceCodeWebsiteIsOpen(true);
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Smood Logo",
            name: "Smood website",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              // TODO: link to my storybook
              window.open("https://smood.ch/", "_blank");
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Storybook logo",
            name: "Wui component library",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              setModalStorybookIsOpen(true);
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Testing",
            name: "Components tests",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              // TODO: link to my components tests coverage
              window.open("https://storybook.js.org/", "_blank");
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Kalei logo",
            name: "Kalei",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              // TODO: link to my kalei website
              window.open(
                `${getEnv("VITE_DOMAIN_URL")}${getEnv("VITE_PROJECTS_PATH")}/kalei/`,
                "_blank"
              );
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "TicTac timetracker logo",
            name: "TicTac timetracker",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              // TODO: link to my tictac website
              window.open(
                `${getEnv("VITE_DOMAIN_URL")}${getEnv("VITE_PROJECTS_PATH")}/tictac/`,
                "_blank"
              );
            },
          },
        ]}
      />

      <WuiModal
        open={modalSourceCodeWebsiteIsOpen}
        onClose={() => setModalSourceCodeWebsiteIsOpen(false)}
        title="Please confirm"
        footer={
          <WuiButton
            color={WuiButtonColor.DARK}
            onClick={() => {
              window.open(
                "https://github.com/wawawoom/www/tree/master/apps/www",
                "_blank"
              );

              setModalSourceCodeWebsiteIsOpen(false);
            }}
          >
            Yes ! View on GitHub
          </WuiButton>
        }
      >
        <WuiText as={WuiTextAs.DIV}>
          I made this website with React, and the Wui component library. Would
          you like to see my source code ?
        </WuiText>
      </WuiModal>

      <WuiModal
        open={modalStorybookIsOpen}
        onClose={() => setModalStorybookIsOpen(false)}
        title="Make a choice"
        footer={
          <>
            <WuiButton
              color={WuiButtonColor.GHOST}
              onClick={() => {
                window.open(
                  "https://github.com/wawawoom/www/tree/master/libs/wui",
                  "_blank"
                );

                setModalStorybookIsOpen(false);
              }}
            >
              Source code
            </WuiButton>

            {/* TODO: link to my storybook */}
            <WuiButton
              color={WuiButtonColor.DARK}
              onClick={() => {
                window.open(
                  "https://github.com/wawawoom/www/tree/master/apps/www",
                  "_blank"
                );

                setModalStorybookIsOpen(false);
              }}
            >
              Storybook
            </WuiButton>
          </>
        }
      >
        <WuiText as={WuiTextAs.DIV}>
          I created a reusable React component library documented with
          Storybook. Would you like to see the storybook or see the source code
          of the component library ?
        </WuiText>
      </WuiModal>

      <WuiModal
        open={modalComponentsTestsIsOpen}
        onClose={() => setModalComponentsTestsIsOpen(false)}
        title="Make a choice"
        footer={
          <WuiButton
            color={WuiButtonColor.DARK}
            onClick={() => {
              {
                /* TODO: link to my test coverage  */
              }
              window.open(
                "https://github.com/wawawoom/www/tree/master/apps/www",
                "_blank"
              );

              setModalComponentsTestsIsOpen(false);
            }}
          >
            Yes, please !
          </WuiButton>
        }
      >
        <WuiText as={WuiTextAs.DIV}>
          Would you like to see the test results of the Wui component library
          components ?
        </WuiText>
      </WuiModal>
    </>
  );
};
