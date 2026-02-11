import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { WuiLink, WuiLinkColor, WuiModal, WuiText, WuiTextAs } from "@wawawoom/wui";

import { ModalContext } from "./ModalContext";
import type { ModalContextValue } from "./ModalContext";

export const ModalProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [isDreamJobModalOpen, setIsDreamJobModalOpen] = useState(false);

  const openDreamJobModal = useCallback(() => setIsDreamJobModalOpen(true), []);
  const closeDreamJobModal = useCallback(() => setIsDreamJobModalOpen(false), []);

  const value = useMemo<ModalContextValue>(() => {
    return { isDreamJobModalOpen, openDreamJobModal, closeDreamJobModal };
  }, [isDreamJobModalOpen, openDreamJobModal, closeDreamJobModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}

      <WuiModal
        open={isDreamJobModalOpen}
        onClose={closeDreamJobModal}
        title="The dream job !"
        footer={
          <WuiLink
            href="tel:+33631796781"
            color={WuiLinkColor.DARK}
            style={{ flex: 1 }}
          >
            Let's talk about it.
          </WuiLink>
        }
      >
        <WuiText as={WuiTextAs.P}>
          My ideal role is at the intersection of design and development, where I
          can contribute to both the strategic creation and the technical
          implementation of a robust design system. I am particularly passionate
          about designing scalable and consistent design systems in Figma, as
          they provide a single source of truth for user interface standards. A
          well-structured design system is critical for organizations because it
          ensures visual and functional consistency, accelerates product
          development, improves collaboration across teams, and ultimately
          reduces long-term maintenance costs. <WuiLink>TODO: Check the figma file</WuiLink> I used for my website.
        </WuiText>

        <WuiText as={WuiTextAs.P}>
          I especially enjoy translating these design systems into
          production-ready React component libraries, documented and showcased
          with Storybook. <WuiLink>TODO: Check the storybook</WuiLink> I used for this website.
        </WuiText>

        <WuiText as={WuiTextAs.P}> This approach enables teams to work with reliable,
          reusable, and well-tested components, improving development speed and
          product quality. Storybook also serves as a shared reference between
          stakeholders, designers, and developers, making the system transparent,
          accessible, and easy to evolve over time.
        </WuiText>

        <WuiText as={WuiTextAs.P}>
          One of my key strengths is my dual expertise as both a designer and a
          React developer. Because I handle both the design and implementation
          phases, there is no loss of information or intent between design and
          development. I understand the constraints, needs, and workflows of
          both disciplines, which allows me to make pragmatic decisions, avoid
          unnecessary iterations, and significantly reduce friction. This
          results in measurable gains in efficiency, delivery speed, and overall
          cost for the organization.
        </WuiText>

        <WuiText as={WuiTextAs.P}>
          I am seeking a position that values design system thinking, technical
          excellence, and cross-functional efficiency, ideally within a hybrid
          work environment with three days of remote work and two days on-site. I
          am looking for a role with a target compensation of €60,000 gross
          annually, where I can contribute meaningfully to building scalable,
          high-quality digital products while continuously refining both design
          and engineering practices.
        </WuiText>
      </WuiModal>
    </ModalContext.Provider>
  );
};
