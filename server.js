import express from "express";
import paypal from "@paypal/checkout-server-sdk";
import "dotenv/config";
import fs from 'fs';
import path from 'path';

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const app = express();
app.use(express.json());

const environment = new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

// --- CSV File Setup ---
const ordersDir = path.join(process.cwd(), 'orders');
if (!fs.existsSync(ordersDir)){
    fs.mkdirSync(ordersDir);
}
const ordersFilePath = path.join(ordersDir, 'orders.csv');

// Add the new "Items Ordered" column to the headers
const csvHeaders = "Transaction ID,Order Date,Customer Name,Customer Email,Amount,Items Ordered,Street Address,City,State,Postal Code\n";

if (!fs.existsSync(ordersFilePath)) {
    fs.writeFileSync(ordersFilePath, csvHeaders);
    console.log("✅ orders.csv created with headers inside the 'orders' folder.");
}
// --- End CSV Setup ---

// Create an Order route (remains the same)
app.post("/api/orders", async (req, res) => {
    const { cart } = req.body;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
        res.status(500).send(err.message);
    }
});

// Capture an Order and save to CSV
app.post("/api/orders/:orderID/capture", async (req, res) => {
    const { orderID } = req.params;
    // Get the cart from the request body
    const { cart } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        const captureResult = capture.result;

        // --- Extract Data for CSV ---
        const transactionId = captureResult.id;
        const orderDate = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
        const customerName = `${captureResult.payer?.name?.given_name || ''} ${captureResult.payer?.name?.surname || ''}`.trim();
        const customerEmail = captureResult.payer?.email_address || "N/A";
        const amount = captureResult.purchase_units?.[0]?.amount?.value || "0.00";

        // --- NEW: Format the cart items into a single string ---
        const itemsOrdered = cart.map(item =>
            `${item.flavor.replace(/_/g, ' ')} (${item.size}, Qty: ${item.quantity})`
        ).join('; '); // Semicolon-separated list of items
        // --- End of new part ---

        const shipping = captureResult.purchase_units?.[0]?.shipping;
        const streetAddress = shipping?.address?.address_line_1 || "N/A";
        const city = shipping?.address?.admin_area_2 || "N/A";
        const state = shipping?.address?.admin_area_1 || "N/A";
        const postalCode = shipping?.address?.postal_code || "N/A";

        // Add the new itemsOrdered string to the CSV row
        const newRow = `"${transactionId}","${orderDate}","${customerName}","${customerEmail}","${amount}","${itemsOrdered}","${streetAddress}","${city}","${state}","${postalCode}"\n`;

        fs.appendFileSync(ordersFilePath, newRow);
        console.log("✅ Order successfully saved to orders.csv with item details!");

        res.status(201).json(captureResult);
        
    } catch (err) {
        console.error("Failed to capture order or write to file:", err);
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => {
    console.log("🚀 Server is running on http://localhost:3000");
});