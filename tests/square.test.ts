
import { describe, expect, it } from "vitest";
import {
  squareToIndex,
  indexToSquare,
  isValidSquare,
} from "../src/engine/square.js";

describe("squareToIndex", () => {
  it("converts known squares correctly", () => {
    expect(squareToIndex("a1")).toBe(0);
    expect(squareToIndex("e1")).toBe(4);
    expect(squareToIndex("a2")).toBe(16);
    expect(squareToIndex("e4")).toBe(52);
    expect(squareToIndex("h8")).toBe(119);
  });

  it("rejects invalid algebraic coordinates", () => {
    expect(() => squareToIndex("z9")).toThrow();
    expect(() => squareToIndex("e9")).toThrow();
    expect(() => squareToIndex("e")).toThrow();
    expect(() => squareToIndex("")).toThrow();
  });
});

describe("indexToSquare", () => {
  it("converts known indices correctly", () => {
    expect(indexToSquare(0)).toBe("a1");
    expect(indexToSquare(4)).toBe("e1");
    expect(indexToSquare(52)).toBe("e4");
    expect(indexToSquare(119)).toBe("h8");
  });

  it("rejects invalid 0x88 indices", () => {
    expect(() => indexToSquare(8)).toThrow();
    expect(() => indexToSquare(128)).toThrow();
    expect(() => indexToSquare(-1)).toThrow();
    expect(() => indexToSquare(4.5)).toThrow();
  });
});

describe("isValidSquare", () => {
  it("accepts all 64 playable squares", () => {
    let count = 0;

    for (let index = 0; index < 128; index++) {
      if (isValidSquare(index)) {
        count++;
      }
    }

    expect(count).toBe(64);
  });

  it("rejects off-board indices", () => {
    expect(isValidSquare(8)).toBe(false);
    expect(isValidSquare(15)).toBe(false);
    expect(isValidSquare(128)).toBe(false);
  });
});

describe("coordinate round trips", () => {
  it("converts all 64 squares in both directions", () => {
    for (let rank = 1; rank <= 8; rank++) {
      for (const file of "abcdefgh") {
        const square = `${file}${rank}`;
        expect(indexToSquare(squareToIndex(square))).toBe(square);
      }
    }
  });
});
