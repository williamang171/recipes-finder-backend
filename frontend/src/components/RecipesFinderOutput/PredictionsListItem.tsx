import { TableRow, TableCell, Button } from "@mui/material";

interface Props {
    name: string,
    value: number,
    setIngredient(name: string): any,
    setOpen(open: boolean): any
}

export default function PredictionsListItem(props: Props) {
    const { name, value = 0, setIngredient, setOpen } = props;
    return <TableRow
        key={name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">
            {name}
        </TableCell>
        <TableCell align="right">{value.toFixed(4)}</TableCell>
        <TableCell align="right" sx={{
            minWidth: "200px"
        }}>
            <Button variant="outlined" onClick={() => {
                setIngredient(name);
                setOpen(true)
            }} >Find Recipes</Button>
        </TableCell>
    </TableRow>
}