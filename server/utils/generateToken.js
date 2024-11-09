
const jwt = require('jsonwebtoken');
function generateJWT(jwtPayload) {
  const privateKey = process.env.JWT_SECRET;
  const token = jwt.sign({ userId: jwtPayload }, privateKey, {
    expiresIn: '24h'
  });
  return token;
}
function setCookie(res, jwtPayload) {
  const token = generateJWT(jwtPayload);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: true,
    sameSite: 'lax',
  });
}




module.exports = { setCookie };