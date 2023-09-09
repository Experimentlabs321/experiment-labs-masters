import { google } from "googleapis";

const googleAuth = new google.auth.OAuth2(
  "86204309404-6ho5ctphbjl4srupk2t845cmmu6ntvur.apps.googleusercontent.com",
  "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",
  "http://localhost:3000/dashboard"
);

// Generate the URL for user consent
export const getAuthUrl = () => {
  const scopes = ["https://www.googleapis.com/auth/calendar"];

  return googleAuth.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
};

// Exchange the authorization code for an access token
export const getToken = async (code) => {
  const { tokens } = await googleAuth.getToken(code);
  googleAuth.setCredentials(tokens);
  return tokens;
};
