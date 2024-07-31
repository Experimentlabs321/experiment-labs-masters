// apm-config.js

import { init as initApm } from '@elastic/apm-rum';

const apm = initApm({
  // Replace with your APM server details
  serviceName: 'my-service-name', // Name of your React application
  serverUrl: 'https://c822b117fec945b48cca59c6224f82fd.apm.us-central1.gcp.cloud.es.io:443', // URL to your APM server
  environment: 'my-environment', // Optional: Environment name
});

export { apm };
