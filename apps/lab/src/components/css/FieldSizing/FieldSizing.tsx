import { WuiTextarea } from "@wawawoom/wui";

import "./FieldSizing.css";

const FieldSizing = () => {
  return (
    <>
      <pre>
        <code>{`textarea { field-sizing: content; }`}</code>

        <section>
          <form>
            <WuiTextarea
              id="message"
              name="message"
              className="textarea"
            ></WuiTextarea>
          </form>
        </section>
      </pre>
    </>
  );
};

export default FieldSizing;
