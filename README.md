# Campus Hiring Evaluation — Backend Submission

Clean-architecture Express backend, organized per the allowed package names:
`config`, `auth`, `middleware`, `utils`, `route`, `controller`, `service`,
`repository`, `domain`, `db`, `cache`, `cron_job`.

## Critical evaluation rules (from "Evaluation Considerations")

- **Time limit: 3 hours**, no extra time for pushing to GitHub — plan accordingly.
- **Mandatory logging**: every place you write code must use the `Log()` function
  from `middleware/logger.js` (which calls the Log API). Built-in language
  loggers or `console.log` are **not allowed** for actual logging — I've left
  a couple of `console.log`/`console.error` calls in `server.js` and
  `db/connection.js` for startup/dev convenience only; replace those with
  `Log(...)` calls before submitting, to be safe.
- **No auth/login on YOUR API**: the doc says to assume callers of your
  application/APIs are pre-authorised — your app **must not** require user
  registration or login. That's why the routes have no auth guard. The
  clientID/clientSecret + token flow in `auth/authStore.js` is only used
  *internally*, so your backend can authenticate itself when calling the
  upstream evaluation service's Vehicles/Depot/Notification APIs.

## Setup


1. `npm install`
2. Copy `.env.example` to `.env` and fill in your `EMAIL`, `NAME`, `MOBILE_NO`,
   `GITHUB_USERNAME`, `ROLL_NO`, `ACCESS_CODE`.
3. Register **once**:
   ```
   npm run register
   ```
   Copy the printed `CLIENT_ID` / `CLIENT_SECRET` into `.env`. You cannot
   retrieve these again, so save them immediately.
4. Start the server:
   ```
   npm start
   ```

## Endpoints exposed by this server

- `GET /health` — basic liveness check
- `GET /api/vehicles?sort=efficiency` — proxies the evaluation service's Vehicles API
- `GET /api/depot` — proxies the Depot API (schema is a stub — confirm fields)
- `GET /api/notifications` — proxies the Notification API (schema is a stub — confirm fields)

## Known gaps to fill in (couldn't confirm from the doc excerpts provided)

- Exact request/response shape of the **Authorization Token API**
  (`auth/authStore.js` assumes `POST /auth` with `{ clientID, clientSecret }`
  returning `{ accessToken, expiresIn }` — adjust to match).
- Full response schema for **Depot API (GET)** and **Notification API (GET)**.
- Logic for **Vehicle Maintenance Scheduling** and **Stage 1–6** deliverables
  weren't visible in the screenshots — once you share those sections I can
  flesh out the actual scheduling algorithm rather than the stub sort
  currently in `service/vehicleService.js`.

## Logging

Every request is logged via the Log API through `middleware/logger.js`'s
`Log(stack, level, package, message)` function, respecting the allowed
enum values for `stack`, `level`, and `package` from the constraints doc.