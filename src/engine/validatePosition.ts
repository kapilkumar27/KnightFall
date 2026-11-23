
import type { PositionState, Color, PieceType } from "./types.js";
import { isValidSquare } from "./square.js";

const PIECE_TYPES: PieceType[] = [
  "pawn",
  "knight",
  "bishop",
  "rook",
  "queen",
  "king",
];

function isValidColor(color: unknown): color is Color {
  return color === "white" || color === "black";
}

export function validatePosition(
  position: PositionState,
): string[] {
  const errors: string[] = [];

  if (!position || !Array.isArray(position.board)) {
    return ["Position must contain a board array."];
  }

  if (position.board.length !== 128) {
    return ["Board must contain exactly 128 entries."];
  }

  const kingCounts: Record<Color, number> = {
    white: 0,
    black: 0,
  };

  for (let index = 0; index < 128; index++) {
    const piece = position.board[index];

    if (!isValidSquare(index)) {
      if (piece !== null) {
        errors.push(`Invalid piece on off-board index ${index}.`);
      }
      continue;
    }

    if (piece === null) continue;

    if (
      typeof piece !== "object" ||
      !isValidColor(piece.color) ||
      !PIECE_TYPES.includes(piece.type)
    ) {
      errors.push(`Invalid piece at square index ${index}.`);
      continue;
    }

    if (piece.type === "king") {
      kingCounts[piece.color]++;
    }

    if (
      piece.type === "pawn" &&
      ((index >> 4) === 0 || (index >> 4) === 7)
    ) {
      errors.push(`Pawn on back rank at index ${index}.`);
    }
  }

  if (kingCounts.white !== 1) {
    errors.push("Position must contain exactly one white king.");
  }

  if (kingCounts.black !== 1) {
    errors.push("Position must contain exactly one black king.");
  }

  if (!isValidColor(position.sideToMove)) {
    errors.push("Invalid side to move.");
  }

  const rights = position.castlingRights;

  if (!rights || typeof rights !== "object") {
    errors.push("Invalid castling rights.");
  } else {
    for (const right of [
      "whiteKingSide",
      "whiteQueenSide",
      "blackKingSide",
      "blackQueenSide",
    ] as const) {
      if (typeof rights[right] !== "boolean") {
        errors.push(`Invalid castling right: ${right}.`);
      }
    }
  }

  if (
    position.enPassantSquare !== null &&
    !isValidSquare(position.enPassantSquare)
  ) {
    errors.push("Invalid en passant square.");
  }

  if (
    !Number.isInteger(position.halfmoveClock) ||
    position.halfmoveClock < 0
  ) {
    errors.push("Invalid halfmove clock.");
  }

  if (
    !Number.isInteger(position.fullmoveNumber) ||
    position.fullmoveNumber < 1
  ) {
    errors.push("Invalid fullmove number.");
  }

  return errors;
}
