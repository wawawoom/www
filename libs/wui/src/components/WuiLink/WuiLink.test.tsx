import { createRef } from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { WuiLink } from "./WuiLink";
import { WuiLinkColor, WuiLinkSize } from "./WuiLink.props";

describe("WuiLink", () => {
  it("has displayName set", () => {
    expect(WuiLink.displayName).toBe("WuiLink");
  });

  it("renders with default color (none) and no size class", () => {
    render(<WuiLink href="/x">Home</WuiLink>);
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveClass("wui-link", "wui-link--none");
    expect(link).not.toHaveClass("wui-link--m");
    expect(link).toHaveAttribute("href", "/x");
  });

  it("uses the provided size when size is set", () => {
    render(
      <WuiLink href="/x" color={WuiLinkColor.DARK} size={WuiLinkSize.L}>
        Docs
      </WuiLink>
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveClass("wui-link--dark", "wui-link--l");
    expect(link).not.toHaveClass("wui-link--m");
  });

  it("defaults size to M when color is not NONE and size is not provided", () => {
    render(
      <WuiLink href="/x" color={WuiLinkColor.SUCCESS}>
        Success
      </WuiLink>
    );
    const link = screen.getByRole("link", { name: "Success" });
    expect(link).toHaveClass("wui-link--success", "wui-link--m");
  });

  it("merges className and forwards ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <WuiLink ref={ref} href="/x" className="custom">
        Ref
      </WuiLink>
    );
    const link = screen.getByRole("link", { name: "Ref" });
    expect(link).toHaveClass("custom");
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current).toBe(link);
  });
});
