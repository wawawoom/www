import { createRef } from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { WuiColorAlias } from "../../enum";
import { WuiText } from "./WuiText";
import { WuiTextAs, WuiTextSize, WuiTextWeight } from "./WuiText.props";

describe("WuiText", () => {
  it("has displayName set", () => {
    expect(WuiText.displayName).toBe("WuiText");
  });

  it("renders as div by default with default classes", () => {
    render(<WuiText data-testid="text">Hello</WuiText>);
    const el = screen.getByTestId("text");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass(
      "wui-text",
      "wui-text--m",
      "wui-text--normal",
      `wui-text--${WuiColorAlias.NEUTRAL_900}`
    );
  });

  it("renders as the requested tag and applies overrides + merges className", () => {
    render(
      <WuiText
        as={WuiTextAs.SPAN}
        size={WuiTextSize.XL}
        weight={WuiTextWeight.BOLD}
        color={WuiColorAlias.SUCCESS_500}
        className="custom"
      >
        Big
      </WuiText>
    );
    const el = screen.getByText("Big");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass(
      "wui-text--xl",
      "wui-text--bold",
      `wui-text--${WuiColorAlias.SUCCESS_500}`,
      "custom"
    );
  });

  it("forwards ref to the underlying element", () => {
    const ref = createRef<HTMLParagraphElement>();
    render(
      <WuiText as={WuiTextAs.P} ref={ref}>
        Ref
      </WuiText>
    );
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    expect(ref.current).toBe(screen.getByText("Ref"));
  });
});
