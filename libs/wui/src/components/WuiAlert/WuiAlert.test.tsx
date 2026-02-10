import "@testing-library/jest-dom";
import { createRef } from "react";
import { render, screen } from "@testing-library/react";

import { WuiAlert } from "./WuiAlert";
import { WuiAlertColor } from "./WuiAlert.props";

describe("WuiAlert", () => {
  it("has displayName set", () => {
    expect(WuiAlert.displayName).toBe("WuiAlert");
  });

  it("renders with default color (info) and default icon mapping", () => {
    render(<WuiAlert data-testid="alert">Hello</WuiAlert>);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveAttribute("role", "alert");
    expect(alert).toHaveClass("wui-alert", "wui-alert--info");
    expect(screen.getByText("Hello")).toHaveClass("wui-alert__message");

    const icon = alert.querySelector(".wui-alert__icon i.fa-solid.fa-info");
    expect(icon).toBeInTheDocument();
  });

  it("uses the icon prop when provided, and applies color + className + spreads props", () => {
    render(
      <WuiAlert
        color={WuiAlertColor.ERROR}
        icon="fa-solid fa-bug"
        className="custom"
        aria-label="Alert label"
      >
        Boom
      </WuiAlert>
    );
    const alert = screen.getByRole("alert", { name: "Alert label" });
    expect(alert).toHaveClass("wui-alert--error", "custom");
    expect(alert.querySelector(".wui-alert__icon i.fa-solid.fa-bug")).toBeInTheDocument();
  });

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<WuiAlert ref={ref}>Ref</WuiAlert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByRole("alert"));
  });
});

