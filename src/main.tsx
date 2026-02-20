import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Sentry initialization (requires @sentry/react package and VITE_SENTRY_DSN env var)
// TODO: Install Sentry: yarn add @sentry/react
// TODO: Create Sentry project at sentry.io and set VITE_SENTRY_DSN
//
// import * as Sentry from "@sentry/react";
//
// const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
// if (sentryDsn) {
//   Sentry.init({
//     dsn: sentryDsn,
//     environment: import.meta.env.MODE,
//     integrations: [
//       Sentry.browserTracingIntegration(),
//       Sentry.replayIntegration(),
//     ],
//     tracesSampleRate: 0.1,
//     replaysSessionSampleRate: 0.1,
//     replaysOnErrorSampleRate: 1.0,
//   });
// }

createRoot(document.getElementById("root")!).render(<App />);
