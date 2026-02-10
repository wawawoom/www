import "@testing-library/jest-dom";
import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { WuiButton } from "./WuiButton";
import { WuiButtonColor, WuiButtonSize } from "./WuiButton.props";

describe("WuiButton", () => {
  it("has displayName set", () => {
    expect(WuiButton.displayName).toBe("WuiButton");
  });

  it("renders children", () => {
    render(<WuiButton>Click me</WuiButton>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders with default color and size classes (LIGHT, M)", () => {
    render(<WuiButton>Default</WuiButton>);
    const button = screen.getByRole("button", { name: /default/i });
    expect(button).toHaveClass("wui-button--light", "wui-button--m");
  });

  it("renders as a button with type submit when specified", () => {
    render(<WuiButton type="submit">Submit</WuiButton>);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("applies color and size classes", () => {
    render(
      <WuiButton color={WuiButtonColor.DARK} size={WuiButtonSize.L}>
        Action
      </WuiButton>
    );
    const button = screen.getByRole("button", { name: /action/i });
    expect(button).toHaveClass("wui-button--dark", "wui-button--l");
  });

  it("applies block class when block is true", () => {
    render(<WuiButton block>Block</WuiButton>);
    const button = screen.getByRole("button", { name: /block/i });
    expect(button).toHaveClass("wui-button--block");
  });

  it("does not apply block class when block is false", () => {
    render(<WuiButton>Inline</WuiButton>);
    const button = screen.getByRole("button", { name: /inline/i });
    expect(button).not.toHaveClass("wui-button--block");
  });

  it("renders left icon when leftIcon is provided", () => {
    render(
      <WuiButton leftIcon="fa-solid fa-arrow-left">Back</WuiButton>
    );
    const button = screen.getByRole("button", { name: /back/i });
    const leftIcon = button.querySelector("i.fa-solid.fa-arrow-left");
    expect(leftIcon).toBeInTheDocument();
  });

  it("renders right icon when rightIcon is provided", () => {
    render(
      <WuiButton rightIcon="fa-solid fa-arrow-right">Next</WuiButton>
    );
    const button = screen.getByRole("button", { name: /next/i });
    const rightIcon = button.querySelector("i.fa-solid.fa-arrow-right");
    expect(rightIcon).toBeInTheDocument();
  });

  it("renders both left and right icons when both are provided", () => {
    render(
      <WuiButton
        leftIcon="fa fa-left"
        rightIcon="fa fa-right"
      >
        Both
      </WuiButton>
    );
    const button = screen.getByRole("button", { name: /both/i });
    expect(button.querySelector("i.fa.fa-left")).toBeInTheDocument();
    expect(button.querySelector("i.fa.fa-right")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<WuiButton className="custom-class">Custom</WuiButton>);
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  });

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<WuiButton ref={ref}>Ref</WuiButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole("button", { name: /ref/i }));
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<WuiButton onClick={handleClick}>Click</WuiButton>);
    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <WuiButton disabled onClick={handleClick}>
        Click
      </WuiButton>
    );
    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
