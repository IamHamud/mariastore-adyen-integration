# MariaStore – Adyen Drop-in Integration

This project is a sample e-commerce checkout flow demonstrating Adyen’s Drop-in payment integration with a Node.js backend and a simple HTML/JS frontend.

---

## 🌟 Credits & Inspiration

Special thanks to the following brands and projects for their design, UI, and UX inspiration:

* [Gymshark UAE](https://www.gymshark.ae)
* [AYBL](https://www.aybl.com)
* [DFYNE](https://dfyne.com)
* [Aligne](https://aligne.co)
* [SQUATWOLF](https://squatwolf.com)
* [Adyen Documentation](https://docs.adyen.com)
* [Shopify Example Stores](https://www.shopify.com/examples)

---

## 🛠️ Technologies Used

**Frontend:**

* HTML, CSS, JavaScript
* [Tailwind CSS](https://tailwindcss.com)
* [Adyen Web Drop-in (via CDN)](https://docs.adyen.com/online-payments/web-drop-in/)

**Backend:**

* Node.js
* Express.js
* [Adyen API Library for Node.js](https://github.com/Adyen/adyen-node-api-library)
* CORS
* dotenv

---

## 🏗️ Project Structure

```
/src
  /pages
    checkout.html
    success.html
    failure.html
  /js
    checkout.js
  /css
    style.css
server.js
.env
README.md
.gitignore
package.json
```

---

## 🚀 Quick Start

### 1. Clone this repo

```bash
git clone https://github.com/YOUR-USERNAME/mariastore-adyen-integration.git
cd mariastore-adyen-integration
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Create `.env` file with your Adyen credentials

```env
ADYEN_API_KEY=your_adyen_api_key
ADYEN_MERCHANT_ACCOUNT=your_adyen_merchant_account
ADYEN_CLIENT_KEY=your_adyen_client_key
```

### 4. Start backend server

```bash
npm start
```

### 5. Run the frontend

You can use **Live Server** (VS Code extension) or simply open `src/pages/checkout.html` directly in your browser.

> **Note:** Make sure to configure allowed origins and redirect URLs in your Adyen dashboard.

---

## 💳 Adyen Drop-in Integration

* This project demonstrates using the [Adyen Drop-in](https://docs.adyen.com/online-payments/web-drop-in/) with all available payment methods.
* The Drop-in is rendered using Adyen’s CDN, not via npm package.
* Configuration and session creation are handled via a Node.js backend (`server.js`).

---

## ⚠️ Security & Best Practices

* **Never** expose your API key or merchant account on the frontend.
* Only the public **Client Key** should be used in frontend code.
* Always use environment variables and `.env` for secrets.
* Add `.env` to your `.gitignore`.

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

This project is for demo and learning purposes only and is not affiliated with the brands mentioned above.
Special Thanks to Adyen Team for the support!!. 
