import React from "react";
import { Alert, AlertTitle } from "@mui/material";

import DemoUserMessage from "components/DemoUserMessage";

export default React.memo(function NewUserAlert() {
    return <Alert
        severity="info"

        sx={{ mb: 2 }}
    >
        <AlertTitle>Welcome to Recipes Finder</AlertTitle>
        <ul>
            <li>
                You can find recipes by providing image urls, uploading images, or providing text base queries.
            </li>
            <li>
                You can also bookmark recipes after you have signed in to the application.
            </li>
            <li>
                <DemoUserMessage />
            </li>
        </ul>
    </Alert>
});