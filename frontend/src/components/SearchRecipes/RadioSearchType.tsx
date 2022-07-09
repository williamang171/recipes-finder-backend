import { FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material"
import React from "react"

interface Props {
    onChange?(e: React.ChangeEvent<HTMLInputElement>): any,
    value: string
}

export default function RadioSearchType(props: Props) {
    return (
        <FormControl sx={{ mb: 3 }}>
            <RadioGroup
                onChange={props.onChange}
                value={props.value}
                row
                aria-labelledby="search-recipes-type-radio"
                name="position"
            >
                <FormControlLabel value="ingredient" control={<Radio />} label="Search as ingredient" />
                <FormControlLabel value="mealName" control={<Radio />} label="Search as meal name" />
            </RadioGroup>
        </FormControl>
    )
}