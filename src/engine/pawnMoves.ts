import type { PositionState, Square } from "./types.js";
import type { Move, PromotionPiece } from "./move.js";
import { isValidSquare } from "./square.js";

const PROMOTION_PIECES: PromotionPiece[] = [
  "queen",
  "rook",
  "bishop",
  "knight",
];

function addPromotionMoves(
  moves: Move[],
  from: Square,
  to: Square,
  isCapture: boolean,
): void {
  for (const promotion of PROMOTION_PIECES) {
    moves.push({
      from,
      to,
      flag: isCapture ? "promotion-capture" : "promotion",
      promotion,
    });
  }
}

export function generatePawnMoves(
  position: PositionState,
  from: Square,
): Move[] {
  const moves: Move[] = [];

  if (!isValidSquare(from)) {
    return moves;
  }

  const pawn = position.board[from];

  if (
    pawn === null ||
    pawn === undefined ||
    pawn.type !== "pawn" ||
    pawn.color !== position.sideToMove
  ) {
    return moves;
  }

  // White moves upward (+16); black moves downward (-16).
  const direction = pawn.color === "white" ? 16 : -16;

  const oneStep = from + direction;

  // A pawn can move forward only if the square is empty.
  if (isValidSquare(oneStep) && position.board[oneStep] === null) {
    const promotionRank = pawn.color === "white" ? 7 : 0;
    const targetRank = Math.floor(oneStep / 16);

    if (targetRank === promotionRank) {
    addPromotionMoves(moves, from, oneStep, false);
    } else {
    moves.push({
        from,
        to: oneStep,
        flag: "normal",
    });
    }

    // Starting ranks: white = rank 2, black = rank 7.
    const startingRank = pawn.color === "white" ? 1 : 6;
    const currentRank = Math.floor(from / 16);

    const twoStep = from + 2 * direction;

    if (
      currentRank === startingRank &&
      isValidSquare(twoStep) &&
      position.board[twoStep] === null
    ) {
      moves.push({
        from,
        to: twoStep,
        flag: "double-pawn-push",
      });
    }
  }

    // Generate diagonal captures.
  const captureOffsets =
    pawn.color === "white" ? [15, 17] : [-17, -15];

  for (const offset of captureOffsets) {
    const target = from + offset;

    if (!isValidSquare(target)) {
      continue;
    }

    const targetPiece = position.board[target];

    if (targetPiece !== null && targetPiece !== undefined &&
        targetPiece.color !== pawn.color) {
        const promotionRank = pawn.color === "white" ? 7 : 0;
        const targetRank = Math.floor(target / 16);

        if (targetRank === promotionRank) {
        addPromotionMoves(moves, from, target, true);
        } else {
        moves.push({
            from,
            to: target,
            flag: "capture",
        });
        }
    }
  }

  return moves;
}
