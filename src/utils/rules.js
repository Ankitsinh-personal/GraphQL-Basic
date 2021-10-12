import { rule, shield, and, or } from 'graphql-shield'
import JWT from 'jsonwebtoken'
const APP_SECRET = 'GraphQL-is-aw3some';

const rules = {
    isAuthenticated: rule({ cache: 'contextual' })(
        async (parent, args, ctx, info) => {
            const authHeader = ctx.req.get('Authorization');
            if (authHeader) {
                const token = authHeader.replace('Bearer ', '');
                if (!token) {
                    throw new Error('No token found');
                }
                const { userId } = JWT.verify(token, APP_SECRET);
                return userId?true:false
            }
            return new Error('Authentication header must be provided')
        },
    ),
}

const permission=shield({
    Query:{
        feed:rules.isAuthenticated   
    },
    Mutation:{
        post:rules.isAuthenticated,
        updatePost: rules.isAuthenticated,
    }
})
module.exports = permission