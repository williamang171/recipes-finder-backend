import React from 'react';
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";

const LoginButton = () => {
    return (
        <Box sx={{ minWidth: "90px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <Button
                component={Link}
                to="/auth/sign-in"
                variant='contained'
                color='secondary'
            >
                Sign In
            </Button>
        </Box>
    );
};

export default LoginButton;