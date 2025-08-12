export type BuilderState = {
  basePrice: number
  size: '6"' | '8"' | '10"' | '12"'
  flavor: string
  icing?: string
  addOns?: { plaque?: boolean; candles?: boolean; delivery?: boolean }
}

export function calcPrice(state: BuilderState) {
  const { basePrice, size, addOns } = state
  let total = basePrice
  const sizeMap: Record<BuilderState['size'], number> = {
    '6"': 0,
    '8"': 4000,
    '10"': 8000,
    '12"': 12000,
  }
  total += sizeMap[size]
  if (addOns?.plaque) total += 1500
  if (addOns?.candles) total += 1000
  if (addOns?.delivery) total += 3000
  return total
}
