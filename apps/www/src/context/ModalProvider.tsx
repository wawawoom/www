import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        title={t("dreamJobModal.title")}
        footer={
          <WuiLink
            href="tel:+33631796781"
            color={WuiLinkColor.PRIMARY}
            style={{ flex: 1 }}
          >
            {t("dreamJobModal.letsTalk")}
          </WuiLink>
        }
      >
        <WuiText as={WuiTextAs.P} weight={WuiTextWeight.BOLD}>
          {t("dreamJobModal.paragraph1")}
        </WuiText>

        <WuiText as={WuiTextAs.P}>{t("dreamJobModal.paragraph2")}</WuiText>

        <WuiText as={WuiTextAs.P}>{t("dreamJobModal.paragraph3")}</WuiText>

        <WuiText as={WuiTextAs.P}>{t("dreamJobModal.paragraph4")}</WuiText>

        <WuiText as={WuiTextAs.P}>{t("dreamJobModal.paragraph5")}</WuiText>

        <WuiText as={WuiTextAs.P}>{t("dreamJobModal.paragraph6")}</WuiText>
      </WuiModal>
    </ModalContext.Provider>
  );
};
