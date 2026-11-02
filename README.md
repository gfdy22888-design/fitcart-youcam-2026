# FitCart

**Your style. Before you buy.**

A considered-shopping companion for the YouCam API Skin AI & eCommerce VTO Hackathon: real garment try-on, side-by-side comparison, a budget-aware shortlist, and editable cost-per-wear estimates.

## Features

- Start with a sample or upload a JPG/PNG photo.
- Try curated garments or upload a garment you found elsewhere.
- Create and poll real YouCam AI Clothes V4 tasks through a server-side API.
- Reveal original/generated images with a slider; compare completed looks side by side.
- Save favorites, see spending and budget overshoot, and export a text shopping list.
- Change planned wears to compare value beyond a price tag.
- Responsive desktop and mobile studio.

Prices are illustrative SGD values, not live offers. Planned wears are user estimates. The app does not predict physical fit or make purchases. Reduced returns and more considered purchasing are hypotheses to test, not measured outcomes.

## Run

Requirements: Node.js 22.13+ and npm.

```sh
npm run install:ci
npm run dev
```

Open the Local URL printed by the server, normally http://127.0.0.1:5173. In **Connection settings**, paste your YouCam API key with available units. The key stays in current-tab memory, is sent only to this app's server and YouCam, and is not written to browser storage or source control. Refreshing clears it. Requests consume units in your account.

An owner-private deployment can configure the runtime secret `YOUCAM_API_KEY`. Do not operate a publicly writable service with an unrestricted shared key. Public operation needs authentication and account-specific usage controls, or user-supplied keys.

## End-to-end test

1. Connect a valid key with available units. Check permission/processing consent.
2. Click **Try it on**. The app uploads both images, creates a YouCam task, then polls every ten seconds.
3. Wait for the actual result and move the original/try-on slider.
4. Try a second garment and open **Compare looks**.
5. Save the S$69 linen shirt and S$98 jacket. Their total is S$167. Set budget to S$150 and verify S$17 over.
6. In **My shortlist**, change the shirt's planned wears to 60 and verify S$1.15 per wear.
7. Export the list, including item prices, total, budget, and planned wears.

Invalid keys, empty balances, invalid images, and failed tasks produce explicit errors. A failure is never replaced with a simulated successful preview.

## Architecture and privacy

React / Vinext → server endpoints → YouCam File API → signed image upload → AI Clothes V4 task → asynchronous polling.

- `POST /api/upload`: validates format/signature/size, obtains an upload URL, and sends bytes.
- `POST /api/try-on`: validates garment type and file IDs, then creates a task.
- `GET /api/try-on/:id`: returns normalized task status and actionable image errors.
- `GET /api/status`: reports whether a server key is configured, without revealing it.

The app does not write photos or API keys to a database. YouCam's data processing and retention terms apply. Catalog shortlist IDs and budget are stored locally. Custom images and result URLs are session-only; vendor URLs may expire. Production accounts, billing, persistent image storage, and public shared-key quotas are outside this prototype.

Official API docs: https://docs.perfectcorp.com/reference/ai_clothes/section/overview

## Checks

```sh
node node_modules/typescript/bin/tsc --noEmit
node scripts/run-framework.mjs build
node scripts/check-http.mjs
```

The HTTP check expects the dev server and does not call YouCam or consume units. See `ASSETS.md` for media provenance; MIT licensing applies to source code and does not override provider sample-media rights. AI tools assisted implementation and original catalog asset generation; virtual try-on outputs come from YouCam.

## Verified live integration — November 2, 2026

Two end-to-end tests passed through the actual application server: person upload, garment upload, AI Clothes V4 task creation, status polling, and result download. The linen shirt used upper_body and the chore jacket used outer. Actual YouCam images and task evidence are in submission/results/. These are recorded API results, not mocked previews. The tests used the public developer sample person and original generated garment inputs. No personal user photos were uploaded.

