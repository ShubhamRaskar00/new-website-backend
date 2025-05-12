// --- START OF FILE middleware/catchAsyncErrors.js ---

// Corrected: This function takes the async route handler function (fn) as input
module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next); // If fn rejects, catch the error and pass it to the main error handler
};

// --- END OF FILE middleware/catchAsyncErrors.js ---
