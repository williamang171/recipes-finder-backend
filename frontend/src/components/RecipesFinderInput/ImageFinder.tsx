import React from "react";


import { Button, Typography, IconButton, Dialog, DialogContent, DialogTitle, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ImageFinderProps {
    description: string,
    renderBody?(): any,
}


export default function ImageFinder(props: ImageFinderProps) {
    const { description, renderBody } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button sx={{ mb: 1 }} fullWidth variant="outlined" onClick={handleOpen}>
                {description}
            </Button>
            <Dialog
                sx={{
                    // maxHeight: "80vh",
                    // minHeight: "80vh"
                }}
                fullWidth
                open={open}
                maxWidth={'md'}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogTitle>
                    <Typography id="modal-modal-title" variant="h6" component="div" mb={1}>
                        {description}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 16,
                            top: 16,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ minHeight: "80vh", maxHeight: "80vh" }} id="images-finder-scrollable">
                    {typeof renderBody === "function" ? renderBody() : null}
                </DialogContent>

            </Dialog>
        </div>

    )

}