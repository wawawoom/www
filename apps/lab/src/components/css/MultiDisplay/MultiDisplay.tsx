import styles from "./MultiDisplay.module.css";

const MultiDisplay = () => {
  return (
    <>
      <pre>
        <code className="wui-mb-16">display: inline flex;</code>
      </pre>

      <section>
        <div className={styles.box}>
          <span>Box 1</span>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </div>

        <div className={styles.box}>
          <span>Box 2</span>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </div>

        <div className={styles.box}>
          <span>Box 3</span>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </div>

        <div className={styles.box}>
          <span>Box 4</span>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </div>

        <div className={styles.box}>
          <span>Box 5</span>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </div>

        <div className={styles.box}>
          <span>Box 6</span>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </div>

        <div className={styles.box}>
          <span>Box 7</span>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </div>
      </section>
    </>
  );
};

export default MultiDisplay;
