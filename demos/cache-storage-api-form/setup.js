// Copyright 2022 Google LLC.
// SPDX-License-Identifier: Apache-2.0

/* Don't edit any of this JavaScript code */

function write(data) {
	console.log(data);
	const listItem = document.createElement("li");
	listItem.innerText = data;
	document.querySelector(".output").appendChild(listItem);
}

function updateCouponMessage(message) {
	document.querySelector('[type="submit"]').disabled = false;
	document.querySelector(
		".coupon-code"
	).textContent = `Your coupon code is: ${message}`;
}

async function setup() {
	const mainModule = await import(new URL("main.js", import.meta.url));

	const codelabCache = await caches.open("codelab_cache");

	document.querySelector("form").addEventListener("submit", async (event) => {
		event.preventDefault();
		let shouldSimulateError = false;
		const target = event.target;
		target.querySelector('[type="submit"]').disabled = true;
		const urlPath = target.getAttribute("action");

		const formData = new FormData(event.target);
		const constructedURL = new URL(location);
		constructedURL.pathname = urlPath;

		if (formData.get("simulate_error") === "yes") {
			shouldSimulateError = true;
		}

		formData.delete("simulate_error");

		constructedURL.search = new URLSearchParams(formData);

		let response = await codelabCache.match(constructedURL);

		if (!response && shouldSimulateError) {
			constructedURL.pathname = "error";
		}

		await mainModule.default(write, updateCouponMessage, constructedURL);
	});

	// document.querySelector("body > form > button").click();
}

setup();
