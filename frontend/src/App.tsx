import { Route, Routes } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from "notistack";

import SavedRecipesPage from "pages/SavedRecipesPage";
import FinderPage from "pages/FinderPage"
import DebugAuthPage from "pages/DebugAuthPage";
import IndexPage from "pages/IndexPage";
import SettingsPage from "pages/SettingsPage";
import ToggleColorMode from "components/ToggleColorMode";
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";


function App() {
  return <ToggleColorMode
  >
    <SnackbarProvider autoHideDuration={1500}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/finder" element={<FinderPage />} />
        <Route path="/saved-recipes" element={<SavedRecipesPage />} />
        <Route path="/debug-auth" element={<DebugAuthPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </SnackbarProvider>
  </ToggleColorMode>

}


export default App;
