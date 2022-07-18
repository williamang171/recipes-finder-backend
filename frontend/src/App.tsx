import { Route, Routes } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from "notistack";

import SavedRecipesPage from "pages/SavedRecipesPage";
import FinderPage from "pages/FinderPage"
import IndexPage from "pages/IndexPage";
import SettingsPage from "pages/SettingsPage";
import ToggleColorMode from "components/ToggleColorMode";
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";
import { AuthContextProvider } from "contexts/AuthContext"
import { GlobalLoadingContextProvider } from "contexts/GlobalLoadingContext";
import GlobalLoader from "components/GlobalLoader";
import LoadCurrentUser from "components/LoadCurrentUser";

function App() {
  return <ToggleColorMode
  >
    <SnackbarProvider autoHideDuration={1500}>
      <CssBaseline />
      <GlobalLoadingContextProvider>
        <AuthContextProvider>
          <LoadCurrentUser />
          <GlobalLoader />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/finder" element={<FinderPage />} />
            <Route path="/saved-recipes" element={<SavedRecipesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
          </Routes>
        </AuthContextProvider>
      </GlobalLoadingContextProvider>
    </SnackbarProvider>
  </ToggleColorMode>

}


export default App;
