const CLIENT_ID = "b9acd5c5-7853-4ebb-8435-802ca50df4a8";
const REDIRECT_URI = "https://eternity-sky.github.io/sqrt/callback";
const AUTHORIZE_URL = "https://www.cpoauth.com/oauth/authorize";
const TOKEN_URL = "https://www.cpoauth.com/api/oauth/token";
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

function generateRandomString(length: number) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function login() {
  const codeVerifier = generateRandomString(128);
  localStorage.setItem("code_verifier", codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateRandomString(16);
  localStorage.setItem("oauth_state", state);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "openid profile email",
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  window.location.href = `${AUTHORIZE_URL}?${params.toString()}`;
}

export async function handleCallback(code: string, state: string) {
  const savedState = localStorage.getItem("oauth_state");
  const codeVerifier = localStorage.getItem("code_verifier");

  if (state !== savedState) {
    throw new Error("Invalid state");
  }

  const response = await fetch(CORS_PROXY + encodeURIComponent(TOKEN_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to exchange code for token");
  }

  const data = await response.json();
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);

  localStorage.removeItem("oauth_state");
  localStorage.removeItem("code_verifier");

  return data;
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/sqrt/";
}
