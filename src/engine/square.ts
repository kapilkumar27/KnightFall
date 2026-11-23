
import type { Square } from "./types.js";

const FILES = "abcdefgh";


//Converts algebraic notation (e.g. "e4") to a 0x88 index.
export function squareToIndex(square: string): Square {
  if (!/^[a-h][1-8]$/.test(square)) {
    throw new Error(`Invalid square: ${square}`);
  }

  const file = FILES.indexOf(square[0]!);
  const rank = Number(square[1]) - 1;

  return rank * 16 + file;
}


//Converts a valid 0x88 index to algebraic notation.
export function indexToSquare(index: Square): string {
  if (!Number.isInteger(index) || index < 0 || index > 127 || (index & 0x88) !== 0) {
    throw new Error(`Invalid 0x88 index: ${index}`);
  }

  const file = index & 7;
  const rank = (index >> 4) + 1;

  return `${FILES[file]}${rank}`;
}

//Checks whether an index represents a playable board square.
export function isValidSquare(index: number): boolean {
  return Number.isInteger(index) &&
    index >= 0 &&
    index < 128 &&
    (index & 0x88) === 0;
}
