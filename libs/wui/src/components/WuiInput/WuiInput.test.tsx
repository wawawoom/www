import { createRef } from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { WuiInput } from "./WuiInput";
import { WuiInputHeight, WuiInputStatus } from "./WuiInput.props";

describe("WuiInput", () => {
  it("has displayName set", () => {
    expect(WuiInput.displayName).toBe("WuiInput");
  });

  it("renders as an input", () => {
    render(<WuiInput placeholder="Enter value" />);
    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  it("renders with default size and status classes (M, default)", () => {
    render(<WuiInput aria-label="Input" />);
    const input = screen.getByRole("textbox", { name: /input/i });
    expect(input).toHaveClass("wui-input--m", "wui-input--default");
  });

  it("applies height and status classes", () => {
    render(
      <WuiInput
        aria-label="Input"
        height={WuiInputHeight.L}
        status={WuiInputStatus.ERROR}
      />
    );
    const input = screen.getByRole("textbox", { name: /input/i });
    expect(input).toHaveClass("wui-input--l", "wui-input--error");
  });

  it("applies block class when block is true", () => {
    render(<WuiInput aria-label="Input" block />);
    const input = screen.getByRole("textbox", { name: /input/i });
    expect(input).toHaveClass("wui-input--block");
  });

  it("does not apply block class when block is false", () => {
    render(<WuiInput aria-label="Input" />);
    const input = screen.getByRole("textbox", { name: /input/i });
    expect(input).not.toHaveClass("wui-input--block");
  });

  it("applies custom className", () => {
    render(<WuiInput aria-label="Input" className="custom-class" />);
    const input = screen.getByRole("textbox", { name: /input/i });
    expect(input).toHaveClass("custom-class");
  });

  it("forwards ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<WuiInput ref={ref} aria-label="Input" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByRole("textbox", { name: /input/i }));
  });

  it("passes through native input attributes", () => {
    render(
      <WuiInput
        aria-label="Email"
        type="email"
        placeholder="you@example.com"
        disabled
      />
    );
    const input = screen.getByRole("textbox", { name: /email/i });
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "you@example.com");
    expect(input).toBeDisabled();
  });

  describe("label", () => {
    it("renders a label when label prop is provided", () => {
      render(<WuiInput label="Email" placeholder="you@example.com" />);
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /email/i })
      ).toBeInTheDocument();
    });

    it("associates label with input via id and htmlFor", () => {
      render(<WuiInput label="Username" id="user-field" />);
      const input = screen.getByRole("textbox", { name: /username/i });
      const label = screen.getByText("Username");
      expect(input).toHaveAttribute("id", "user-field");
      expect(label).toHaveAttribute("for", "user-field");
    });

    it("uses generated id when label is set and id is not provided", () => {
      render(<WuiInput label="Field" />);
      const input = screen.getByRole("textbox", { name: /field/i });
      const label = screen.getByText("Field");
      expect(input.id).toBeTruthy();
      expect(label).toHaveAttribute("for", input.id);
    });

    it("forwards ref to the input when label is present", () => {
      const ref = createRef<HTMLInputElement>();
      render(<WuiInput ref={ref} label="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByRole("textbox", { name: /test/i }));
    });
  });
});
