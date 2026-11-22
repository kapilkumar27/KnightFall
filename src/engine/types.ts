
export type Color = "white" | "black";

export type PieceType =
  | "pawn"
  | "knight"
  | "bishop"
  | "rook"
  | "queen"
  | "king";

export interface Piece {
  color: Color;
  type: PieceType;
}

export type Square = number;

export type Board = Array<Piece | null>;

export interface CastlingRights {
  whiteKingSide: boolean;
  whiteQueenSide: boolean;
  blackKingSide: boolean;
  blackQueenSide: boolean;
}

export interface PositionState {
  board: Board;
  sideToMove: Color;
  castlingRights: CastlingRights;
  enPassantSquare: Square | null;
  halfmoveClock: number;
  fullmoveNumber: number;
}
