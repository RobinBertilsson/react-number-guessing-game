import { generateRandomNumber } from "./generateRandomNumber"

export function generateRandomNumberSerie(): number[] {
  const nums: number[] = []

  while (nums.length < 4) {
    const n = generateRandomNumber()

    if (nums.includes(n)) {
      continue;
    }

    nums.push(n)
  }

  return nums
}
