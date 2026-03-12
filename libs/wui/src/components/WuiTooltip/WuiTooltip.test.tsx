import { createRef } from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { WuiTooltip } from "./WuiTooltip";
import { WuiTooltipPlacement } from "./WuiTooltip.props";

describe("WuiTooltip", () => {
  it("has displayName set", () => {
    expect(WuiTooltip.displayName).toBe("WuiTooltip");
  });

  it("renders trigger and tooltip content with default placement (top)", () => {
    render(
      <WuiTooltip content="Tooltip text">
        <button type="button">Hover me</button>
      </WuiTooltip>
    );
    expect(screen.getByRole("button", { name: /hover me/i })).toBeInTheDocument();
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent("Tooltip text");
  });

  it("associates trigger with tooltip via aria-describedby", () => {
    render(
      <WuiTooltip content="Help text">
        <span>Trigger</span>
      </WuiTooltip>
    );
    const trigger = screen.getByText("Trigger");
    const anchor = trigger.parentElement;
    const tooltip = screen.getByRole("tooltip");
    expect(anchor).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("applies placement class and data-placement", () => {
    render(
      <WuiTooltip content="Tip" placement={WuiTooltipPlacement.BOTTOM}>
        <span>Trigger</span>
      </WuiTooltip>
    );
    const root = screen.getByText("Trigger").parentElement?.parentElement;
    expect(root).toHaveClass("wui-tooltip", "wui-tooltip--bottom");
    expect(root).toHaveAttribute("data-placement", "bottom");
  });

  it("applies custom className and spreads props", () => {
    render(
      <WuiTooltip
        content="Tip"
        className="custom"
        data-testid="tooltip-root"
        title="Tooltip root"
      >
        <span>Trigger</span>
      </WuiTooltip>
    );
    const root = screen.getByTestId("tooltip-root");
    expect(root).toHaveClass("custom");
    expect(root).toHaveAttribute("title", "Tooltip root");
  });

  it("forwards ref to the root span", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <WuiTooltip ref={ref} content="Tip">
        <span>Trigger</span>
      </WuiTooltip>
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveClass("wui-tooltip");
  });
});
