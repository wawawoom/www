import "@testing-library/jest-dom";
import { createRef } from "react";
import { render, screen } from "@testing-library/react";

import { WuiBadge } from "./WuiBadge";
import { WuiBadgeColor, WuiBadgeSize } from "./WuiBadge.props";

describe("WuiBadge", () => {
  it("has displayName set", () => {
    expect(WuiBadge.displayName).toBe("WuiBadge");
  });

  it("renders with default color (dark) and size (m)", () => {
    render(<WuiBadge>Default</WuiBadge>);
    const badge = screen.getByText("Default");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("wui-badge", "wui-badge--dark", "wui-badge--m");
  });

  it("applies color/size overrides, spreads props, and merges className", () => {
    render(
      <WuiBadge
        color={WuiBadgeColor.SUCCESS}
        size={WuiBadgeSize.L}
        className="custom"
        data-testid="badge"
        title="Badge title"
      >
        OK
      </WuiBadge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("wui-badge--success", "wui-badge--l", "custom");
    expect(badge).toHaveAttribute("title", "Badge title");
  });

  it("forwards ref to the span element", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<WuiBadge ref={ref}>Ref</WuiBadge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(screen.getByText("Ref"));
  });
});

