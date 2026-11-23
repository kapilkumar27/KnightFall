
import { describe, expectTypeOf, it } from "vitest";
import type { Move } from "../src/engine/move.js";

describe("Move types", () => {
  it("accepts a normal move", () => {
    const move: Move = {
      from: 20,
      to: 52,
      flag: "double-pawn-push",
    };

    expectTypeOf(move).toMatchTypeOf<Move>();
  });

  it("accepts a capture move", () => {
    const move: Move = {
      from: 52,
      to: 67,
      flag: "capture",
    };

    expectTypeOf(move).toMatchTypeOf<Move>();
  });

  it("accepts a promotion move", () => {
    const move: Move = {
      from: 96,
      to: 112,
      flag: "promotion",
      promotion: "queen",
    };

    expectTypeOf(move).toMatchTypeOf<Move>();
  });

  it("accepts castling", () => {
    const move: Move = {
      from: 4,
      to: 6,
      flag: "king-side-castle",
    };

    expectTypeOf(move).toMatchTypeOf<Move>();
  });
});
