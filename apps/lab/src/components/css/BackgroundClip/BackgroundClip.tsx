import styles from "./BackgroundClip.module.css";

const BackgroundClip = () => {
  return (
    <>
      <pre>
        <code>
          {`background-clip: text;
-webkit-text-fill-color: transparent;
background-image: url('https://wawawoom.fr/projects/cdn/lab/water.gif');`}
        </code>
      </pre>

      <section>
        <h2 className={`${styles.gifClip} ${styles.h2}`}>
          Background GIF Clip
        </h2>
        <h2 className={`${styles.gradientClip} ${styles.h2}`}>
          Background GIF Clip
        </h2>
      </section>
    </>
  );
};

export default BackgroundClip;
