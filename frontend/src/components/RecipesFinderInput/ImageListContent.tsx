import React, { useMemo } from "react";
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { grey } from "@mui/material/colors";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Image } from "interfaces/types";
import { useSnackbar } from "notistack";

const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
    cursor: "pointer",

    '& .MuiImageListItemBar-root': {
        opacity: 0
    },
    '&:hover': {
        '& .MuiImageListItemBar-root': {
            opacity: 1
        }
    }
}))

interface Props {
    dataSource: Array<Image>;
    imageOnClick(imageUrl: string): any;
    notifyWhenImageOnClick?: Boolean;
    handleClose?: () => void;
}

export default function ImageListContent(props: Props) {
    const { dataSource, imageOnClick, notifyWhenImageOnClick = true, handleClose } = props;
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const Over400 = useMediaQuery('(min-width:400px)');
    const overSm = useMediaQuery(theme.breakpoints.up('sm'));
    const overMd = useMediaQuery(theme.breakpoints.up('md'));
    const overLg = useMediaQuery(theme.breakpoints.up('lg'));

    const handleImageOnClick = (imgForSubmit: string) => {
        if (notifyWhenImageOnClick) {
            enqueueSnackbar("Image selected");
        }
        if (handleClose) {
            handleClose();
        } imageOnClick(imgForSubmit);
    };

    const cols = useMemo(() => {
        if (overLg) {
            return 4;
        }
        if (overMd) {
            return 4;
        }
        if (overSm) {
            return 3;
        }
        if (Over400) {
            return 2;
        }

        return 1;
    }, [overSm, overMd, overLg, Over400])

    return (
        <ImageList sx={{ maxHeight: "100%", height: "100%" }} rowHeight={160} cols={cols}>
            {dataSource.map((item) => (
                <StyledImageListItem key={item.img} onClick={() => {
                    handleImageOnClick(item.imgForSubmit)
                }}>
                    <img
                        style={{
                            overflow: "hidden"
                        }}
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        subtitle={
                            <a style={{
                                color: grey[100],
                            }} href={item.authorLink} target="_blank" rel="noreferrer">
                                {item.author}
                            </a>
                        }
                    />
                </StyledImageListItem>
            ))}
        </ImageList>

    )
}