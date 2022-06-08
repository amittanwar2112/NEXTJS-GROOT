import logEcommerceEvent from './logEcommerceEvent';
import { getCurrentState } from '../../containers/Review/ReviewContextProvider';;

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const CHECKOUT = 'CHECKOUT';


function getSelectedTrainInfo() {
	const state = getCurrentState();
	const { train, availability={}, passengers, fare} = state;
	const { number, name } = train || {};
	const { class: travelClass='', price, quota, status = ''} = availability;
	const totalPrice = fare ? parseInt(fare.price) : '';
	const avlPrice = price ? parseInt(price) : '';

	const selectedTrainData = {
		id: parseInt(number) || -1,
		name,
		price: (totalPrice || avlPrice),
		travelClass: (travelClass || ''),
		quota: (quota ? quota.qt : ''),
		avl: status,
		category: 'trains',
		list: 'search_results'
	};

	if (passengers && passengers.length > 0) {
		selectedTrainData.quantity = passengers.length;
	}
 	return selectedTrainData;
}

function logAddToCartEcommerce() {
	const selectedTrainData = getSelectedTrainInfo();
	return {
		event: 'addToCart',
		ecommerce: {
			add: {
				products: [selectedTrainData]
			},
			currencyCode: 'INR',
		}
	};
}

function logCheckoutEcommerce() {
	const selectedTrainData = getSelectedTrainInfo();
	const ecommerce = {
		checkout: {
			actionField: {
				step: 1,
				option: "proceed_to_pay"
			},
			products: [selectedTrainData]
		}
	};
	return {
		event: 'checkout',
		ecommerce
	};
}

function logAddProductEcommerce() {
	const selectedTrainData = getSelectedTrainInfo();
	return {
		event: 'enhanced-ecommerce-dp',
		ecommerce: {
			detail: {
				actionField: {
					action: "detail",
					list: "search_results"
				},
				products: [selectedTrainData]
			}
		}
	};
}

export function logEcommerceDataInReview(type, data) {
	try {
		let logSpecificData = {};
		switch (type) {
			case ADD_PRODUCT:
				logSpecificData = logAddProductEcommerce(data);
				break;
			case ADD_TO_CART:
				logSpecificData = logAddToCartEcommerce(data);
				break;
			case CHECKOUT:
				logSpecificData = logCheckoutEcommerce(data);
				break;
		}
		const commonData = {
			path: window.location.pathname
		};
		const eCommerceData = { ...commonData, ...logSpecificData };
		logEcommerceEvent(eCommerceData);
	} catch (err) {
		console.log('Logging eCommerce event failed', err);
	}
}