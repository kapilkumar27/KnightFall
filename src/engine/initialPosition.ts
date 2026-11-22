
import type {
  PositionState,
  Piece,
  PieceType,
  Color,
} from "./types.js";

const backRank: PieceType[] = [
  "rook",
  "knight",
  "bishop",
  "queen",
  "king",
  "bishop",
  "knight",
  "rook",
];

function createPiece(color: Color, type: PieceType): Piece {
  return { color, type };
}

export function createInitialPosition(): PositionState {
  const board: PositionState["board"] = Array(128).fill(null);

  // Place White and Black back-rank pieces.
  for (let file = 0; file < 8; file++) {
    board[file] = createPiece("white", backRank[file]!);
    board[112 + file] = createPiece("black", backRank[file]!);
  }

  // Place pawns.
  for (let file = 0; file < 8; file++) {
    board[16 + file] = createPiece("white", "pawn");
    board[96 + file] = createPiece("black", "pawn");
  }

  return {
    board,
    sideToMove: "white",

    castlingRights: {
      whiteKingSide: true,
      whiteQueenSide: true,
      blackKingSide: true,
      blackQueenSide: true,
    },

    enPassantSquare: null,
    halfmoveClock: 0,
    fullmoveNumber: 1,
  };
}
