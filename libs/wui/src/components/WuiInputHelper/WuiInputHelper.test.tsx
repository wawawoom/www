import { createRef } from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { WuiInputHelper } from "./WuiInputHelper";
import { WuiInputHelperStatus } from "./WuiInputHelper.props";

describe("WuiInputHelper", () => {
  it("has displayName set", () => {
    expect(WuiInputHelper.displayName).toBe("WuiInputHelper");
  });

  it("renders with default status and info icon", () => {
    render(<WuiInputHelper data-testid="helper" message="Hint text" />);
    const helper = screen.getByTestId("helper");
    expect(helper).toHaveClass("wui-input-helper", "wui-input-helper--default");
    expect(screen.getByText("Hint text")).toHaveClass("wui-input-helper__text");
    const icon = helper.querySelector(
      ".wui-input-helper__icon i.fa-solid.fa-circle-info"
    );
    expect(icon).toBeInTheDocument();
  });

  it("renders error status with xmark icon", () => {
    render(
      <WuiInputHelper
        status={WuiInputHelperStatus.ERROR}
        data-testid="helper"
        message="Error message"
      />
    );
    const helper = screen.getByTestId("helper");
    expect(helper).toHaveClass("wui-input-helper--error");
    const icon = helper.querySelector(
      ".wui-input-helper__icon i.fa-solid.fa-circle-xmark"
    );
    expect(icon).toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("renders valid status with check icon", () => {
    render(
      <WuiInputHelper
        status={WuiInputHelperStatus.VALID}
        data-testid="helper"
        message="Valid message"
      />
    );
    const helper = screen.getByTestId("helper");
    expect(helper).toHaveClass("wui-input-helper--valid");
    const icon = helper.querySelector(
      ".wui-input-helper__icon i.fa-solid.fa-circle-check"
    );
    expect(icon).toBeInTheDocument();
    expect(screen.getByText("Valid message")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <WuiInputHelper
        className="custom-class"
        data-testid="helper"
        message="Text"
      />
    );
    const helper = screen.getByTestId("helper");
    expect(helper).toHaveClass("custom-class");
  });

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <WuiInputHelper ref={ref} data-testid="helper" message="Ref test" />
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByTestId("helper"));
  });

  it("spreads extra props to the root div", () => {
    render(
      <WuiInputHelper
        id="helper-1"
        aria-describedby="input-id"
        message="Helper"
      />
    );
    const helper = screen.getByText("Helper").closest("div");
    expect(helper).toHaveAttribute("id", "helper-1");
    expect(helper).toHaveAttribute("aria-describedby", "input-id");
  });
});
