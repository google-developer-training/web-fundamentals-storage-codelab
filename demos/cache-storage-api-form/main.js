// Copyright 2022 Google LLC.
// SPDX-License-Identifier: Apache-2.0

/*

 This function receives three arguments:

- log: A function, used for debugging only, to assist you while completing this exercise. You can use it like this: `log("Message to log to the page, and to the DevTools console")`.

- updateCouponMessage: A function to write the coupon message to the page. You can use it like this: `updateCouponMessage("coupon code 1234")`.

- url: A URL object which represents the server URL which returns a coupon code. You can use it like this: `new Request(url)`.

*/

async function solution(log, updateCouponMessage, url) {
	/* Only write JavaScript code below */
	log("Live");
	console.log(url);
	const request = new Request(url);
	const response = await fetch(request);
	const couponCode = await response.text();
	updateCouponMessage(couponCode);
	/* Only write JavaScript code above */
}

export default solution;
