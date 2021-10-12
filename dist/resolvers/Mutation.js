"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const jsonwebtoken = require("jsonwebtoken");

const bcrypt = require('bcryptjs');

const APP_SECRET = 'GraphQL-is-aw3some';
const Mutation = {
  post(parent, args, ctx, info) {
    const newLink = ctx.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        postedBy: {
          connect: {
            id: ctx.userId
          }
        }
      }
    });
    return newLink;
  },

  deletePost(parent, args, ctx, info) {
    try {
      const deletePost = ctx.prisma.link.delete({
        where: {
          id: parseInt(args.id)
        }
      });
      return deletePost;
    } catch (e) {
      throw new Error("delet post error");
    }
  },

  updatePost(parent, args, ctx, info) {
    const post = ctx.prisma.link.update({
      where: {
        id: parseInt(args.id)
      },
      data: {
        url: args.data.url
      }
    });
    return post;
  },

  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.prisma.user.create({
      data: _objectSpread(_objectSpread({}, args), {}, {
        password
      })
    });
    const token = jsonwebtoken.sign({
      userId: user.id
    }, APP_SECRET);
    return {
      token,
      user
    };
  },

  login(parent, args, ctx, info) {
    return ctx.prisma.user.findUnique({
      where: {
        email: args.email
      }
    });
  }

};
module.exports = Mutation;