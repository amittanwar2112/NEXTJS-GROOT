import { getCurrentState } from '../../containers/Review/ReviewContextProvider';
import * as pushToGaGeneric from './index.js';

function getFlavour() {
  const { isMobile = false } = getCurrentState();
  return isMobile ? 'mweb' : 'dweb';
}

export const pushToGa = (event, data) => {
  data.flavour = getFlavour();
  pushToGaGeneric.pushToGa(event, data);
};
