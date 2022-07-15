import React, { useState } from "react";
import { Collapse, Alert, IconButton, AlertTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"

export default React.memo(function NewUserAlert() {
    const readNewUserGuide = localStorage.getItem("readNewUserGuide") === "True" ? true : false;
    const [open, setOpen] = useState(readNewUserGuide ? false : true);

    const handleClose = () => {
        localStorage.setItem("readNewUserGuide", "True");
        setOpen(false);
    }

    return <Collapse in={open}>
        <Alert
            severity="info"
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            sx={{ mb: 2 }}
        >
            <AlertTitle>Welcome to Recipes Finder</AlertTitle>
            <ul>
                <li>
                    You can find recipes by providing image urls, uploading images, or providing text base queries.
                </li>
                <li>
                    You can also bookmark recipes after you have logged in to the application.
                </li>
                <li>
                    You can log in as a demo user with <b>demo@example.com
                    </b> as the email and <b>password123&</b> as the password
                </li>
            </ul>

        </Alert>
    </Collapse>
});