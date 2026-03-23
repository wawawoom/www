import { WuiTextarea } from "@wawawoom/wui";

import styles from "./FieldSizing.module.css";

const FieldSizing = () => {
  return (
    <>
      <pre>
        <code>{`textarea { field-sizing: content; }`}</code>
      </pre>

      <section>
        <form>
          <WuiTextarea className={styles.textarea}></WuiTextarea>
        </form>
      </section>
    </>
  );
};

export default FieldSizing;
