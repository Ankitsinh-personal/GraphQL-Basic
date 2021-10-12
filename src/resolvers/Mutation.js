const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const APP_SECRET = 'GraphQL-is-aw3some';

const Mutation = {
    post(parent, args,ctx, info) {
        const newLink = ctx.prisma.link.create({
            data: {
              url: args.url,
              description: args.description,
              postedBy: { connect: { id: ctx.userId } },
            },
          })
          return newLink
    },
    deletePost(parent, args, ctx,info){
      try{
        const deletePost = ctx.prisma.link.delete({
          where:{
            id : parseInt(args.id)
          },
        })
        return deletePost
      }catch(e){
        throw new Error("delet post error")
      }
    },
    updatePost(parent, args, ctx, info){
      const post = ctx.prisma.link.update({
        where:{
          id:parseInt(args.id)
        },
        data:{
          url:args.data.url
        }
      })
      return post
    },
    async signup(parent, args, ctx, info){
      const password = await bcrypt.hash(args.password, 10)
      const user =  await ctx.prisma.user.create({data:{...args,password}})
      const token = jsonwebtoken.sign({userId:user.id},APP_SECRET)
      return {
        token,
        user
      }
    },
    login(parent, args, ctx, info){
      return ctx.prisma.user.findUnique({
        where: {
          email: args.email,
        },
    })
  }
}

module.exports = Mutation