// Copyright 2022 Google LLC.
// SPDX-License-Identifier: Apache-2.0

// Don't edit any code in this file

import { get, set, keys } from "https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm";
import cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/+esm";

let CACHE_KEY_INDEX;
let CACHE_KEY = `codelab`;
const CACHE_KEY_INDEX_KEY = `${CACHE_KEY}_CACHE_KEY_INDEX_KEY`;
const button = document.querySelector("#populate");

function getOrSetCacheKeyIndex() {
	CACHE_KEY_INDEX = localStorage.getItem(CACHE_KEY_INDEX_KEY);
	if (!CACHE_KEY_INDEX) {
		CACHE_KEY_INDEX = 0;
		localStorage.setItem(CACHE_KEY_INDEX_KEY, CACHE_KEY_INDEX);
	}
}

function populateLocalStorage() {
	localStorage.setItem(
		`${CACHE_KEY}_${CACHE_KEY_INDEX}_vendor`,
		navigator.vendor
	);
	localStorage.setItem(
		`${CACHE_KEY}_${CACHE_KEY_INDEX}_message`,
		"Hi! This is your local storage"
	);
}

function populateCookieStorage() {
	document.cookie = `${CACHE_KEY}_${CACHE_KEY_INDEX}_vendor=${navigator.vendor}; `;
	document.cookie = `${CACHE_KEY}_${CACHE_KEY_INDEX}_message=Hello, this is a cookie!; `;
}

async function populateCacheStorage() {
	const cache = await caches.open(`${CACHE_KEY}_cache`);
	await cache.add(new Request(`lorem.txt?q=${CACHE_KEY_INDEX}`));
	await cache.add(new Request(`something.txt?q=${CACHE_KEY_INDEX}`));
}

async function populateIndexedDBStorage() {
	await set(`${CACHE_KEY}_${CACHE_KEY_INDEX}_vendor`, navigator.vendor);
	await set(
		`${CACHE_KEY}_${CACHE_KEY_INDEX}_message`,
		"Hello, this is data in IndexedDB!"
	);
}

async function populateAllStorage() {
	populateLocalStorage();
	populateCookieStorage();
	await populateCacheStorage();
	await populateIndexedDBStorage();
}

function updateCacheKeyIndex() {
	getOrSetCacheKeyIndex();
	CACHE_KEY_INDEX++;
	localStorage.setItem(CACHE_KEY_INDEX_KEY, CACHE_KEY_INDEX);
}

function handlePopulateButton() {
	button.addEventListener("click", async () => {
		button.disabled = true;
		updateCacheKeyIndex();
		await populateAllStorage();
		await checkExistingStorageData();
		button.disabled = false;
	});
}

function checkLocalStorage() {
	const localStorageKeysWithoutCacheKeyIndex = Object.keys(
		localStorage
	).filter((item) => item !== CACHE_KEY_INDEX_KEY);
	const length = localStorageKeysWithoutCacheKeyIndex.length;
	document.querySelector("#localStorage").textContent = `${length} items`;
}

function checkCookieStorage() {
	const length = Object.keys(cookies.get()).length;

	document.querySelector("#cookieStorage").textContent = `${length} items`;
}

async function checkCacheStorage() {
	const cache = await caches.open(`${CACHE_KEY}_cache`);
	const length = (await cache.keys()).length;
	document.querySelector("#cacheStorage").textContent = `${length} items`;
}

async function checkIndexedDBStorage() {
	const allKeysLength = (await keys()).length;
	document.querySelector(
		"#indexedDBStorage"
	).textContent = `${allKeysLength} items`;
}

async function checkExistingStorageData() {
	console.log("Checking storage!");
	checkLocalStorage();
	checkCookieStorage();
	await checkCacheStorage();
	await checkIndexedDBStorage();
}

function frequentlyCheckExistingStorageData() {
	setTimeout(async () => {
		try {
			await checkExistingStorageData();
			frequentlyCheckExistingStorageData();
		} catch (error) {
			console.log("There was an error while checking storage", error);
			document.querySelector("#output").textContent =
				"There was an error while checking storage, please reload the page.";
		}
	}, 3000);
}

async function start() {
	getOrSetCacheKeyIndex();
	handlePopulateButton();
	await checkExistingStorageData();
	frequentlyCheckExistingStorageData();
}

start();
