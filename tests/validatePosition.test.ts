
import { describe, expect, it } from "vitest";
import { createInitialPosition } from "../src/engine/initialPosition.js";
import { validatePosition } from "../src/engine/validatePosition.js";

describe("validatePosition", () => {
  it("accepts the standard starting position", () => {
    const position = createInitialPosition();

    expect(validatePosition(position)).toEqual([]);
  });

  it("rejects a board with the wrong length", () => {
    const position = createInitialPosition();
    position.board.pop();

    expect(validatePosition(position)).toContain(
      "Board must contain exactly 128 entries.",
    );
  });

  it("rejects a missing white king", () => {
    const position = createInitialPosition();
    position.board[4] = null;

    expect(validatePosition(position)).toContain(
      "Position must contain exactly one white king.",
    );
  });

  it("rejects a missing black king", () => {
    const position = createInitialPosition();
    position.board[116] = null;

    expect(validatePosition(position)).toContain(
      "Position must contain exactly one black king.",
    );
  });

  it("rejects a pawn on the first rank", () => {
    const position = createInitialPosition();
    position.board[32] = null;
    position.board[0] = { color: "white", type: "pawn" };

    expect(validatePosition(position)).toContain(
      "Pawn on back rank at index 0.",
    );
  });

  it("rejects a piece on an off-board index", () => {
    const position = createInitialPosition();
    position.board[8] = { color: "white", type: "queen" };

    expect(validatePosition(position)).toContain(
      "Invalid piece on off-board index 8.",
    );
  });

  it("rejects an invalid halfmove clock", () => {
    const position = createInitialPosition();
    position.halfmoveClock = -1;

    expect(validatePosition(position)).toContain(
      "Invalid halfmove clock.",
    );
  });

  it("rejects an invalid fullmove number", () => {
    const position = createInitialPosition();
    position.fullmoveNumber = 0;

    expect(validatePosition(position)).toContain(
      "Invalid fullmove number.",
    );
  });
});
