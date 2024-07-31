// axios-setup.js

import axios from 'axios';
import { apm } from './apm-config'; // Import your APM configuration

// Set up Axios interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  // Start APM transaction
  const transaction = apm.startTransaction(`${config.method.toUpperCase()} ${config.url}`, 'xhr');

  // Attach transaction to request config for later use
  config.metadata = { transaction };

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Get transaction from request config
    const { transaction } = response.config.metadata || {};

    // End APM transaction
    if (transaction) {
      transaction.end();
    }

    return response;
  },
  (error) => {
    // Get transaction from request config
    const { transaction } = error.config.metadata || {};

    // Capture errors in APM
    if (transaction) {
      apm.captureError(error);
      transaction.end();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
