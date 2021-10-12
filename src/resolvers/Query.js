const Query = {
    info: () => `This is the API of a Hackernews Clone`,
    feed(parent, args, ctx, info) {
        const where = args.filter ? {
            OR: [
                {
                    description:
                        { contains: args.filter }
                },
                {
                    url:
                        { contains: args.filter }
                }
            ]
        } : {}
        const links = ctx.prisma.link.findMany({
            where,
            skip: args.skip,
            take: args.take,
            orderBy:args.orderBy
        })
        return links
    },
}

module.exports = Query