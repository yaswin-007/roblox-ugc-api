import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/ugc", async (_req, res) => {
  const url =
    "https://catalog.roblox.com/v1/search/items/details?Category=11&SortType=3&Limit=25";

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; UGCAPI/1.0; +https://render.com)",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Roblox API responded with:", response.status);
      return res.status(502).json({ error: "Roblox API error", code: response.status });
    }

    const raw = await response.json();
    const items = (raw.data || []).map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      creator: i.creatorName,
      thumbnail: i.thumbnailImage?.imageUrl || null,
    }));

    res.json(items);
  } catch (err) {
    console.error("Fetch failed:", err);
    res.status(500).json({ error: "Could not reach Roblox Catalog." });
  }
});

app.listen(PORT, () => console.log(`UGC API running on port ${PORT}`));

  }
});

app.listen(PORT, () => console.log(`UGC API running on port ${PORT}`));

