import { PrismaClient } from "@prisma/client";

const prismaclientSingleton = () => {
    return new PrismaClient();
}

// @ts-ignore
const prisma = globalThis.prisma ?? prismaclientSingleton();

// @ts-ignore
if(process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;