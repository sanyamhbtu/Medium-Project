import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from 'hono/jwt';
import { createBlogInput,updateBlogInput } from "@eye_uchiha/medium123";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    const token = jwt.split(' ')[1];
    if (!token) {
        c.status(401);
        return c.json({ error: "invalid token format" });
    }

    try {
        const payload = await verify(token, c.env.JWT_SECRET);
        console.log("JWT Payload:", payload);
        if (!payload || typeof payload.id !== 'string') {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        c.set('userId', payload.id);
        await next();
    } catch (e) {
        console.error(e);
        c.status(401);
        return c.json({ error: "invalid or expired token" });
    }
});

blogRouter.post("/create", async (c) => {
    const authorId = c.get("userId");
    console.log("Author ID:", authorId); 
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411); 
      return c.json({
        message: "Inputs are not valid"
      })
    }
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId, 
        },
    });

    console.log("Blog Author ID:", blog.authorId);
    return c.json({
        id: blog.authorId,
    });
});

blogRouter.put("/update", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411); 
      return c.json({
        message: "Inputs are not valid"
      })
    }
        await prisma.blog.update({
            where: { id: body.userId },
            data: { title: body.title, content: body.content },
        });
        return c.text("updated post");
    } catch (error) {
        console.error("Error updating blog:", error);
        return c.json({ error: "Failed to update blog" }, 500);
    }
});

blogRouter.get("/getBlog", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: body.id,
            },
        });
        return c.json({ blog });
    } catch {
        return c.json({
            message: "blog not found",
        });
    }
});

blogRouter.get('/getBlogs', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany();
    return c.json({ blogs });
});
