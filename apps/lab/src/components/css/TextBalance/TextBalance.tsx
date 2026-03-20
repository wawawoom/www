import { useState } from "react";

import { WuiInput, WuiTitle, WuiTitleAs } from "@wawawoom/wui";

import styles from "./TextBalance.module.css";

const TextBalance = () => {
  const [isBalanceActive, setIsBalanceActive] = useState(false);

  const onChangeBalance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBalanceActive(event.target.checked);
  };

  return (
    <>
      <WuiInput
        type="checkbox"
        id="toggle-balance"
        onChange={onChangeBalance}
        label="Active text-wrap: balance"
      />

      <WuiTitle
        className={styles.textBalance}
        as={WuiTitleAs.H2}
        style={{
          textWrap: isBalanceActive ? "balance" : "auto",
        }}
      >
        This is a test of the text-balance feature. It should be balanced.
      </WuiTitle>
    </>
  );
};

export default TextBalance;
