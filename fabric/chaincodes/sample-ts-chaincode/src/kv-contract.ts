import { Context, Contract } from "fabric-contract-api";
import { createHash } from "crypto";

export class KVContract extends Contract {
    constructor() {
        super("KVContract");
    }

    async instantiate() {
        // function that will be invoked on chaincode instantiation
    }

    async put(ctx: Context, key: string, value: string): Promise<{ success: string }> {
        await ctx.stub.putState(key, Buffer.from(value));
        return { success: "OK" };
    }

    async get(ctx: Context, key: string) {
        const buffer = await ctx.stub.getState(key);
        if (!buffer || !buffer.length) return { error: "NOT_FOUND" };
        return { success: buffer.toString() };
    }

    async putPrivateMessage(ctx: Context, collection: string) {
        const transient = ctx.stub.getTransient();
        const message = transient.get("message");
        await ctx.stub.putPrivateData(collection, "message", message);
        return { success: "OK" };
    }

    async getPrivateMessage(ctx: Context, collection: string) {
        const message = await ctx.stub.getPrivateData(collection, "message");
        const messageString = Buffer.from(message).toString();
        return { success: messageString };
    }

    async verifyPrivateMessage(ctx: Context, collection: string) {
        const transient = ctx.stub.getTransient();
        const message = transient.get("message");
        const messageString = Buffer.from(message).toString();
        const currentHash = createHash("sha256").update(messageString).digest("hex");
        const privateDataHash = (await ctx.stub.getPrivateDataHash(collection, "message")).toString();
        if (privateDataHash !== currentHash) {
            return { error: "VERIFICATION_FAILED" };
        }
        return { success: "OK" };
    }
}