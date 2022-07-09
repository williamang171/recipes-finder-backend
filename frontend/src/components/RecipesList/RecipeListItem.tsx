
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

import { Recipe } from "interfaces/types";

const StyledTypography = styled(Typography)(({ theme }) => ({
    'a': {
        textDecoration: "none",
        color: theme.palette.primary.main
    },
    'a:hover': {
        textDecoration: "underline"
    }
}))


interface Props {
    url: string,
    imageUrl: string,
    name: string,
    mealDbId?: string,
    id?: number,
    extra?(recipe: Recipe): any
}

export default function RecipeListItem(props: Props) {
    const { url, imageUrl, name, extra, mealDbId, id } = props;

    return (
        <Card sx={{
            display: 'flex', ':hover': {
                boxShadow: 4, // theme.shadows[20]
            },
        }}>
            <a target="_blank" rel="noreferrer" href={url}>
                <CardMedia
                    component="img"
                    sx={{ height: 140, width: "auto", maxHeight: 140 }}
                    image={imageUrl}
                    alt={name}
                />
            </a>

            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%', width: "100%", overflow: 'hidden' }}>
                <CardContent sx={{ flex: '1 0 auto', overflow: 'hidden' }}>
                    <StyledTypography variant="h6" sx={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: "hidden",
                        color: grey[900],
                        textDecoration: "none",
                        display: "block"
                    }}
                    >
                        <a target="_blank" rel="noreferrer" href={`https://themealdb.com/meal.php?c=${mealDbId}`}>
                            {name}
                        </a>
                    </StyledTypography>
                    <Typography variant="subtitle1" color="text.secondary" >
                        Meal ID: {mealDbId}
                    </Typography>
                </CardContent>
                {typeof extra === 'function' ? extra({
                    url,
                    image_url: imageUrl,
                    name,
                    mealdb_id: mealDbId,
                    id
                }) : null}
            </Box>

        </Card>
    );
}
