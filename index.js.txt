import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/ugc", async (_req, res) => {
  try {
    const response = await fetch(
      "https://catalog.roblox.com/v1/search/items/details?Category=11&SortType=3&Limit=25"
    );
    const raw = await response.json();

    const items = raw.data.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      creator: i.creatorName,
      thumbnail: i.thumbnailImage?.imageUrl || null,
    }));

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not reach Roblox Catalog." });
  }
});

app.listen(PORT, () => console.log(`UGC API running on port ${PORT}`));
