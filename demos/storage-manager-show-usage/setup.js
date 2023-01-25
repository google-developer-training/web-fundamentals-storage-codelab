// Copyright 2022 Google LLC.
// SPDX-License-Identifier: Apache-2.0

/* Don't edit this file */

const maxBytes = 1_000_000;

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

async function populateCacheBy(amountInBytes) {
	if (amountInBytes > maxBytes || !Number.isInteger(amountInBytes)) {
		throw new Error("That increment is too high!");
	}
	let hello = new Uint8Array(new Array(amountInBytes).fill("a"));
	let blob = new Blob([hello], { type: "text/plain" });
	let opts = { status: 200, statusText: "Success!" };
	let myResponse = new Response(blob, opts);
	let cache = await caches.open("codelab_cache1");
	await cache.put(`/foo.txt?random?=${random(10000, 100000)}`, myResponse);
}

function writeOutput(text) {
	const li = document.createElement("li");
	li.textContent = text;
	document.querySelector("#output").appendChild(li);
}

async function handleForm() {
	const form = document.querySelector("form");
	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		const formData = new FormData(form);
		const amountInBytes = parseInt(formData.get("storage"));
		try {
			await populateCacheBy(amountInBytes);
			writeOutput("Storage updated");
		} catch (err) {
			console.log("There was an error populating the cache", err);
			writeOutput("There was an error populating the cache");
		}
	});
}

function doesSupportStorageMethod() {
	return "storage" in navigator && "estimate" in navigator.storage;
}

async function start() {
	if (doesSupportStorageMethod()) {
		await handleForm();
		import(new URL("main.js", import.meta.url));
	} else {
		const message =
			"Error: This browser does not support the navigator.storage.estimate() method. Please use a different browser.";
		console.log(message);
		writeOutput(message);
		document.querySelector("form button").disabled = true;
	}
}

start();

/* Don't edit this file */
