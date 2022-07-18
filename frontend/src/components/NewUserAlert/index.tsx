import React from "react";
import { Alert, AlertTitle } from "@mui/material";

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
                You can sign in as a demo user with <b>demo@example.com
                </b> as the email and <b>password123&</b> as the password
            </li>
        </ul>

    </Alert>

});