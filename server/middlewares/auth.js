const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  // const { authorization } = req.headers;

  const token = req.cookies.token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'please log in first' });
  }

  try {
    const result = await jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    //  send user id and user type to the next request
    req.userId = result.userId;
    next();
    // console.log(result)
  } catch (err) {
    res.status(401).json({ message: 'please log in first' });
  }
};

module.exports = auth;