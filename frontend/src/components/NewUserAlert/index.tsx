import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export default React.memo(function NewUserAlert() {
    return <Alert
        severity="info"
        sx={{ mb: 1 }}
    >
        <AlertTitle>Welcome to Recipes Finder</AlertTitle>
        <ul style={{ margin: '0.5em' }}>
            <li>
                You can find recipes by providing image urls, uploading images, or providing text base queries.
            </li>
            <li>
                You can also bookmark recipes after you have signed in to the application.
            </li>
        </ul>
    </Alert>
});