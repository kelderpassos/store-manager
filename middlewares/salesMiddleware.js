const validations = {
  isProductIdValid: (req, res, next) => {
    const { body } = req;

    const ids = body.every((sale) => sale.productId);

    if (!ids) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    next();
  },

  isProductQuantityValid: (req, res, next) => {
    const { body } = req;

    const quantityExists = body.every((sale) => sale.quantity);
    if (!quantityExists) {
      return res.status(400).json({ message: '"quantity" is required' });
    }

    const validAmount = body.every((sale) => sale.quantity >= 1);
    if (!validAmount) {
      return res
        .status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }

    next();
  },
  // isProductQuantityOverZero: (req, res, next) => {
  //   const { body } = req;
  //   const validAmount = body.every((sale) => sale.quantity >= 1);
  //   if (!validAmount) {
  //     return res
  //       .status(422)
  //       .json({ message: '"quantity" must be greater than or equal to 1' });
  //   }

  //   next();
  // },
};

module.exports = validations;