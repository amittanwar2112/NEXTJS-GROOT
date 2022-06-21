export function updatePing(hasVendorLoaded) {
  const pageSeenProp = 'pageSeen';
  if (typeof window !== 'undefined' && pageSeenProp in window) {
    if (hasVendorLoaded && !window.vendorLoaded) {
      window.vendorLoaded = true;
      window.pageSeen('vendorLoaded');
    }
    if (!hasVendorLoaded && !window.jsLoaded) {
      window.jsLoaded = true;
      window.pageSeen(true);
    }
  }
}
