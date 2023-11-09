// Copyright 2022 Google LLC.
// SPDX-License-Identifier: Apache-2.0

// Don't edit any code in this file

import express from "express";
import cors from "cors";
import serveIndex from "serve-index";

const app = express();
const port = 3000;

const publicDir = process.cwd() + "/demos";

function sleep(ms = 1000) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms);
	});
}

app.use(cors());

app.get("/cache-demo", async (req, res) => {
	const result = Object.values(req.query).join("_");
	await sleep();
	res.send(`COUPON_${result.toUpperCase()}`);
});

app.get("/error", async (req, res) => {
	res.status(500).send(`Simulated error from the server`);
});

app.get("/cookie-server", (req, res, next) => {
	res.cookie("codelab_some_private_info", "private_value", {
		httpOnly: true,
	});

	res.cookie("codelab_color_scheme", "dark");

	res.cookie("codelab_registered", "true");

	res.cookie("codelab_server_key", "12345", {
		httpOnly: true,
	});

	next();
});

app.use(express.static(publicDir));

app.use("/", serveIndex(publicDir, { icons: true }));

app.listen(port, () => {
	console.log(`App running at http://localhost:${port}`);
});
