import express from "express";
import paypal from "@paypal/checkout-server-sdk";
import "dotenv/config";
import fs from 'fs';      // Node.js file system module
import path from 'path';  // Node.js path module

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const app = express();
app.use(express.json());

// 1. Configure PayPal Environment
const environment = new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

// 2. Create the 'orders' directory to store receipts
const ordersDir = path.join(process.cwd(), 'orders');
if (!fs.existsSync(ordersDir)){
    fs.mkdirSync(ordersDir);
    console.log("✅ 'orders' directory created.");
}

// 3. Create an Order
// This route is called by the PayPal button on your website.
app.post("/api/orders", async (req, res) => {
    const { cart } = req.body;
    // Simple calculation of total amount. In a real app, you'd get this from your database.
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [{
            amount: {
                currency_code: "USD",
                value: total.toFixed(2),
            },
        }],
    });

    try {
        const order = await client.execute(request);
        res.status(201).json({ orderID: order.result.id });
    } catch (err) {
        console.error("Failed to create order:", err);
        res.status(500).send(err.message);
    }
});

// 4. Capture an Order and Save the Receipt
// This route is called after the user approves the payment in the PayPal popup.
app.post("/api/orders/:orderID/capture", async (req, res) => {
    console.log("SERVER: Capture route hit! Order ID:", req.params.orderID); // 👈 ADD THIS LINE
    const { orderID } = req.params;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    

    try {
        const capture = await client.execute(request);
        const captureResult = capture.result;
        
        // This is where we save the receipt to a file
        const transactionId = captureResult.id;
        const filePath = path.join(ordersDir, `${transactionId}.json`);
        
        // Convert the JSON object to a nicely formatted string and write it to a file
        fs.writeFileSync(filePath, JSON.stringify(captureResult, null, 2));

        console.log(`✅ Payment successful! Receipt saved to: ${filePath}`);

        // Send the successful response back to the website
        res.status(201).json(captureResult);
        
    } catch (err) {
        console.error("Failed to capture order:", err);
        res.status(500).send(err.message);
    }
});

// 5. Start the server
app.listen(3000, () => {
    console.log("🚀 Server is running on http://localhost:3000");
});