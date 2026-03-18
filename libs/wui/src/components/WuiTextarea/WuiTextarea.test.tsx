import { createRef } from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { WuiInputHelperStatus } from "../WuiInputHelper/WuiInputHelper.props";
import { WuiTextarea } from "./WuiTextarea";
import {
  WuiTextareaHeight,
  WuiTextareaStatus,
} from "./WuiTextarea.props";

describe("WuiTextarea", () => {
  it("has displayName set", () => {
    expect(WuiTextarea.displayName).toBe("WuiTextarea");
  });

  it("renders as a textarea", () => {
    render(<WuiTextarea placeholder="Enter message" aria-label="Message" />);
    const textarea = screen.getByRole("textbox", { name: /message/i });
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("placeholder", "Enter message");
  });

  it("renders with default height and status classes (M, default)", () => {
    render(<WuiTextarea aria-label="Description" />);
    const textarea = screen.getByRole("textbox", { name: /description/i });
    expect(textarea).toHaveClass("wui-textarea--m", "wui-textarea--default");
  });

  it("applies height and status classes", () => {
    render(
      <WuiTextarea
        aria-label="Comment"
        height={WuiTextareaHeight.L}
        status={WuiTextareaStatus.ERROR}
      />
    );
    const textarea = screen.getByRole("textbox", { name: /comment/i });
    expect(textarea).toHaveClass("wui-textarea--l", "wui-textarea--error");
  });

  it("applies custom className", () => {
    render(<WuiTextarea aria-label="Field" className="custom-class" />);
    const textarea = screen.getByRole("textbox", { name: /field/i });
    expect(textarea).toHaveClass("custom-class");
  });

  it("forwards ref to the textarea element", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<WuiTextarea ref={ref} aria-label="Textarea" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current).toBe(
      screen.getByRole("textbox", { name: /textarea/i })
    );
  });

  it("passes through native textarea attributes", () => {
    render(
      <WuiTextarea
        aria-label="Message"
        placeholder="Your message"
        disabled
        rows={5}
      />
    );
    const textarea = screen.getByRole("textbox", { name: /message/i });
    expect(textarea).toHaveAttribute("placeholder", "Your message");
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toBeDisabled();
  });

  describe("label", () => {
    it("renders a label when label prop is provided", () => {
      render(
        <WuiTextarea label="Message" placeholder="Enter message" />
      );
      expect(screen.getByText("Message")).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /message/i })
      ).toBeInTheDocument();
    });

    it("associates label with textarea via id and htmlFor", () => {
      render(<WuiTextarea label="Comment" id="comment-field" />);
      const textarea = screen.getByRole("textbox", { name: /comment/i });
      const label = screen.getByText("Comment");
      expect(textarea).toHaveAttribute("id", "comment-field");
      expect(label).toHaveAttribute("for", "comment-field");
    });

    it("uses generated id when label is set and id is not provided", () => {
      render(<WuiTextarea label="Description" />);
      const textarea = screen.getByRole("textbox", { name: /description/i });
      const label = screen.getByText("Description");
      expect(textarea.id).toBeTruthy();
      expect(label).toHaveAttribute("for", textarea.id);
    });

    it("forwards ref to the textarea when label is present", () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<WuiTextarea ref={ref} label="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current).toBe(
        screen.getByRole("textbox", { name: /test/i })
      );
    });
  });

  describe("helpers", () => {
    it("renders no helpers when helpers is undefined", () => {
      render(<WuiTextarea aria-label="Field" />);
      expect(
        document.querySelector(".wui-input-helper")
      ).not.toBeInTheDocument();
    });

    it("renders no helpers when helpers is empty array", () => {
      render(<WuiTextarea aria-label="Field" helpers={[]} />);
      expect(
        document.querySelector(".wui-input-helper")
      ).not.toBeInTheDocument();
    });

    it("renders one helper with message and default status", () => {
      render(
        <WuiTextarea
          aria-label="Field"
          helpers={[{ message: "Optional field." }]}
        />
      );
      const helper = document.querySelector(".wui-input-helper");
      expect(helper).toBeInTheDocument();
      expect(helper).toHaveClass("wui-input-helper--default");
      expect(screen.getByText("Optional field.")).toBeInTheDocument();
    });

    it("renders one helper with error status", () => {
      render(
        <WuiTextarea
          aria-label="Field"
          helpers={[
            {
              status: WuiInputHelperStatus.ERROR,
              message: "Required field.",
            },
          ]}
        />
      );
      const helper = document.querySelector(".wui-input-helper");
      expect(helper).toHaveClass("wui-input-helper--error");
      expect(screen.getByText("Required field.")).toBeInTheDocument();
    });

    it("renders multiple helpers in order", () => {
      render(
        <WuiTextarea
          aria-label="Field"
          helpers={[
            { message: "First hint." },
            {
              status: WuiInputHelperStatus.ERROR,
              message: "Second error.",
            },
          ]}
        />
      );
      const helpers = document.querySelectorAll(".wui-input-helper");
      expect(helpers).toHaveLength(2);
      expect(helpers[0]).toHaveClass("wui-input-helper--default");
      expect(helpers[0]).toHaveTextContent("First hint.");
      expect(helpers[1]).toHaveClass("wui-input-helper--error");
      expect(helpers[1]).toHaveTextContent("Second error.");
    });
  });
});
