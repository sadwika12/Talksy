import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
       user: { id: req.user?._id || req.ip } 
    });

    //console.log("Decision:", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: "Too many requests! Rate limit exceeded"
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          success: false,
          message: "Bots are not allowed"
        });
      }

      return res.status(403).json({
        success: false,
        message: "Access denied by security policy"
      });
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next();
  }
};
