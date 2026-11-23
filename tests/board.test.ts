
import { describe, expect, it } from "vitest";

import { createInitialPosition } from "../src/engine/initialPosition.js";

import {
  getPieceAt,
  setPieceAt,
  clonePosition,
} from "../src/engine/board.js";

describe("getPieceAt", () => {
  it("returns the correct piece", () => {
    const position = createInitialPosition();

    expect(getPieceAt(position, 4)).toEqual({
      color: "white",
      type: "king",
    });
  });

  it("returns null for an empty square", () => {
    const position = createInitialPosition();

    expect(getPieceAt(position, 52)).toBeNull();
  });

  it("rejects invalid square indices", () => {
    const position = createInitialPosition();

    expect(() => getPieceAt(position, 8)).toThrow();
  });
});

describe("setPieceAt", () => {
  it("places a piece on an empty square", () => {
    const position = createInitialPosition();

    const updated = setPieceAt(position, 52, {
      color: "white",
      type: "queen",
    });

    expect(getPieceAt(updated, 52)).toEqual({
      color: "white",
      type: "queen",
    });
  });

  it("removes a piece when null is passed", () => {
    const position = createInitialPosition();

    const updated = setPieceAt(position, 4, null);

    expect(getPieceAt(updated, 4)).toBeNull();
  });

  it("does not modify the original position", () => {
    const position = createInitialPosition();

    const updated = setPieceAt(position, 52, {
      color: "white",
      type: "queen",
    });

    expect(getPieceAt(position, 52)).toBeNull();
    expect(getPieceAt(updated, 52)?.type).toBe("queen");
  });
});

describe("clonePosition", () => {
  it("creates an independent copy", () => {
    const original = createInitialPosition();
    const copy = clonePosition(original);

    copy.board[4] = null;
    copy.castlingRights.whiteKingSide = false;

    expect(original.board[4]).toEqual({
      color: "white",
      type: "king",
    });

    expect(original.castlingRights.whiteKingSide).toBe(true);
  });
});
