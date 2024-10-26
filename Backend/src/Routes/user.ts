import { Hono } from "hono";
import { signupInput,signinInput } from "@eye_uchiha/medium123";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET : string
      };
}>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(411); 
      return c.json({
        message: "Inputs are not valid"
      })
    }
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
        },
      });
        const jwt = await sign({userId:user.id},c.env.JWT_SECRET);
        console.log("signup ok")
        return c.json({jwt})
    } catch (e) {
        c.status(403)
        return c.json({ error: "User creation failed", details: "e.message" });
    }
  });
  
  userRouter.post("/signin", async (c) => {
     const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
     }).$extends(withAccelerate());
     const body = await c.req.json();
     const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(411); 
      return c.json({
        message: "Inputs are not valid"
      })
    }
     const user = await prisma.user.findUnique({
      where : {
        email : body.email,
        password: body.password
      }
     })
     if(!user){
      c.status(403);
      return c.json({error: "User not found"})
     }
     const jwt = await sign({id : user.id},c.env.JWT_SECRET)
     return c.json({jwt});
  });