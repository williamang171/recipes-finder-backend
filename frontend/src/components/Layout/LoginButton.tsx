import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Box } from "@mui/material";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Box>
            <Button
                variant='contained'
                color='secondary'
                onClick={() => loginWithRedirect()}
            >
                Log In
            </Button>
        </Box>
    );
};

export default LoginButton;