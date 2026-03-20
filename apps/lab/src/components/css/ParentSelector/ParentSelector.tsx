import { WuiInput } from "@wawawoom/wui";

import styles from "./ParentSelector.module.css";

const ParentSelector = () => {
  return (
    <>
      <pre>
        <code className="wui-mb-16">form:has(input:invalid)</code>
      </pre>

      <form className={styles.form}>
        <WuiInput type="email" label="Email" />
      </form>
    </>
  );
};

export default ParentSelector;
