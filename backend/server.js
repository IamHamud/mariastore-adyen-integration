// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); 
const { Client, CheckoutAPI } = require("@adyen/api-library");

// Load environment variables from .env
dotenv.config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Adyen API client
const client = new Client({
  apiKey: process.env.ADYEN_API_KEY,
  environment: "TEST", // Change to "LIVE" when you go live
});
const checkoutAPI = new CheckoutAPI(client);

// Helper: Generate a simple unique reference (for demo)
const generateReference = () => `ORDER-${Date.now()}`;

// POST /api/sessions to create a payment session
app.post("/api/sessions", async (req, res) => {
  try {
    const {
      amount,
      currency,
      countryCode,
      shopperLocale,
      shopperEmail,
      shopperReference,
      returnUrl,
      expiresAt,
    } = req.body;

    const sessionRequest = {
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
      amount: {
        value: amount, // Amount in minor units (e.g., 1000 = €10.00)
        currency: currency || "EUR",
      },
      reference: generateReference(),
      returnUrl: returnUrl || "https://your-company.com/success.html", // Replace with your frontend return URL
      countryCode: countryCode || "NL",
      channel: "Web",
      ...(shopperLocale && { shopperLocale }),
      ...(shopperEmail && { shopperEmail }),
      ...(shopperReference && { shopperReference }),
      ...(expiresAt && { expiresAt }), // Optional: expiry time in ISO8601
    };

    // Call Adyen's sessions API
    const response = await checkoutAPI.PaymentsApi.sessions(sessionRequest);

    // Return session data to frontend
    res.status(200).json(response);
  } catch (error) {
    // Error handling
    console.error("Adyen session error:", error);
    res.status(500).json({ error: error.message || "Adyen session creation failed" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
