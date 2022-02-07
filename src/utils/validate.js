export const validateCode = (code) => {
  if (
    Number(code.discountType) === 1 &&
    (Number(code.discountValue) < 0 || Number(code.discountValue) > 100)
  )
    return "discountValue invalid";

  if (code.discountCode.search(" ") >= 0)
    return "discountCode dosen't have space";
  return 1;
};

export const validatePromotion = (promotion) => {
  if (
    Number(promotion.discountType) === 1 &&
    (Number(promotion.discountValue) < 0 ||
      Number(promotion.discountValue) > 100)
  )
    return "discountValue invalid";
  return 1;
};
