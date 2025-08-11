import {join} from "path";
import {Request, Response} from "express";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const functions = require("firebase-functions");

const app = async () => {
  const serverPath = join(__dirname, "..", "dist", "server", "server.mjs");
  const {reqHandler} = await import(serverPath);
  return reqHandler;
};

exports.ssr = functions.https.onRequest(async (req: Request, res: Response) => {
  const handler = await app();
  return handler(req, res);
});
