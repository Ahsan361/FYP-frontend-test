// middleware/rbac.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Optional auth: attach req.user if a valid Bearer token exists; otherwise continue.
export const optionalAuth = async (req, res, next) => {
  try {
    const h = req.headers.authorization || "";
    if (h.startsWith("Bearer ")) {
      const token = h.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("_id role username email is_active");
    }
  } catch (_) { /* ignore token errors here */ }
  return next();
};

// Strict auth: require a valid user.
export const protect = async (req, res, next) => {
  try {
    const h = req.headers.authorization || "";
    if (!h.startsWith("Bearer ")) return res.status(401).json({ message: "Not authorized, no token" });
    const token = h.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id role username email is_active");
    if (!user) return res.status(401).json({ message: "Not authorized" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Role gate: allow only listed roles.
export const authorize = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Login required" });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
  next();
};

// Global rule for resource routers: users may only GET/HEAD/OPTIONS; admin can write.
export const readOnlyUnlessAdmin = (req, res, next) => {
  const writeMethods = ["POST", "PUT", "PATCH", "DELETE"];
  if (writeMethods.includes(req.method)) {
    // If not logged in, block writes
    if (!req.user) return res.status(401).json({ message: "Login required" });
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admins only" });
  }
  next();
};
