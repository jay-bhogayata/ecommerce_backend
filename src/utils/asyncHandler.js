const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status((error.code && error.code < 511) || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export default asyncHandler;
