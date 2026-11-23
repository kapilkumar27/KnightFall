
import type {
  PositionState,
  Piece,
  Square,
} from "./types.js";

import { isValidSquare } from "./square.js";

/**
 * Returns the piece occupying a square.
 * Returns null if the square is empty.
 */
export function getPieceAt(
  position: PositionState,
  square: Square,
): Piece | null {
  if (!isValidSquare(square)) {
    throw new Error(`Invalid square index: ${square}`);
  }

  return position.board[square] ?? null;
}

/**
 * Returns a new position with a piece placed on the given square.
 * Pass null to empty the square.
 */
export function setPieceAt(
  position: PositionState,
  square: Square,
  piece: Piece | null,
): PositionState {
  if (!isValidSquare(square)) {
    throw new Error(`Invalid square index: ${square}`);
  }

  const board = position.board.slice();
  board[square] = piece ? { ...piece } : null;

  return {
    ...position,
    board,
    castlingRights: { ...position.castlingRights },
  };
}

/**
 * Creates a completely independent copy of a position.
 */
export function clonePosition(
  position: PositionState,
): PositionState {
  return {
    ...position,

    board: position.board.map((piece) =>
      piece ? { ...piece } : null,
    ),

    castlingRights: {
      ...position.castlingRights,
    },
  };
}
