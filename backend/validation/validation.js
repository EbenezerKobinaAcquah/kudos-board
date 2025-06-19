// validate create board

const validateCreateBoard = (req, res, next) => {
  const {
    body: { title, category, author },
  } = req;
  if (title && category) {
    next();
  } else {
    res.status(400).json({
      error: "Title and Category are required fields",
    });
  }
};

const validateBoardCardId = (req, res, next) => {
  const {
    body: { id },
  } = req;
  if (id) {
    next();
  } else {
    res.status(400).json({ error: "Id is required" });
  }
};

export default {
  validateCreateBoard,
  validateBoardCardId,
};
