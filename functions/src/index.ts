import functions from 'firebase-functions';
import express from 'express';
import { Request, Response } from "express";
import { ngExpressEngine } from "@nguniversal/express-engine";
import { join } from 'path';
const { AppServerModule } = require("./dist/server/main");

const app = express();
app.engine("html", ngExpressEngine({
    bootstrap: AppServerModule,
}));
app.set("view engine", "html");
app.set("views", join(__dirname, "dist", "browser"));
app.get("*.*", express.static(join(__dirname, "dist", "browser")));
app.get("*", (req: Request, res: Response) => {
    res.render("index", { req });
});

exports.ssr = functions.https.onRequest(app);
