
import { styled } from '@mui/material/styles';
import styles from './styles';

import constants from "./styles";

interface Props {
    children: React.ReactNode
}

export default function Section(props: Props) {
    const { children } = props;
    return (
        <section style={{ position: "relative", minHeight: "420px", background: styles.color.section }}>
            {children}

        </section>
    )
}