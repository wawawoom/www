import "@testing-library/jest-dom";

import { LOREM_IPSUM, loremIpsum } from "./lorem-ipsum";

describe("loremIpsum", () => {
  it("exports a non-empty source text", () => {
    expect(typeof LOREM_IPSUM).toBe("string");
    expect(LOREM_IPSUM.length).toBeGreaterThan(100);
    expect(LOREM_IPSUM.endsWith(".")).toBe(true);
  });

  it("generates default 50 words and ends with a dot", () => {
    const text = loremIpsum();
    expect(text.endsWith(".")).toBe(true);
    expect(text.split(/\s+/)).toHaveLength(50);
  });

  it("adds a dot when the selected words don't already end with one", () => {
    const text = loremIpsum(5);
    expect(text).toBe("Lorem ipsum dolor sit amet,.");
  });

  it("caps wordCount to the source length and keeps the trailing dot", () => {
    const huge = loremIpsum(100000);
    expect(huge.endsWith(".")).toBe(true);
    expect(huge).toBe(LOREM_IPSUM);
  });
});
