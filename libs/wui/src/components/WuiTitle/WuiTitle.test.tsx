import { createRef } from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { WuiColorAlias } from "../../enum";
import { WuiTitle } from "./WuiTitle";
import { WuiTitleAs, WuiTitleLook } from "./WuiTitle.props";

describe("WuiTitle", () => {
  it("has displayName set", () => {
    expect(WuiTitle.displayName).toBe("WuiTitle");
  });

  it("renders as h1 by default with default color class", () => {
    render(<WuiTitle data-testid="title">Hello</WuiTitle>);
    const el = screen.getByTestId("title");
    expect(el.tagName).toBe("H1");
    expect(el).toHaveClass(
      "wui-title",
      `wui-title--${WuiColorAlias.NEUTRAL_900}`
    );
  });

  it("applies look + custom color + className and supports changing the heading tag", () => {
    render(
      <WuiTitle
        as={WuiTitleAs.H3}
        look={WuiTitleLook.H1}
        color={WuiColorAlias.INFO_500}
        className="custom"
      >
        Heading
      </WuiTitle>
    );
    const el = screen.getByRole("heading", { name: "Heading", level: 3 });
    expect(el).toHaveClass(
      "wui-title--h1",
      `wui-title--${WuiColorAlias.INFO_500}`,
      "custom"
    );
  });

  it("does not add look/color classes when look/color are falsy", () => {
    // Force falsy branches (defensive) even though types normally prevent it.
    render(
      <WuiTitle look={undefined} color={null as any}>
        No extras
      </WuiTitle>
    );
    const el = screen.getByRole("heading", { name: "No extras" });
    expect(el).toHaveClass("wui-title");
    expect(el.className).not.toMatch(/wui-title--h\d/);
    expect(el.className).not.toMatch(/wui-title--neutral-900/);
  });

  it("forwards ref to the heading element", () => {
    const ref = createRef<HTMLHeadingElement>();
    render(
      <WuiTitle as={WuiTitleAs.H2} ref={ref}>
        Ref
      </WuiTitle>
    );
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(ref.current).toBe(
      screen.getByRole("heading", { name: "Ref", level: 2 })
    );
  });
});
