# DealBridge Server (Vercel-ready)

This repository provides a small Node.js serverless backend suitable for deployment on Vercel.
It fetches promotion products from AliExpress, generates affiliate `s.click` links and provides a tracking endpoint (AfterShip).

## Included endpoints
- `GET /api/deals?q=keyword&page=1&pageSize=20` — fetch promotion products (cached)
- `GET /api/search?q=keyword&page=1&pageSize=20` — product search (cached)
- `GET /api/track?code=TRACKING_NUMBER` — query AfterShip for tracking details

## Setup (local / Vercel)
1. Copy `.env.example` to `.env` and fill real values (do NOT commit `.env`).
2. Install deps locally for testing:
   ```bash
   npm install
   node api/deals.js # only for quick local test via node (not exactly serverless)
   ```
3. Publish to GitHub and import into Vercel:
   - In Vercel dashboard, create a new project and import this repo.
   - Add Environment Variables in Vercel settings (ALIEXPRESS_APP_KEY, ALIEXPRESS_APP_SECRET, ALIEXPRESS_TRACKING_ID or AFF_SHORT_KEY, AFTERSHIP_API_KEY, CACHE_TTL_SECONDS)
   - Deploy.

## Notes
- Keep `ALIEXPRESS_APP_SECRET` private; use Vercel environment variables, do not commit to GitHub.
- Cache TTL can be tuned via `CACHE_TTL_SECONDS` env variable (default 1800 seconds = 30 minutes).
- If AliExpress returns non-JSON error (HTML), the endpoint returns the raw response to help debugging.
