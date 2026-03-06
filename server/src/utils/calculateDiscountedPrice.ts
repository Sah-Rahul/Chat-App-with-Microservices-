export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number,
): number => {
  if (!discountPercentage || discountPercentage === 0) return price;
  const discountAmount = (price * discountPercentage) / 100;
  return Math.round(price - discountAmount);
};