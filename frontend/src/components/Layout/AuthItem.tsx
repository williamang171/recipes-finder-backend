import React from "react";

import { Avatar, Dialog, DialogContent, DialogTitle, } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import { CircularProgress } from "@mui/material";

import LoginButton from 'components/Layout/LoginButton';


interface Props {
    handleMenu(event: React.MouseEvent<HTMLElement>): any,
    anchorEl: null | HTMLElement,
    handleClose(): any
}

export default function AuthItem(props: Props) {
    const { handleMenu, anchorEl, handleClose } = props;
    const { isAuthenticated, logout, user, isLoading } = useAuth0();
    const { name, picture, email } = user || {};
    const [open, setOpen] = React.useState(false);

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleOpenModal = () => {
        handleClose();
        setOpen(true);
    }

    const profileModal = (
        <Dialog
            open={open} fullWidth
            onClose={handleCloseModal}
            aria-labelledby="dialog-profile"
            aria-describedby="dialog-profile"
        >
            <DialogTitle id="alert-dialog-title">
                {"Profile"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", mb: 2 }}>
                    <Box sx={{ mt: 1 }}>
                        <Avatar sx={{ width: 120, height: 120 }} alt="avatar" src={picture} />

                    </Box>
                    <Box sx={{ ml: 3 }}>
                        <TextField fullWidth sx={{ mt: 1, mb: 2 }} label="Name" variant="outlined" disabled
                            value={name}
                        />
                        <TextField fullWidth label="Email" variant="outlined" disabled
                            value={email}
                        />
                    </Box>
                </Box>             </DialogContent>
        </Dialog>
    )

    const logoutOnClick = () => {
        logout({
            returnTo: window.location.origin,
        })
    }

    if (isLoading) {
        return <Box sx={{ color: '#fff', justifyContent: "center", display: 'flex', alignItems: 'center', mr: 2, ml: 2 }}  >
            <CircularProgress color="inherit" size={20} />
        </Box>
    }

    if (isAuthenticated) {
        return (
            <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    {picture ? <Avatar alt="avatar" sx={{
                        width: 28,
                        height: 28
                    }} src={picture} /> : <AccountCircle />}
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleOpenModal}>Profile</MenuItem>
                    <MenuItem onClick={logoutOnClick}>Logout</MenuItem>
                </Menu>
                {profileModal}
            </div>
        )
    }

    return <LoginButton />
}