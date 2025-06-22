// Board Category Filter Enums (includes filter options)
export const BOARD_CATEGORIES = {
  ALL: "All",
  RECENT: "Recent",
  CELEBRATION: "Celebration",
  THANK_YOU: "Thank You",
  INSPIRATION: "Inspiration",
};

// Selectable Board Categories for creating boards
export const SELECTABLE_BOARD_CATEGORIES = {
  CELEBRATION: "Celebration",
  THANK_YOU: "Thank You",
  INSPIRATION: "Inspiration",
};

// Helper function to get all category values as array
export const getAllCategories = () => Object.values(BOARD_CATEGORIES);

// Helper function to get selectable category values as array
export const getSelectableCategories = () =>
  Object.values(SELECTABLE_BOARD_CATEGORIES);

// Helper function to sort boards from recent to oldest
export const sortBoardsByRecent = (boards) => {
  return [...boards].sort((a, b) => b.id - a.id);
};
