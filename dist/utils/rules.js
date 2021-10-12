"use strict";

var _graphqlShield = require("graphql-shield");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const APP_SECRET = 'GraphQL-is-aw3some';
const rules = {
  isAuthenticated: (0, _graphqlShield.rule)({
    cache: 'contextual'
  })(async (parent, args, ctx, info) => {
    const authHeader = ctx.req.get('Authorization');

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');

      if (!token) {
        throw new Error('No token found');
      }

      const {
        userId
      } = _jsonwebtoken.default.verify(token, APP_SECRET);

      return userId ? true : false;
    }

    return new Error('Authentication header must be provided');
  })
};
const permission = (0, _graphqlShield.shield)({
  Query: {
    feed: rules.isAuthenticated
  },
  Mutation: {
    post: rules.isAuthenticated,
    updatePost: rules.isAuthenticated
  }
});
module.exports = permission;