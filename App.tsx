import React from 'react';
import * as Sentry from 'sentry-expo';
import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations";

// TODO: - SET ENVIROMENT FOR THIS TOO
Sentry.init({
  dsn: "https://cc87da79098442d1b37c72dc5e885e16@o366067.ingest.sentry.io/5495452",
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  integrations: [new CaptureConsoleIntegration()],
});

// Init firebase
export * from './inits/firebase.init';

import { Routes } from './src';

export default function App() {
  return <Routes />;
}
