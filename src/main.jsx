import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./css/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider.jsx";
export const queryClient = new QueryClient();

<Routes>
  <Route path="/signin" element></Route>
</Routes>;

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_API_KEY}
  >
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <App />
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
  // </StrictMode>
);
