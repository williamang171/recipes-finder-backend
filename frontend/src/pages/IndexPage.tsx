import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "components/Landing/Header";
import Highlights from 'components/Landing/Highlights';
import Hero from "components/Landing/Hero";

import Main from "components/Landing/Main";
import Section from "components/Landing/Section";

const theme = createTheme({
    palette: {
        mode: "dark"
    }
})

export default function IndexPage() {
    return (
        <ThemeProvider
            theme={theme}
        >
            <Box>
                <Header />
                <Main>
                    <Hero />
                </Main>
                <Section>
                    <Highlights />
                </Section>
            </Box>
        </ThemeProvider>
    );
}