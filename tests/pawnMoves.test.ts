
import { describe, expect, it } from "vitest";
import { createInitialPosition } from "../src/engine/initialPosition.js";
import { generatePawnMoves } from "../src/engine/pawnMoves.js";
import { squareToIndex } from "../src/engine/square.js";

describe("generatePawnMoves", () => {
  it("generates one-step and two-step moves for a white pawn on e2", () => {
    const position = createInitialPosition();

    const moves = generatePawnMoves(position, squareToIndex("e2"));

    expect(moves).toEqual([
      {
        from: squareToIndex("e2"),
        to: squareToIndex("e3"),
        flag: "normal",
      },
      {
        from: squareToIndex("e2"),
        to: squareToIndex("e4"),
        flag: "double-pawn-push",
      },
    ]);
  });

  it("generates one-step and two-step moves for a black pawn on e7", () => {
    const position = createInitialPosition();
    position.sideToMove = "black";

    const moves = generatePawnMoves(position, squareToIndex("e7"));

    expect(moves).toEqual([
      {
        from: squareToIndex("e7"),
        to: squareToIndex("e6"),
        flag: "normal",
      },
      {
        from: squareToIndex("e7"),
        to: squareToIndex("e5"),
        flag: "double-pawn-push",
      },
    ]);
  });

  it("does not move forward if the next square is occupied", () => {
    const position = createInitialPosition();

    position.board[squareToIndex("e3")] = {
      color: "black",
      type: "knight",
    };

    const moves = generatePawnMoves(position, squareToIndex("e2"));

    expect(moves).toEqual([]);
  });

  it("does not generate a double move for a pawn outside its starting rank", () => {
    const position = createInitialPosition();

    position.board[squareToIndex("e2")] = null;
    position.board[squareToIndex("e3")] = {
      color: "white",
      type: "pawn",
    };

    const moves = generatePawnMoves(position, squareToIndex("e3"));

    expect(moves).toEqual([
      {
        from: squareToIndex("e3"),
        to: squareToIndex("e4"),
        flag: "normal",
      },
    ]);
  });

  it("generates diagonal captures for a white pawn", () => {
    const position = createInitialPosition();

    position.board[squareToIndex("d3")] = {
      color: "black",
      type: "knight",
    };

    position.board[squareToIndex("f3")] = {
      color: "black",
      type: "bishop",
    };

    const moves = generatePawnMoves(position, squareToIndex("e2"));

    expect(moves).toContainEqual({
      from: squareToIndex("e2"),
      to: squareToIndex("d3"),
      flag: "capture",
    });

    expect(moves).toContainEqual({
      from: squareToIndex("e2"),
      to: squareToIndex("f3"),
      flag: "capture",
    });
  });

  it("does not capture its own pieces diagonally", () => {
    const position = createInitialPosition();

    position.board[squareToIndex("d3")] = {
      color: "white",
      type: "knight",
    };

    const moves = generatePawnMoves(position, squareToIndex("e2"));

    expect(moves).not.toContainEqual({
      from: squareToIndex("e2"),
      to: squareToIndex("d3"),
      flag: "capture",
    });
  });

  it("generates four promotion choices for a white pawn", () => {
    const position = createInitialPosition();

    position.board[squareToIndex("a2")] = null;
    position.board[squareToIndex("a7")] = {
      color: "white",
      type: "pawn",
    };

    position.board[squareToIndex("a8")] = null;
    position.board[squareToIndex("b8")] = null;

    const moves = generatePawnMoves(position, squareToIndex("a7"));

    expect(moves).toHaveLength(4);

    expect(
      moves.map((move) =>
        "promotion" in move ? move.promotion : null
      )
    ).toEqual(["queen", "rook", "bishop", "knight"]);

    expect(moves.every((move) => move.flag === "promotion")).toBe(true);
  });

  it("generates four promotion choices for a black pawn", () => {
    const position = createInitialPosition();

    position.sideToMove = "black";
    position.board[squareToIndex("a7")] = null;
    position.board[squareToIndex("a2")] = {
      color: "black",
      type: "pawn",
    };

    position.board[squareToIndex("a1")] = null;
    position.board[squareToIndex("b1")] = null;

    const moves = generatePawnMoves(position, squareToIndex("a2"));

    expect(moves).toHaveLength(4);
    expect(moves.every((move) => move.flag === "promotion")).toBe(true);
  });

  it("generates four promotion captures for a white pawn", () => {
    const position = createInitialPosition();

    position.board[squareToIndex("a2")] = null;
    position.board[squareToIndex("a7")] = {
      color: "white",
      type: "pawn",
    };

    position.board[squareToIndex("a8")] = null;
    position.board[squareToIndex("b8")] = {
      color: "black",
      type: "rook",
    };

    const moves = generatePawnMoves(position, squareToIndex("a7"));

    const promotionCaptures = moves.filter(
      (move) => move.flag === "promotion-capture"
    );

    expect(promotionCaptures).toHaveLength(4);
  });

  it("does not generate an ordinary move when a pawn promotes", () => {
    const position = createInitialPosition();

    position.board[squareToIndex("a2")] = null;
    position.board[squareToIndex("a7")] = {
      color: "white",
      type: "pawn",
    };

    position.board[squareToIndex("a8")] = null;
    position.board[squareToIndex("b8")] = null;

    const moves = generatePawnMoves(position, squareToIndex("a7"));

    expect(moves.some((move) => move.flag === "normal")).toBe(false);
  });
});
