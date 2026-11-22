
import { describe, expect, it } from "vitest";
import { createInitialPosition } from "../src/engine/initialPosition.js";

describe("createInitialPosition", () => {
  it("places all 32 pieces correctly", () => {
    const position = createInitialPosition();

    const pieces = position.board.filter(
      (piece) => piece !== null,
    );

    expect(pieces).toHaveLength(32);
  });

  it("places both kings correctly", () => {
    const position = createInitialPosition();

    expect(position.board[4]).toEqual({
      color: "white",
      type: "king",
    });

    expect(position.board[116]).toEqual({
      color: "black",
      type: "king",
    });
  });

  it("starts with White to move", () => {
    const position = createInitialPosition();

    expect(position.sideToMove).toBe("white");
  });

  it("starts with all castling rights", () => {
    const position = createInitialPosition();

    expect(Object.values(position.castlingRights)).toEqual([
      true, true, true, true,
    ]);
  });
});
