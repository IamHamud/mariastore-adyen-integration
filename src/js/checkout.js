// checkout.js

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Get cart total and currency (adapt as needed for your cart logic)
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const amountMinor = Math.round(totalAmount * 100); // e.g., 10.50 AED => 1050
  const currency = 'AED'; // Change if needed

  // 2. Prepare data for backend session creation
  const sessionPayload = {
    amount: amountMinor,
    currency: currency,
    countryCode: 'AE',          // Shopper country code (adjust if needed)
    shopperLocale: 'en-AE',     // UI language (adjust if needed)
    returnUrl: window.location.origin + '/success.html', // Must match Adyen allowed URLs
    // Optionally add shopperEmail, shopperReference, expiresAt, etc.
  };

  // 3. Call your backend to create a payment session
  let sessionData, clientKey;
  try {
    const response = await fetch('http://localhost:3000/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionPayload),
    });
    if (!response.ok) throw new Error('Session creation failed');
    const data = await response.json();
    sessionData = {
      id: data.id,
      sessionData: data.sessionData
    };
    clientKey = data.clientKey; // Replace if backend doesn't return
  } catch (err) {
    document.getElementById('payment-status').innerText = 'Error starting payment. Please try again later.';
    console.error('Adyen session error:', err);
    return;
  }

  // 4. Configure AdyenCheckout global configuration
  const globalConfig = {
    session: sessionData,
    environment: 'test', // Use 'live' for production
    clientKey: clientKey, // Public key from Adyen Customer Area
    amount: { value: amountMinor, currency },
    countryCode: sessionPayload.countryCode,
    locale: sessionPayload.shopperLocale,
    showPayButton: true,

    // Handle successful payment (stay on page, show message)
onPaymentCompleted: (result, component) => {
  // Only show success if resultCode is 'Authorised'
  if (result.resultCode === 'Authorised') {
    document.getElementById('payment-status').innerText = ' Payment successful!';
  } else {
    document.getElementById('payment-status').innerText =
      `Payment ${result.resultCode || "not successful"}.`;
  }
  console.log('Payment completed:', result);
},
onPaymentFailed: (result, component) => {
  document.getElementById('payment-status').innerText =
    'Payment failed or cancelled. Please try again.';
  console.warn('Payment failed:', result);
},


    onError: (error, component) => {
      // Handle Drop-in error
      document.getElementById('payment-status').innerText = 'A payment error occurred. Please refresh and try again.';
      console.error('Adyen error:', error.name, error.message, error.stack);
    },
    // Optional: add other handlers like beforeSubmit, onActionHandled, etc.
  };

  // 5. Create AdyenCheckout and mount Drop-in
  try {
    // Use the global object from the CDN
    const checkout = await window.AdyenCheckout(globalConfig);
    checkout.create('dropin').mount('#dropin-container');
  } catch (err) {
    document.getElementById('payment-status').innerText = 'Could not load payment form.';
    console.error('Adyen Drop-in load error:', err);
  }
});
