import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// اختبار الخادم
app.get("/", (req, res) => {
  res.json({ message: "✅ DealBridge API is running!" });
});

// جلب منتجات من AliExpress
app.get("/api/products", async (req, res) => {
  const query = req.query.q || "electronics";
  const url = `https://api-sg.aliexpress.com/sync/v1/listPromotionProduct?keywords=${encodeURIComponent(
    query
  )}&fields=product_id,product_title,target_original_price,target_sale_price,product_main_image_url,discount&page_no=1&page_size=10`;

  try {
    const response = await fetch(url);
    const data = await response.text(); // نقرأ النص أولا
    try {
      res.json({ success: true, data: JSON.parse(data) });
    } catch {
      res.json({ success: false, raw: data, message: "Response not JSON" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
