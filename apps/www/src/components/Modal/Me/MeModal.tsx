import { useRef } from "react";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiButton,
  WuiButtonColor,
  WuiButtonSize,
  WuiLink,
  WuiLinkColor,
  WuiLinkSize,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";
import { WuiColorAlias } from "@wawawoom/wui";

import { Section } from "../../../ts/enum/section.enum";
import { Job } from "../../Job/Job";
import "./MeModal.css";

export const MeModal = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;

  const scrollTo = (ref: React.RefObject<HTMLHeadingElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const workExperienceRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLHeadingElement>(null);
  const personalProjectsRef = useRef<HTMLHeadingElement>(null);
  const educationRef = useRef<HTMLHeadingElement>(null);
  const butAlsoRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <div className="avatar-container">
        <WuiBadge
          size={WuiBadgeSize.L}
          color={WuiBadgeColor.WARNING}
          className="work-badge"
        >
          Open to work !
        </WuiBadge>

        <img
          src="/img/nicolas-payrouse.webp"
          alt="Nicolas Payrouse"
          className="avatar"
        />
      </div>

      <WuiTitle
        as={WuiTitleAs.H1}
        color={WuiColorAlias.NEUTRAL_900}
        className="name"
      >
        Nicolas Payrouse
      </WuiTitle>

      <WuiTitle
        as={WuiTitleAs.H2}
        look={WuiTitleLook.H5}
        color={WuiColorAlias.SUCCESS_900}
        className="job-title"
      >
        Web Designer & Front-end Developer
      </WuiTitle>

      <p className="links">
        <WuiLink
          href="https://www.linkedin.com/in/nicolas-payrouse-3016094/"
          target="_blank"
          size={WuiLinkSize.L}
          color={WuiLinkColor.NONE}
          title="Linkedin profile"
        >
          <i className="fa-brands fa-linkedin"></i>
        </WuiLink>

        <WuiLink
          href="https://github.com/wawawoom"
          target="_blank"
          size={WuiLinkSize.L}
          color={WuiLinkColor.NONE}
          title="GitHub profile"
        >
          <i className="fa-brands fa-github"></i>
        </WuiLink>

        <WuiLink
          href="mailto:wawawoom@gmail.com"
          target="_blank"
          size={WuiLinkSize.L}
          color={WuiLinkColor.NONE}
          title="Contact me by email"
        >
          <i className="fa-solid fa-envelope"></i>
        </WuiLink>

        <WuiLink
          href="tel:+33631796781"
          target="_blank"
          size={WuiLinkSize.L}
          color={WuiLinkColor.NONE}
          title="Contact me by phone"
        >
          <i className="fa-solid fa-mobile-screen-button"></i>
        </WuiLink>
      </p>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XXL} className="bio">
        I eat JavaScript for breakfast, savor UI for lunch, and fall asleep
        thinking about my next UX challenge.
      </WuiText>

      <p className="links" style={{ marginBottom: "3rem" }}>
        <WuiButton
          color={WuiButtonColor.LIGHT}
          size={WuiButtonSize.S}
          onClick={() => {
            scrollTo(workExperienceRef as React.RefObject<HTMLHeadingElement>);
          }}
          leftIcon="fa-solid fa-arrow-down"
        >
          Work Experience
        </WuiButton>

        <WuiButton
          color={WuiButtonColor.LIGHT}
          size={WuiButtonSize.S}
          onClick={() => {
            scrollTo(skillsRef as React.RefObject<HTMLHeadingElement>);
          }}
          leftIcon="fa-solid fa-arrow-down"
        >
          Skills
        </WuiButton>

        <WuiButton
          color={WuiButtonColor.LIGHT}
          size={WuiButtonSize.S}
          onClick={() => {
            scrollTo(
              personalProjectsRef as React.RefObject<HTMLHeadingElement>
            );
          }}
          leftIcon="fa-solid fa-arrow-down"
        >
          Personal projects
        </WuiButton>

        <WuiButton
          color={WuiButtonColor.LIGHT}
          size={WuiButtonSize.S}
          onClick={() => {
            scrollTo(educationRef as React.RefObject<HTMLHeadingElement>);
          }}
          leftIcon="fa-solid fa-arrow-down"
        >
          Education
        </WuiButton>

        <WuiButton
          color={WuiButtonColor.LIGHT}
          size={WuiButtonSize.S}
          onClick={() => {
            scrollTo(butAlsoRef as React.RefObject<HTMLHeadingElement>);
          }}
          leftIcon="fa-solid fa-arrow-down"
        >
          But also...
        </WuiButton>
      </p>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        Trained as a graphic designer, I quickly moved into web development
        because as a freelance webmaster I wanted to build my company without
        depending on a developer. After many late nights learning the basics of
        web development, I started by creating very simple showcase sites, then
        increasingly complex ones. Adobe Flash was a major revelation at the
        time: I could finally combine my design ideas with the interaction that
        an original, engaging website required. I soon spoke ActionScript 3 like
        a second language :) I still remember Steve Jobs’s announcement at the
        iPhone 1 keynote. “All the web on a smartphone”… Not quite—he had just
        killed Flash technology…
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        I therefore turned to native JavaScript and jQuery development. The
        project I was working on at the time required a responsive interface for
        mobile web browsers. Media queries and Bootstrap soon held no secrets
        for me. But… it was clear that this wasn’t a perfect solution. Native
        development delivered better UX performance. I had to wait for React
        Native to find my holy grail: JS development with performance close to
        native, and the icing on the cake—a single codebase for iOS and Android.
        I threw myself into this framework, building two mobile apps (now in
        production) in close collaboration with two backend developers who
        provide data access via REST and GraphQL APIs. In parallel, I handle the
        UI/UX and front-end development of the web app that goes with the mobile
        app.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        I currently work at Smood as a front-end developer on the website for
        end users. We develop with Next.js and TypeScript.
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        Are you looking for a Senior Web or React Native developer with a strong
        sense of design and user experience? Let’s talk! +33 6 31 796 781
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        Nicolas.
      </WuiText>

      <WuiTitle
        ref={workExperienceRef}
        as={WuiTitleAs.H3}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        Work Experience
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-smood.png"
        companyName="Smood"
        duration="Since Nov. 2021 (~4 years)"
        jobTitle="Front-end Developer &amp; Design system"
        badges={[
          "React",
          "NextJs",
          "HTML",
          "CSS / SASS",
          "Javascript",
          "Typescript",
          "Jest",
          "Cypress",
          "Git",
          "Storybook",
          "Web Responsive",
          "Web Performance",
          "Web SEO",
        ]}
        description={
          <>
            Development of the website for Swiss company Smood.ch, which
            specialises in ordering and delivery of meals, flowers, groceries
            and more. Responsive web app built with the Next.js framework in
            React and TypeScript. Unit testing with Jest and e2e/component
            testing with Cypress. Development of a documented UI component
            library with Storybook.{" "}
            <WuiLink
              href="https://smood.ch"
              target="_blank"
              color={WuiLinkColor.NONE}
            >
              https://smood.ch
            </WuiLink>
          </>
        }
      />

      <Job
        logoUrl="/img/job/logo-gtl.png"
        companyName="GTL Studio"
        duration="Nov. 2018 – Nov. 2021 (~3 years)"
        jobTitle="Mobile Developer"
        badges={["React native", "Firebase"]}
        description="Development of a React Native mobile app for Eyescyou. Building this app allowed me to work across several areas: Firebase notifications, video recording and streaming, geolocation, LocalStorage data persistence, GraphQL API integration, and Android and iOS-specific challenges."
      />

      <Job
        logoUrl="/img/job/logo-stent.png"
        companyName="Stent AI"
        duration="Nov. 2018 – Nov. 2021 (~3 years)"
        jobTitle="Graphic Designer & Front-end & Mobile Developer"
        badges={[
          "HTML",
          "CSS",
          "Javascript",
          "jQuery",
          "React native",
          "React",
          "Illustrator",
          "Photoshop",
        ]}
        description="Development of a web app for managing recruitment campaigns and generating leads on LinkedIn. Gathering business needs, wireframes for validation with different teams based in France and Canada. Home-made framework based on native JavaScript and jQuery. Graphic charter, wireframes, UI and UX of the mobile app developed in React Native. (React 16.8 Hooks)"
      />

      <Job
        logoUrl="/img/job/logo-hoozin.png"
        companyName="Hoozin"
        duration="Feb. 2012 – Nov. 2018 (~6 years)"
        jobTitle="Graphic Designer & Front-end Developer"
        badges={[
          "HTML",
          "CSS",
          "Javascript",
          "jQuery",
          "Responsive WebDesign",
          "React",
          "AngularJS",
          "WebSocket",
          "Illustrator",
          "Photoshop",
        ]}
        description="As graphic lead, my role was to design each screen of the hoozin enterprise social network (created by Prexens in early 2012) in Illustrator. Each screen had to be designed to meet the constraints of the devices on which the site would be viewed: desktop, tablets and smartphones. I was also responsible for implementing these screens using current standards: HTML, CSS (Less) and JavaScript. A key part of my work was organising the JavaScript code into modules so that other developers could build their own applications for the hoozin app store."
      />

      <Job
        logoUrl="/img/job/logo-wawawoom.png"
        companyName="WaWaWooM"
        duration="Apr. 2005 – Jun. 2012 (~7 years)"
        jobTitle="Webmaster Freelance"
        badges={[
          "HTML",
          "CSS",
          "Javascript",
          "jQuery",
          "Flash / ActionScript 3",
          "PHP",
          "MySQL",
          "WordPress",
          "Illustrator",
          "Photoshop",
        ]}
        description={`Freelance graphic designer and web developer.
Creation of static and dynamic websites.
3D video production.
Implementation of Filemaker database management solutions.
Brand identity and visual guidelines.
E-commerce solutions.
Online payment integration.
Development of web-oriented personal projects.`}
      />

      <Job
        logoUrl="/img/job/logo-genghis-mind.png"
        companyName="Genghis Mind"
        duration="May 2003 – Apr. 2005 (~2 years)"
        jobTitle="Developer and UI/UX Designer"
        badges={[
          "Flash / ActionScript 3",
          "Illustrator",
          "Photoshop",
          "Filemaker",
        ]}
        description={`Co-developer of a 24/7 food vending machine. Prototype-stage project. Responsible for the ordering interface and the programme managing the location of each product in the storage area.`}
      />

      <Job
        logoUrl="/img/job/logo-jsshark.png"
        companyName="JS Shark"
        duration="Oct. 2002 – Apr. 2003 (~6 months)"
        jobTitle="Day trader"
        badges={["TradeStation", "Filemaker"]}
        description={`Stock portfolio management on the US market (NASDAQ). Creation of automated trading programmes on the TradeStation 7 platform. Development of a Filemaker database to manage executed trades.`}
      />

      <Job
        logoUrl="/img/job/logo-exhibit.png"
        companyName="Exhib'It"
        duration="Oct. 2002 – Apr. 2003 (~6 months)"
        jobTitle="Graphic Designer"
        badges={["Illustrator", "Photoshop"]}
        description={`Responsible for operating a VUTEK large-format printer. Colour calibration, RIP management, large and extra-large format printing on various media. Graphic design of large-format posters for companies such as TF1, Cannes Film Festival, Citroën, Carrefour and others.`}
      />

      <Job
        logoUrl="/img/job/logo-design70.png"
        companyName="Design 70"
        duration="Feb. 2001 – Mar. 2002 (~1 year)"
        jobTitle="Graphic Designer & Web Developer"
        badges={[
          "HTML",
          "CSS",
          "Javascript",
          "PHP",
          "Illustrator",
          "Photoshop",
          "Filemaker",
        ]}
        description={`Management of a web interface for selling collectible furniture. Creation and use of a Filemaker Pro database to track customer enquiries and orders. Automated handling of incoming emails via the website. Daily use of web design software: Macromedia Dreamweaver & Flash.`}
      />

      <Job
        logoUrl="/img/job/logo-octo.png"
        companyName="Octo Communication"
        duration="Sep. 1998 – Dec. 2000 (~2 years)"
        jobTitle="Graphic Designer"
        badges={["Illustrator", "Photoshop", "Filemaker"]}
        description={`Graphic design of advertising leaflets for mail-order sales. Implementation of a customer order management and automated production system. Daily use of SUMMAGRAPHICS adhesive cutting machines and a GERBER vinyl printer.`}
      />

      <WuiTitle
        ref={skillsRef}
        as={WuiTitleAs.H3}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        Skills
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-graphisme.jpg"
        companyName="UI / UX"
        badges={[
          "Figma",
          "Illustrator",
          "Photoshop",
          "UI / UX",
          "Wireframes",
          "Prototyping",
        ]}
        description={
          <>
            Full command of Adobe design tools (Illustrator, Photoshop) for
            designing modern, intuitive user interfaces. Specialised in
            wireframes, high-fidelity mockups and interactive prototypes.
            User-centric approach with strong focus on detail and optimal user
            experience across all devices (desktop, tablet, mobile).
            <br />
            <br />
            <WuiLink
              href="/ui"
              onClick={(event) => {
                event.preventDefault();
                onOpenModal(Section.UI);
              }}
              color={WuiLinkColor.LIGHT}
              size={WuiLinkSize.S}
            >
              Details
            </WuiLink>
          </>
        }
      />

      <Job
        logoUrl="/img/job/logo-dev.jpg"
        companyName="Web Development"
        badges={[
          "HTML",
          "CSS",
          "Javascript",
          "React",
          "NextJs",
          "Typescript",
          "Jest",
          "Cypress",
          "Canvas",
          "SVG",
          "Bootstrap",
          "Git",
          "Storybook",
          "Web Responsive",
        ]}
        description={
          <>
            Development of modern web applications with React, Next.js and
            TypeScript. Expertise in HTML5, CSS3 (SASS/LESS) and JavaScript ES6+
            to build performant, responsive user interfaces. Proficiency in
            testing (Jest, Cypress), version control (Git) and documentation
            (Storybook). Web performance, SEO and accessibility optimisation.
            Experience with Canvas, SVG and Web Sockets.
            <br />
            <br />
            <WuiLink
              href="/web"
              onClick={(event) => {
                event.preventDefault();
                onOpenModal(Section.WEB);
              }}
              color={WuiLinkColor.LIGHT}
              size={WuiLinkSize.S}
            >
              Details
            </WuiLink>
          </>
        }
      />

      <Job
        logoUrl="/img/job/logo-dev-mobile.jpg"
        companyName="Mobile development"
        badges={["React Native", "Firebase"]}
        description={
          <>
            Development of cross-platform mobile applications with React Native
            for iOS and Android. Integration of Firebase services
            (authentication, database, push notifications, analytics).
            Management of native features (camera, geolocation, local storage)
            and performance optimisation. Publication on the Apple and Google
            Play stores with metrics tracking and continuous updates.
            <br />
            <br />
            <WuiLink
              href="/mob"
              onClick={(event) => {
                event.preventDefault();
                onOpenModal(Section.MOB);
              }}
              color={WuiLinkColor.LIGHT}
              size={WuiLinkSize.S}
            >
              Details
            </WuiLink>
          </>
        }
      />

      <WuiTitle
        ref={personalProjectsRef}
        as={WuiTitleAs.H3}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        Personal projects
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-kalei.png"
        companyName="Kaleï"
        jobTitle="Draw Kaleïdoscope !"
        badges={["Canvas", "Javascript", "Math"]}
        description={
          <>
            Become a Kaleï artist ! Kaleï is a little app to draw easily
            beautiful kaleïdoscopes and Mandalas. Click and move, change colors,
            pencil and start making hypnotic drawings.
            <br />
            <br />
            <WuiLink
              href="/projects/kalei"
              color={WuiLinkColor.LIGHT}
              size={WuiLinkSize.S}
            >
              Try it now !
            </WuiLink>
          </>
        }
      />

      <Job
        logoUrl="/img/job/logo-tictac.png"
        companyName="TicTac tracker"
        jobTitle="Track time spent on differents tasks."
        badges={["Javascript", "HTML", "CSS", "PHP", "MySQL"]}
        description={
          <>
            TicTac is a simple and efficient tool to track the time spent on
            your different tasks. Create your projects, start the timer and
            analyse your productivity. Manage your tasks easily and visualise
            your work time in real time.
            <br />
            <br />
            <WuiLink
              href="/projects/tictac"
              color={WuiLinkColor.LIGHT}
              size={WuiLinkSize.S}
            >
              Try it now !
            </WuiLink>
          </>
        }
      />

      <WuiTitle
        ref={educationRef}
        as={WuiTitleAs.H3}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        Education
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-arenes.jpg"
        companyName="BTS"
        duration="Jun. 1998"
        jobTitle="Visual Communication Student"
      />

      <Job
        logoUrl="/img/job/logo-ltgc.jpg"
        companyName="Baccalauréat F12"
        duration="Jun. 1996"
        jobTitle="Applied Arts Student"
      />

      <WuiTitle
        ref={butAlsoRef}
        as={WuiTitleAs.H3}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        But also...
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-outdoor.jpg"
        companyName="Outdoor activities"
        duration="Passionate about a lot of things!"
        jobTitle="Passionate about nature and driven by curiosity"
        description={
          <p className="links">
            <WuiLink
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
              href="https://www.instagram.com/familleyoooo/"
              target="_blank"
            >
              <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
                <img
                  src="/img/job/logo-instagram.png"
                  width="14"
                  height="14"
                  alt="Instagram"
                  style={{ marginRight: 5 }}
                />
                Spent time in nature with my family
              </WuiBadge>
            </WuiLink>

            <WuiLink
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
              href="https://www.youtube.com/@familleyoooo"
              target="_blank"
            >
              <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
                <img
                  src="/img/job/logo-youtube.png"
                  width="14"
                  height="14"
                  alt="Youtube"
                  style={{ marginRight: 5 }}
                />
                Fishing
              </WuiBadge>
            </WuiLink>

            <WuiLink
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
              href="https://www.youtube.com/@familleyoooo"
              target="_blank"
            >
              <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
                <img
                  src="/img/job/logo-youtube.png"
                  width="14"
                  height="14"
                  alt="Youtube"
                  style={{ marginRight: 5 }}
                />
                Canyoning
              </WuiBadge>
            </WuiLink>

            <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
              VTTAE
            </WuiBadge>

            <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
              Climbing
            </WuiBadge>

            <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
              Slackline
            </WuiBadge>

            <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
              Apnea
            </WuiBadge>

            <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
              Hiking
            </WuiBadge>

            <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
              Camping
            </WuiBadge>

            <WuiLink
              href="https://www.youtube.com/@familleyoooo"
              target="_blank"
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
            >
              <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
                Mushrooms
              </WuiBadge>
            </WuiLink>

            <WuiLink
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
              href="https://www.instagram.com/familleyoooo/"
              target="_blank"
            >
              <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
                <img
                  src="/img/job/logo-instagram.png"
                  width="14"
                  height="14"
                  alt="Instagram"
                  style={{ marginRight: 5 }}
                />
                Photography
              </WuiBadge>
            </WuiLink>

            <WuiLink
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
              href="https://www.instagram.com/familleyoooo/"
              target="_blank"
            >
              <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
                <img
                  src="/img/job/logo-instagram.png"
                  width="14"
                  height="14"
                  alt="Instagram"
                  style={{ marginRight: 5 }}
                />
                Video
              </WuiBadge>
            </WuiLink>

            <WuiLink
              href="https://www.youtube.com/@familleyoooo"
              target="_blank"
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
            >
              <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
                Search for stones and crystals
              </WuiBadge>
            </WuiLink>

            <WuiLink
              href="https://www.geocaching.com/p/?guid=48f1b1dd-83d0-425d-b958-4fb057f4c0a9&wid=e95a42eb-df39-4192-a76d-2300d3dc44cf&ds=2"
              target="_blank"
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
            >
              <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
                <img
                  src="/img/job/logo-geocaching.png"
                  width="14"
                  height="14"
                  alt="Geocaching"
                  style={{ marginRight: 5 }}
                />
                Geocaching
              </WuiBadge>
            </WuiLink>

            <WuiLink
              href="/projects/wawawood"
              target="_blank"
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
            >
              <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
                <img
                  src="/img/job/logo-wawawood.png"
                  width="14"
                  height="14"
                  alt="Geocaching"
                  style={{ marginRight: 5 }}
                />
                Wood Lamp making
              </WuiBadge>
            </WuiLink>

            <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.L}>
              LEGO
            </WuiBadge>
          </p>
        }
      />
    </>
  );
};
