import { WuiInput } from "@wawawoom/wui";

import "./ParentSelector.css";

const ParentSelector = () => {
  return (
    <>
      <code className="code wui-mb-16">form:has(input:invalid)</code>

      <form className="form">
        <WuiInput type="email" label="Email" />
      </form>
    </>
  );
};

export default ParentSelector;
