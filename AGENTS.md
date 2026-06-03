## HeritageMap Frontend PWA

React 17 + TypeScript 3.9 + Create React App 4 + Mapbox GL app. Deployed as Docker container to heritagemap.ru.

### Dev Commands

```bash
npm ci
npm start        # Dev server with API proxies
npm test         # Jest in watch mode
npm run lint     # ESLint .ts/.tsx (airbnb-typescript)
npm run stylelint  # SCSS linting
```

Auto-fix: append `-- --fix` to lint or stylelint commands (e.g. `npm run lint -- --fix`).

### Architecture

- **Entry**: `src/index.tsx` → `src/App.tsx`
- **Routing**: React Router 5. URL pattern: `/lat/:lat/lon/:lon/zoom/:zoom/:id?`
- **Base URL**: `src` (absolute imports like `components/Map`)
- **Styles**: SCSS with `node-sass`. `SASS_PATH=./node_modules:./src/styles` set in `.env`
- **Map**: Mapbox GL via `@urbica/react-map-gl` and `react-map-gl`
- **PWA**: Service worker registered (`serviceWorker.register()`)

### API Proxies (Dev + Production)

Development uses `src/setupProxy.js`. Production uses `server.js` (Express). Both proxy the same endpoints:

- `/_api/ru_monuments` → `tools.wmflabs.org/ru_monuments/monmap/api.php`
- `/_api/ru_monument_image` → `magnus-toolserver.toolforge.org/commonsapi.php`
- `/_api/heritage` → `heritage.toolforge.org/api/api.php`
- `/_api/heritage_info` → `ru-monuments.toolforge.org/wikivoyage1.php`

### Build & Deploy

- **Build**: `npm run build` injects `REACT_APP_VERSION=$(git rev-parse HEAD)`
- **Docker**: Multi-stage Dockerfile using Node 14, serves on port 9000
- **CI/CD**: `.github/workflows/deploy.yml`
  - PRs: runs `npm test` on Node 12
  - Push to `master`: builds Docker image, pushes to GitHub Packages, deploys via SSH

### Linting Rules

- ESLint: `react-app`, `airbnb-typescript`, `eslint:recommended`. Disabled rules: `react/state-in-constructor`, `react/jsx-props-no-spreading`, `react/no-danger`, `react/destructuring-assignment`, `react/prop-types`, `no-restricted-properties`
- Stylelint: `stylelint-config-standard` + `stylelint-scss`
- Ignored: `serviceWorker.ts`, `build/`, `server.js`, `src/setupProxy.js`

### Type Declarations

Untyped modules are declared in `index.d.ts`:
`react-alert-template-basic`, `@urbica/react-map-gl-cluster`, `@urbica/react-map-gl`, `react-map-gl-geocoder`, `x2js`

### Component Structure

**Core components:**

- **`App.tsx`** — Root router (React Router 5). Route precedence matters: `shortLinks` → `/lat/:lat/lon/:lon/zoom/:zoom/:id?` → `/lat/:lat/lon/:lon/:id?` → `/:id` → `/`.
- **`Map` (`components/Map/index.tsx`)** — Main Mapbox GL map. Class component. Loads monument points via bbox from `/_api/heritage`, debounced (1s). Handles clustering, geocoder, geolocation. Uses `@urbica/react-map-gl` + `react-map-gl-geocoder`.
- **`Sidebar` (`components/Sidebar/index.tsx`)** — Side panel showing monument details. Fetches info from `/_api/heritage_info` by `id` param. Renders links (Wiki, sobory.ru, temples.ru) and image via `FullInfo`.
- **`MonumentPage` (`components/MonumentPage/index.tsx`)** — Standalone route for `/:id`. Fetches monument info and redirects to map with coordinates (`/lat/.../lon/.../zoom/12/:id`).
- **`DefaultMap`** — On `/`, restores last viewport from `localStorage` or falls back to `FirstLoadingMap`.
- **`FirstLoadingMap`** — Requests browser geolocation; on failure or denial redirects to default Moscow coords.
- **`RedirectWithZoom`** — Redirects `/lat/:lat/lon/:lon/:id?` to URL with default zoom appended.
- **`MarkerButton`** — Map marker button. On click pushes route with monument `id`, which opens `Sidebar`.
- **`FullInfo` (`components/FullInfo/index.tsx`)** — Fetches image metadata from `/_api/ru_monument_image` (Commons API proxy). Parses XML response with `x2js`, displays image + license + author.
- **`ClusterMarker`** — Cluster button on map. Click zooms into cluster via `supercluster`.

**Other source directories:**

- `src/constants/` — API endpoints, map config (`ACCESS_TOKEN`, `DEFAULT_ZOOM`), short city links
- `src/interfaces/` — TypeScript interfaces (Monument, Map, FullInfo, Link, etc.)
- `src/utils/` — Helpers: `getBbox`, `getRoute`, `getSortedMonumentsByCoords`, `getStatus`, `getSource`
- `src/icons/` — SVG icons as React components
- `src/styles/` — Shared SCSS

### Short Routes

`server.js` handles short city redirects (e.g. `/moscow` → `/lat/55.744654/lon/37.624991/zoom/12`). Also duplicated in `src/constants/shortLinks` for client-side routing.
