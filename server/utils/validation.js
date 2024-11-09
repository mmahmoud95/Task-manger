const z = require("zod");

const userValidation = z.object({
  name: z.string().min(5, "Name is required and must be at least 5 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

module.exports = userValidation;