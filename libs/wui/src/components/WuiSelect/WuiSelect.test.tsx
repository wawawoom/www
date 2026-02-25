import { createRef } from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { WuiInputHelperStatus } from "../WuiInputHelper/WuiInputHelper.props";
import { WuiSelect } from "./WuiSelect";
import { WuiSelectHeight, WuiSelectStatus } from "./WuiSelect.props";

const defaultOptions = (
  <>
    <option value="">Choose</option>
    <option value="a">Option A</option>
    <option value="b">Option B</option>
  </>
);

describe("WuiSelect", () => {
  it("has displayName set", () => {
    expect(WuiSelect.displayName).toBe("WuiSelect");
  });

  it("renders as a select with options", () => {
    render(
      <WuiSelect aria-label="Country">
        {defaultOptions}
      </WuiSelect>
    );
    const select = screen.getByRole("combobox", { name: /country/i });
    expect(select).toBeInTheDocument();
    expect(select).toHaveDisplayValue("Choose");
    expect(screen.getByRole("option", { name: "Option A" })).toBeInTheDocument();
  });

  it("renders with default height and status classes (M, default)", () => {
    render(
      <WuiSelect aria-label="Select">
        {defaultOptions}
      </WuiSelect>
    );
    const select = screen.getByRole("combobox", { name: /select/i });
    expect(select).toHaveClass("wui-select--m", "wui-select--default");
  });

  it("applies height and status classes", () => {
    render(
      <WuiSelect
        aria-label="Select"
        height={WuiSelectHeight.L}
        status={WuiSelectStatus.ERROR}
      >
        {defaultOptions}
      </WuiSelect>
    );
    const select = screen.getByRole("combobox", { name: /select/i });
    expect(select).toHaveClass("wui-select--l", "wui-select--error");
  });

  it("applies custom className", () => {
    render(
      <WuiSelect aria-label="Select" className="custom-class">
        {defaultOptions}
      </WuiSelect>
    );
    const select = screen.getByRole("combobox", { name: /select/i });
    expect(select).toHaveClass("custom-class");
  });

  it("forwards ref to the select element", () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <WuiSelect ref={ref} aria-label="Select">
        {defaultOptions}
      </WuiSelect>
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current).toBe(screen.getByRole("combobox", { name: /select/i }));
  });

  it("passes through native select attributes", () => {
    render(
      <WuiSelect aria-label="Country" disabled required>
        {defaultOptions}
      </WuiSelect>
    );
    const select = screen.getByRole("combobox", { name: /country/i });
    expect(select).toBeDisabled();
    expect(select).toBeRequired();
  });

  describe("label", () => {
    it("renders a label when label prop is provided", () => {
      render(
        <WuiSelect label="Country">
          {defaultOptions}
        </WuiSelect>
      );
      expect(screen.getByText("Country")).toBeInTheDocument();
      expect(
        screen.getByRole("combobox", { name: /country/i })
      ).toBeInTheDocument();
    });

    it("associates label with select via id and htmlFor", () => {
      render(
        <WuiSelect label="Country" id="country-field">
          {defaultOptions}
        </WuiSelect>
      );
      const select = screen.getByRole("combobox", { name: /country/i });
      const label = screen.getByText("Country");
      expect(select).toHaveAttribute("id", "country-field");
      expect(label).toHaveAttribute("for", "country-field");
    });

    it("uses generated id when label is set and id is not provided", () => {
      render(
        <WuiSelect label="Country">
          {defaultOptions}
        </WuiSelect>
      );
      const select = screen.getByRole("combobox", { name: /country/i });
      const label = screen.getByText("Country");
      expect(select.id).toBeTruthy();
      expect(label).toHaveAttribute("for", select.id);
    });

    it("forwards ref to the select when label is present", () => {
      const ref = createRef<HTMLSelectElement>();
      render(
        <WuiSelect ref={ref} label="Country">
          {defaultOptions}
        </WuiSelect>
      );
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
      expect(ref.current).toBe(
        screen.getByRole("combobox", { name: /country/i })
      );
    });
  });

  describe("helpers", () => {
    it("renders no helpers when helpers is undefined", () => {
      render(
        <WuiSelect aria-label="Select">
          {defaultOptions}
        </WuiSelect>
      );
      expect(
        document.querySelector(".wui-input-helper")
      ).not.toBeInTheDocument();
    });

    it("renders no helpers when helpers is empty array", () => {
      render(
        <WuiSelect aria-label="Select" helpers={[]}>
          {defaultOptions}
        </WuiSelect>
      );
      expect(
        document.querySelector(".wui-input-helper")
      ).not.toBeInTheDocument();
    });

    it("renders one helper with message and default status", () => {
      render(
        <WuiSelect
          aria-label="Country"
          helpers={[{ message: "Select your country." }]}
        >
          {defaultOptions}
        </WuiSelect>
      );
      const helper = document.querySelector(".wui-input-helper");
      expect(helper).toBeInTheDocument();
      expect(helper).toHaveClass("wui-input-helper--default");
      expect(screen.getByText("Select your country.")).toBeInTheDocument();
    });

    it("renders one helper with error status", () => {
      render(
        <WuiSelect
          aria-label="Country"
          helpers={[
            {
              status: WuiInputHelperStatus.ERROR,
              message: "Please select a country.",
            },
          ]}
        >
          {defaultOptions}
        </WuiSelect>
      );
      const helper = document.querySelector(".wui-input-helper");
      expect(helper).toHaveClass("wui-input-helper--error");
      expect(screen.getByText("Please select a country.")).toBeInTheDocument();
    });

    it("renders one helper with valid status", () => {
      render(
        <WuiSelect
          aria-label="Country"
          helpers={[
            {
              status: WuiInputHelperStatus.VALID,
              message: "Country selected.",
            },
          ]}
        >
          {defaultOptions}
        </WuiSelect>
      );
      const helper = document.querySelector(".wui-input-helper");
      expect(helper).toHaveClass("wui-input-helper--valid");
      expect(screen.getByText("Country selected.")).toBeInTheDocument();
    });

    it("renders multiple helpers in order", () => {
      render(
        <WuiSelect
          aria-label="Country"
          helpers={[
            { message: "First hint." },
            {
              status: WuiInputHelperStatus.ERROR,
              message: "Second error.",
            },
          ]}
        >
          {defaultOptions}
        </WuiSelect>
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
