import { clsx } from "./clsx";

describe("clsx", () => {
  it("combines multiple class strings with spaces", () => {
    expect(clsx("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("returns a single class when given one argument", () => {
    expect(clsx("wui-text")).toBe("wui-text");
  });

  it("returns empty string when given no arguments", () => {
    expect(clsx()).toBe("");
  });

  it("filters out null and undefined", () => {
    expect(clsx("foo", null, "bar", undefined, "baz")).toBe("foo bar baz");
  });

  it("filters out false and 0", () => {
    expect(clsx("foo", false, "bar", 0, "baz")).toBe("foo bar baz");
  });

  it("filters out empty string", () => {
    expect(clsx("foo", "", "bar")).toBe("foo bar");
  });

  it("returns empty string when all values are falsy", () => {
    expect(clsx(null, undefined, false, 0, "")).toBe("");
  });

  it("matches the documented example", () => {
    expect(clsx("wui-text", "wui-text--m", undefined)).toBe(
      "wui-text wui-text--m"
    );
  });

  it("handles conditional class (e.g. from props)", () => {
    const isActive = false;
    expect(clsx("btn", isActive && "btn--active")).toBe("btn");
    expect(clsx("btn", true && "btn--active")).toBe("btn btn--active");
  });
});
