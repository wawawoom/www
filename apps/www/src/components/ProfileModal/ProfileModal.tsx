import { useRef } from "react";
import { useTranslation } from "react-i18next";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiButton,
  WuiButtonColor,
  WuiButtonSize,
  WuiColorValue,
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

import { useModal } from "../../context/ModalContext";
import { Job } from "../Job/Job";
import SocialLinks from "../SocialLinks/SocialLinks";
import "./ProfileModal.css";

export const ProfileModal = () => {
  const { t } = useTranslation();

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

  const { openDreamJobModal } = useModal();

  const onClickDreamJob = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openDreamJobModal();
  };

  const renderDescriptionList = (i18nKey: string, after?: React.ReactNode) => {
    const raw = t(i18nKey, { returnObjects: true });
    const items = Array.isArray(raw) ? raw : [raw];

    return (
      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        <ul style={{ margin: 0, paddingTop: "1rem", paddingLeft: "1.25rem" }}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {after}
      </WuiText>
    );
  };

  return (
    <>
      <div className="avatar-container">
        <WuiBadge
          size={WuiBadgeSize.L}
          color={WuiBadgeColor.WARNING}
          className="work-badge"
        >
          {t("profileModal.openToWork")}
        </WuiBadge>

        <img
          src="/img/nicolas-payrouse.webp"
          alt={t("profileModal.name")}
          className="avatar"
        />
      </div>

      <WuiTitle
        as={WuiTitleAs.H1}
        color={WuiColorAlias.NEUTRAL_0}
        className="name"
      >
        {t("profileModal.name")}
      </WuiTitle>

      <WuiTitle
        as={WuiTitleAs.H2}
        look={WuiTitleLook.H5}
        color={WuiColorAlias.DANGER_100}
        className="job-title"
      >
        {t("profileModal.jobTitle")}
      </WuiTitle>

      <SocialLinks />

      <WuiText
        as={WuiTextAs.P}
        size={WuiTextSize.XXL}
        className="bio"
        color={WuiColorAlias.NEUTRAL_0}
      >
        {t("profileModal.bio")}{" "}
        <WuiLink href="#" onClick={onClickDreamJob} color={WuiLinkColor.NONE}>
          {t("profileModal.checkIdealRole")}
        </WuiLink>
      </WuiText>

      <nav className="links" style={{ marginBottom: "3rem" }}>
        <WuiButton
          color={WuiButtonColor.LIGHT}
          size={WuiButtonSize.S}
          onClick={() => {
            scrollTo(workExperienceRef as React.RefObject<HTMLHeadingElement>);
          }}
          leftIcon="fa-solid fa-arrow-down"
        >
          {t("profileModal.workExperience")}
        </WuiButton>

        <WuiButton
          color={WuiButtonColor.LIGHT}
          size={WuiButtonSize.S}
          onClick={() => {
            scrollTo(skillsRef as React.RefObject<HTMLHeadingElement>);
          }}
          leftIcon="fa-solid fa-arrow-down"
        >
          {t("profileModal.skills")}
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
          {t("profileModal.personalProjects")}
        </WuiButton>

        <WuiButton
          color={WuiButtonColor.LIGHT}
          size={WuiButtonSize.S}
          onClick={() => {
            scrollTo(educationRef as React.RefObject<HTMLHeadingElement>);
          }}
          leftIcon="fa-solid fa-arrow-down"
        >
          {t("profileModal.education")}
        </WuiButton>

        <WuiButton
          color={WuiButtonColor.LIGHT}
          size={WuiButtonSize.S}
          onClick={() => {
            scrollTo(butAlsoRef as React.RefObject<HTMLHeadingElement>);
          }}
          leftIcon="fa-solid fa-arrow-down"
        >
          {t("profileModal.butAlso")}
        </WuiButton>
      </nav>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        {t("profileModal.bioParagraph")}
      </WuiText>

      <WuiTitle
        ref={workExperienceRef}
        as={WuiTitleAs.H3}
        color={WuiColorAlias.NEUTRAL_0}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        {t("profileModal.workExperience")}
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-smood.png"
        companyName="Smood"
        duration={t("job.smoodDuration")}
        jobTitle={t("job.smoodTitle")}
        badges={[
          "React",
          "Next.js",
          "TypeScript",
          "Design System",
          "Component Architecture",
          "Storybook",
          "UI Scalability",
          "Testing (Jest / Cypress)",
          "Performance Optimization",
          "Accessibility",
          "SEO",
          "Responsive Systems",
        ]}
        description={renderDescriptionList(
          "profileModal.smoodDescription",
          <WuiLink
            href="https://smood.ch"
            target="_blank"
            color={WuiLinkColor.NONE}
          >
            https://smood.ch
          </WuiLink>
        )}
      />

      <Job
        logoUrl="/img/job/logo-gtl.png"
        companyName="GTL Studio"
        duration={t("job.gtlDuration")}
        jobTitle={t("job.gtlTitle")}
        badges={["React Native", "Firebase"]}
        description={renderDescriptionList("profileModal.gtlDescription")}
      />

      <Job
        logoUrl="/img/job/logo-stent.png"
        companyName="Stent AI"
        duration={t("job.stentDuration")}
        jobTitle={t("job.stentTitle")}
        badges={[
          "UI/UX Design",
          "Wireframing",
          "Interface Architecture",
          "HTML",
          "CSS",
          "JavaScript",
          "Custom JS Framework",
          "React",
          "React Native",
          "Cross-team Collaboration",
        ]}
        description={renderDescriptionList("profileModal.stentDescription")}
      />

      <Job
        logoUrl="/img/job/logo-hoozin.png"
        companyName="Hoozin"
        duration={t("job.hoozinDuration")}
        jobTitle={t("job.hoozinTitle")}
        badges={[
          "UI System Design",
          "Interface Architecture",
          "Modular JavaScript",
          "Responsive Systems",
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "AngularJS",
          "WebSockets",
        ]}
        description={renderDescriptionList("profileModal.hoozinDescription")}
      />

      <Job
        logoUrl="/img/job/logo-wawawoom.png"
        companyName="WaWaWooM"
        duration={t("job.wawawoomDuration")}
        jobTitle={t("job.wawawoomTitle")}
        badges={[
          "End-to-End Project Ownership",
          "Brand & Visual Identity",
          "Frontend Development",
          "JavaScript / jQuery",
          "HTML / CSS",
          "PHP",
          "MySQL",
          "CMS (WordPress)",
          "Interactive Experiences (Flash / AS3)",
          "E-commerce Integration",
        ]}
        description={renderDescriptionList("profileModal.wawawoomDescription")}
      />

      <Job
        logoUrl="/img/job/logo-genghis-mind.png"
        companyName="Genghis Mind"
        duration={t("job.genghisMindDuration")}
        jobTitle={t("job.genghisMindTitle")}
        badges={[
          "Flash / ActionScript 3",
          "Illustrator",
          "Photoshop",
          "Filemaker",
        ]}
        description={renderDescriptionList(
          "profileModal.genghisMindDescription"
        )}
      />

      <Job
        logoUrl="/img/job/logo-jsshark.png"
        companyName="JS Shark"
        duration={t("job.jsSharkDuration")}
        jobTitle={t("job.jsSharkTitle")}
        badges={["TradeStation", "Filemaker"]}
        description={renderDescriptionList("profileModal.jsSharkDescription")}
      />

      <Job
        logoUrl="/img/job/logo-exhibit.png"
        companyName="Exhib'It"
        duration={t("job.exhibitDuration")}
        jobTitle={t("job.exhibitTitle")}
        badges={["Illustrator", "Photoshop"]}
        description={renderDescriptionList("profileModal.exhibitDescription")}
      />

      <Job
        logoUrl="/img/job/logo-design70.png"
        companyName="Design 70"
        duration={t("job.design70Duration")}
        jobTitle={t("job.design70Title")}
        badges={[
          "Web Interface Management",
          "Frontend Development (HTML / CSS / JS)",
          "PHP",
          "Database Structuring (FileMaker)",
          "Workflow Automation",
          "Visual Design",
        ]}
        description={renderDescriptionList("profileModal.design70Description")}
      />

      <Job
        logoUrl="/img/job/logo-octo.png"
        companyName="Octo Communication"
        duration={t("job.octoDuration")}
        jobTitle={t("job.octoTitle")}
        badges={["Illustrator", "Photoshop", "Filemaker"]}
        description={renderDescriptionList("profileModal.octoDescription")}
      />

      <WuiTitle
        ref={skillsRef}
        as={WuiTitleAs.H3}
        color={WuiColorAlias.NEUTRAL_0}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        {t("profileModal.skills")}
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-graphisme.jpg"
        companyName="Design Systems & UI Architecture"
        badges={[
          "Figma",
          "Illustrator",
          "Photoshop",
          "UI/UX",
          "Wireframes",
          "Prototyping",
        ]}
        description={renderDescriptionList(
          "profileModal.uiUxDescription",
          <WuiLink
            href="https://smood.ch"
            target="_blank"
            color={WuiLinkColor.NONE}
          ></WuiLink>
        )}
      />

      <Job
        logoUrl="/img/job/logo-dev.jpg"
        companyName="Frontend Engineering"
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
        description={renderDescriptionList("profileModal.webDevDescription")}
      />

      <WuiTitle
        ref={personalProjectsRef}
        as={WuiTitleAs.H3}
        color={WuiColorAlias.NEUTRAL_0}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        {t("profileModal.personalProjects")}
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-kalei.png"
        companyName="Kaleï"
        duration={t("profileModal.kaleiTitle")}
        badges={["Canvas", "Javascript", "Math"]}
        description={
          <WuiText
            as={WuiTextAs.P}
            color={WuiColorAlias.NEUTRAL_0}
            style={{ paddingTop: "1rem" }}
          >
            {t("profileModal.kaleiDescription")}
            <br />
            <br />
            <WuiLink
              href="/projects/kalei"
              color={WuiLinkColor.LIGHT}
              size={WuiLinkSize.S}
            >
              {t("profileModal.tryItNow")}
            </WuiLink>
          </WuiText>
        }
      />

      <Job
        logoUrl="/img/job/logo-tictac.png"
        companyName="TicTac tracker"
        duration={t("profileModal.tictacTitle")}
        badges={["Javascript", "HTML", "CSS", "PHP", "MySQL"]}
        description={
          <WuiText
            as={WuiTextAs.P}
            color={WuiColorAlias.NEUTRAL_0}
            style={{ paddingTop: "1rem" }}
          >
            {t("profileModal.tictacDescription")}
            <br />
            <br />
            <WuiLink
              href="/projects/tictac"
              color={WuiLinkColor.LIGHT}
              size={WuiLinkSize.S}
            >
              {t("profileModal.tryItNow")}
            </WuiLink>
          </WuiText>
        }
      />

      <WuiTitle
        ref={educationRef}
        as={WuiTitleAs.H3}
        color={WuiColorAlias.NEUTRAL_0}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        {t("profileModal.education")}
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-arenes.jpg"
        companyName="BTS"
        duration={t("job.btsDuration")}
        jobTitle={t("profileModal.visualCommunicationStudent")}
      />

      <Job
        logoUrl="/img/job/logo-ltgc.jpg"
        companyName="Baccalauréat F12"
        duration={t("job.bacDuration")}
        jobTitle={t("profileModal.appliedArtsStudent")}
      />

      <WuiTitle
        ref={butAlsoRef}
        as={WuiTitleAs.H3}
        color={WuiColorAlias.NEUTRAL_0}
        style={{ marginTop: "3rem", marginBottom: "2rem" }}
      >
        {t("profileModal.butAlso")}
      </WuiTitle>

      <Job
        logoUrl="/img/job/logo-outdoor.jpg"
        companyName="Outdoor activities"
        duration={t("profileModal.outdoorDuration")}
        description={
          <WuiText
            as={WuiTextAs.P}
            style={{
              paddingTop: "1rem",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              padding: 0,
            }}
          >
            <WuiLink
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
              href="https://www.instagram.com/familleyoooo/"
              target="_blank"
            >
              <WuiBadge
                color={WuiBadgeColor.TRANSPARENT}
                size={WuiBadgeSize.L}
                style={{ color: WuiColorValue.PINK_0 }}
              >
                <img
                  src="/img/job/logo-instagram.png"
                  width="14"
                  height="14"
                  alt="Instagram"
                  style={{ marginRight: 5 }}
                />
                {t("profileModal.spentTimeInNature")}
              </WuiBadge>
            </WuiLink>

            <WuiLink
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
              href="https://www.youtube.com/@familleyoooo"
              target="_blank"
            >
              <WuiBadge
                color={WuiBadgeColor.TRANSPARENT}
                size={WuiBadgeSize.L}
                style={{ color: WuiColorValue.PINK_0 }}
              >
                <img
                  src="/img/job/logo-youtube.png"
                  width="14"
                  height="14"
                  alt="Youtube"
                  style={{ marginRight: 5 }}
                />
                {t("profileModal.fishing")}
              </WuiBadge>
            </WuiLink>

            <WuiLink
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
              href="https://www.youtube.com/@familleyoooo"
              target="_blank"
            >
              <WuiBadge
                color={WuiBadgeColor.TRANSPARENT}
                size={WuiBadgeSize.L}
                style={{ color: WuiColorValue.PINK_0 }}
              >
                <img
                  src="/img/job/logo-youtube.png"
                  width="14"
                  height="14"
                  alt="Youtube"
                  style={{ marginRight: 5 }}
                />
                {t("profileModal.canyoning")}
              </WuiBadge>
            </WuiLink>

            <WuiBadge
              color={WuiBadgeColor.TRANSPARENT}
              size={WuiBadgeSize.L}
              style={{ color: WuiColorValue.PINK_0 }}
            >
              VTTAE
            </WuiBadge>

            <WuiBadge
              color={WuiBadgeColor.TRANSPARENT}
              size={WuiBadgeSize.L}
              style={{ color: WuiColorValue.PINK_0 }}
            >
              Climbing
            </WuiBadge>

            <WuiLink
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
              href="https://www.instagram.com/familleyoooo/"
              target="_blank"
            >
              <WuiBadge
                color={WuiBadgeColor.TRANSPARENT}
                size={WuiBadgeSize.L}
                style={{ color: WuiColorValue.PINK_0 }}
              >
                <img
                  src="/img/job/logo-instagram.png"
                  width="14"
                  height="14"
                  alt="Instagram"
                  style={{ marginRight: 5 }}
                />
                {t("profileModal.photography")}
              </WuiBadge>
            </WuiLink>

            <WuiLink
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
              href="https://www.instagram.com/familleyoooo/"
              target="_blank"
            >
              <WuiBadge
                color={WuiBadgeColor.TRANSPARENT}
                size={WuiBadgeSize.L}
                style={{ color: WuiColorValue.PINK_0 }}
              >
                <img
                  src="/img/job/logo-instagram.png"
                  width="14"
                  height="14"
                  alt="Instagram"
                  style={{ marginRight: 5 }}
                />
                {t("profileModal.video")}
              </WuiBadge>
            </WuiLink>

            <WuiLink
              href="https://www.geocaching.com/p/?guid=48f1b1dd-83d0-425d-b958-4fb057f4c0a9&wid=e95a42eb-df39-4192-a76d-2300d3dc44cf&ds=2"
              target="_blank"
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
            >
              <WuiBadge
                color={WuiBadgeColor.TRANSPARENT}
                size={WuiBadgeSize.L}
                style={{ color: WuiColorValue.PINK_0 }}
              >
                <img
                  src="/img/job/logo-geocaching.png"
                  width="14"
                  height="14"
                  alt="Geocaching"
                  style={{ marginRight: 5 }}
                />
                {t("profileModal.geocaching")}
              </WuiBadge>
            </WuiLink>

            <WuiLink
              href="/projects/wawawood"
              target="_blank"
              color={WuiLinkColor.NONE}
              size={WuiLinkSize.S}
            >
              <WuiBadge
                color={WuiBadgeColor.TRANSPARENT}
                size={WuiBadgeSize.L}
                style={{ color: WuiColorValue.PINK_0 }}
              >
                <img
                  src="/img/job/logo-wawawood.png"
                  width="14"
                  height="14"
                  alt="Geocaching"
                  style={{ marginRight: 5 }}
                />
                {t("profileModal.woodLampMaking")}
              </WuiBadge>
            </WuiLink>
          </WuiText>
        }
      />
    </>
  );
};
