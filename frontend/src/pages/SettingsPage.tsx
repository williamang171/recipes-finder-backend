import { useState } from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

import Layout from "components/Layout"
import { useSnackbar } from "notistack";

export default function SettingsPage() {
    const [primaryFindMethod, setPrimaryFindMethod] = useState(parseInt(localStorage.getItem("primaryFindMethod") || "0"));
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrimaryFindMethod(parseInt(event.target.value));
        localStorage.setItem("primaryFindMethod", event.target.value)
        enqueueSnackbar("Update successful, the primary method will be selected when you reload the app", {
            autoHideDuration: 3000
        })
    };

    return (
        <Layout>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Primary method for finding recipes</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={primaryFindMethod}
                    onChange={handleChange}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value={0} control={<Radio />} label="Image Via URL" />
                    <FormControlLabel value={1} control={<Radio />} label="Image Via Upload" />
                    <FormControlLabel value={2} control={<Radio />} label="Text" />
                </RadioGroup>
            </FormControl>
        </Layout>
    )
}