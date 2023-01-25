// Copyright 2022 Google LLC.
// SPDX-License-Identifier: Apache-2.0

import prettyBytes from "https://cdn.jsdelivr.net/npm/pretty-bytes/+esm";

function writeOutput(text) {
	const li = document.createElement("li");
	li.textContent = text;
	document.querySelector("#output").appendChild(li);
}

async function solution() {
	/* Write your solution below */
	/* Write your solution above */
}

solution();

/* Write another part of your solution here */
document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault();
	solution();
});
/* Write your solution above */
