// Copyright 2022 Google LLC.
// SPDX-License-Identifier: Apache-2.0

// Don't change any of this code

import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/+esm";

function writeOutput(str) {
	const li = document.createElement("li");
	li.innerText = str;
	document.querySelector("#output").appendChild(li);
}

function setup() {
	const allCookies = Cookies.get();
	for (const [name, value] of Object.entries(allCookies)) {
		writeOutput(`${name} = ${value}`);
	}
}

setup();
