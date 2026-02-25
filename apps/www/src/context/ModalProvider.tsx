import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  WuiLink,
  WuiLinkColor,
  WuiModal,
  WuiText,
  WuiTextAs,
  WuiTextWeight,
} from "@wawawoom/wui";

import { ModalContext } from "./ModalContext";
import type { ModalContextValue } from "./ModalContext";

export const ModalProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [isDreamJobModalOpen, setIsDreamJobModalOpen] = useState(false);

  const openDreamJobModal = useCallback(() => setIsDreamJobModalOpen(true), []);
  const closeDreamJobModal = useCallback(
    () => setIsDreamJobModalOpen(false),
    []
  );

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
        <WuiText as={WuiTextAs.P} weight={WuiTextWeight.BOLD}>
          My ideal role sits at the intersection of product, design, and
          engineering, leading the strategy and adoption of scalable design
          systems.
        </WuiText>

        <WuiText as={WuiTextAs.P}>
          I translate design foundations into production-ready React
          architectures—from tokens and component APIs to documentation and
          adoption strategy—ensuring reliability and extensibility.
        </WuiText>

        <WuiText as={WuiTextAs.P}>
          I bridge design and development, making pragmatic architectural
          decisions, anticipating integration challenges, and eliminating
          friction between teams. The result: faster iteration, higher quality,
          and measurable efficiency gains.
        </WuiText>

        <WuiText as={WuiTextAs.P}>
          I seek a role where design system thinking is strategic, in a
          product-driven organization valuing technical excellence,
          cross-functional ownership, and long-term scalability, in hybrid or
          remote-first settings.
        </WuiText>

        <WuiText as={WuiTextAs.P}>
          I am seeking a role where design system thinking is considered a
          strategic asset rather than a side initiative. Ideally, this would be
          within a product-driven organization that values technical excellence,
          cross-functional ownership, and long-term scalability.
        </WuiText>

        <WuiText as={WuiTextAs.P}>
          I am open to hybrid or remote-first environments and looking for a
          position that reflects the strategic and architectural impact of the
          role, with compensation aligned to senior-level UI Engineering or
          Design System leadership responsibilities.
        </WuiText>
      </WuiModal>
    </ModalContext.Provider>
  );
};
