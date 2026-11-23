
import type { Square, PieceType } from "./types.js";

export type PromotionPiece = Exclude<
  PieceType,
  "pawn" | "king"
>;

interface BaseMove {
  from: Square;
  to: Square;
}

export interface NormalMove extends BaseMove {
  flag: "normal";
}

export interface CaptureMove extends BaseMove {
  flag: "capture";
}

export interface DoublePawnPushMove extends BaseMove {
  flag: "double-pawn-push";
}

export interface EnPassantMove extends BaseMove {
  flag: "en-passant";
}

export interface CastleMove extends BaseMove {
  flag: "king-side-castle" | "queen-side-castle";
}

export interface PromotionMove extends BaseMove {
  flag: "promotion" | "promotion-capture";
  promotion: PromotionPiece;
}

export type Move =
  | NormalMove
  | CaptureMove
  | DoublePawnPushMove
  | EnPassantMove
  | CastleMove
  | PromotionMove;
