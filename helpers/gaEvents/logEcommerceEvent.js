function logEcommerceEvent(data) {
	try {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push(data);
	} catch (error) {
		console.error(error);
	}
}

export default logEcommerceEvent;
