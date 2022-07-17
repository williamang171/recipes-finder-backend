import React from "react";
import { useTheme } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { grey } from "@mui/material/colors";

import { Prediction } from 'interfaces/types';
import PredictionsListItem from "./PredictionsListItem";

interface Props {
    predictions: Array<Prediction>,
    setSearchQuery(ingredient: string): any,
    setOpen(open: boolean): any
}

const Placeholder = React.memo(() => {
    return null;
})

export default function ImageToPredict(props: Props) {
    const { predictions = [], setSearchQuery, setOpen } = props;
    const theme = useTheme();
    const mode = theme.palette.mode;
    const overLg = useMediaQuery(theme.breakpoints.up('lg'));

    const renderResults = () => {
        if (predictions.length === 0) {
            return <Placeholder />
        }

        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Label</TableCell>
                            <TableCell align="right">Probability</TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {predictions.map((p: Prediction) => (
                            <PredictionsListItem
                                key={p.name}
                                name={p.name}
                                value={p.value}
                                setIngredient={setSearchQuery}
                                setOpen={setOpen}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <Box sx={{ minWidth: "300px", overflow: "auto", height: "100%", maxHeight: "460px", minHeight: "460px", flexGrow: 1, borderLeft: overLg ? `1px solid ${mode === "dark" ? grey[800] : grey[300]}` : "", }}>
            {renderResults()}
        </Box>
    )
}