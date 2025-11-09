# Horse Racing Game

An interactive horse simulation game built with Vue 3 and Vite.

## 📋 Requirements

- Node.js: `^20.19.0 || >=22.12.0`
- npm or yarn

## 🛠️ Installation

```sh
npm install
```

## 🎮 Usage

### Development Server

```sh
npm run dev
```

The application will run at `http://localhost:5173`.


## 🧪 Testing

The project includes both unit test and E2E test support.

### Unit Tests (Vitest)

Unit tests cover Vue components, utility functions, and Vuex store.

```sh
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with Vitest UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

**Test Files:**
- `src/utils/*.test.js` - Utility function tests
- `src/store/index.test.js` - Vuex store tests
- `src/components/**/*.test.js` - Component tests

### E2E Tests (Playwright)

E2E tests cover the complete application flow.

```sh
# Run all E2E tests (headless)
npm run test:e2e

# Run tests with browser visible
npm run test:e2e:headed

# Run tests with Playwright UI (interactive)
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug

# Show HTML report
npm run test:e2e:report
```

**E2E Test Files:**
- `e2e/home.spec.js` - Home page tests
- `e2e/horseList.spec.js` - Horse list tests
- `e2e/race.spec.js` - Race flow tests
- `e2e/generalUi.spec.js` - General UI tests

**Initial Setup:**

You may need to install Playwright browsers before running E2E tests:

```sh
npx playwright install chromium
```

## 📁 Project Structure

```
horse-game/
├── src/
│   ├── components/         # Vue components
│   │   ├── horseList/      # Horse list components
│   │   ├── race/           # Race track component
│   │   ├── raceProgram/    # Race program component
│   │   └── raceResults/    # Race results component
│   ├── pages/              # Page components
│   │   └── game/           # Main game page
│   ├── store/              # Vuex store
│   │   └── index.js        # Store configuration
│   ├── utils/              # Utility functions
│   │   ├── colors.js       # Color helper functions
│   │   └── gameLogic.js    # Game logic functions
│   └── test/               # Test setup files
│       └── setup.js        # Vitest setup
├── e2e/                    # E2E test files
├── playwright.config.js    # Playwright configuration
├── vite.config.js          # Vite configuration
└── package.json
```

## 🎯 Technologies

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Vuex** - State management
- **Vitest** - Unit testing framework
- **Playwright** - E2E testing framework
- **Vue Test Utils** - Vue component testing utilities