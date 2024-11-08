// roleMiddleware.js
const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming role is attached to the request (e.g., via token decoding)

    if (userRole !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    next();
  };
};

module.exports = roleMiddleware;
