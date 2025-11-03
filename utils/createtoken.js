const token = require(`jsonwebtoken`);

const createToken = (payload) => {
  return token.sign({ Userid: payload }, process.env.jwt_sectkey, {
    expiresIn: process.env.jwt_expected,
  });
};

module.exports = createToken;
