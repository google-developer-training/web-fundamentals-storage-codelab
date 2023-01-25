// Copyright 2022 Google LLC.
// SPDX-License-Identifier: Apache-2.0

// Don't edit any code in this file

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkSolution(event) {
	event.preventDefault();
	function writeOutput(messages) {
		document.querySelector("#output").innerHTML = messages.join("<br />");
	}
	const messages = [];
	for (const [key, value] of Object.entries(localStorage)) {
		const input = document.querySelector(`[name="${key}"]`);

		if (input.type === "email" || input.type === "text") {
			const inputValue = input.value;

			if (inputValue !== value) {
				messages.push(
					`Found a text or email input with the wrong value (can't find "${key}" with value "${value}")`
				);
			}
		} else if (input.type === "select-one") {
			const isSelected = input.querySelector(
				`[value="${value}"]`
			).selected;

			if (!isSelected) {
				messages.push(
					`Expected "${value}" to be selected with the "${key}" select dropdown`
				);
			}
		} else if (input.type === "radio") {
			const isChecked = document.querySelector(
				`[value="${value}"]`
			).checked;

			if (!isChecked) {
				messages.push(
					`Expected the "${value}" option to be checked, within the "${key}" group`
				);
			}
		}
	}

	writeOutput(messages.length ? messages : ["Great job! ✅ "]);
}

function setup() {
	const checkSolutionBtn = document.querySelector("#check-solution");
	const form = document.querySelector("form");
	const formInputs = form.querySelectorAll("[name]");
	const processedRadioNames = new Set();

	checkSolutionBtn.addEventListener("click", checkSolution);

	for (const el of formInputs) {
		const tagName = el.tagName;
		const type = el.type;

		if (type === "text") {
			const randomText = `${random(999, 9999)}`;
			el.value = randomText;
		} else if (type === "email") {
			const randomEmail = `${random(999, 9999)}@example.com`;
			el.value = randomEmail;
		} else if (type === "select-one") {
			const options = el.querySelectorAll("option");
			const randomOption = options[random(1, options.length - 1)];
			randomOption.selected = true;
		} else if (type === "radio") {
			const name = el.name;
			if (processedRadioNames.has(name)) {
				continue;
			}

			const radioInputs = form.querySelectorAll(`[name="${name}"]`);
			const randomRadio = radioInputs[random(0, radioInputs.length - 1)];
			randomRadio.checked = true;

			processedRadioNames.add(name);
		}
	}

	const formData = new FormData(form).entries();

	localStorage.clear();

	for (const [key, value] of formData) {
		localStorage.setItem(key, value);
	}

	form.reset();
}

setup();
