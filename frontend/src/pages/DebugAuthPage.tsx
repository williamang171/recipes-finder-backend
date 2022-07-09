import { useState } from "react";

import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@mui/material";

import Layout from "components/Layout";
import useHandleHttpRequestError from "hooks/useHandleHttpRequestError";

export default function DebugAuthPage() {
    const [value] = useState("");
    const { getAccessTokenSilently } = useAuth0();
    const { handleError } = useHandleHttpRequestError();

    const getPublicMsg = () => {
        axios.get("/messages/public")
            .then((res) => {
                alert(res.data)
            }).catch((err) => {
                handleError(err);
            })
    }

    const getProtectedMsg = async () => {
        const t = await getAccessTokenSilently();
        axios.get("/messages/protected", {
            headers: {
                authorization: `Bearer ${t}`
            }
        })
            .then((res) => {
                alert(res.data)
            }).catch((err) => {
                handleError(err);
            })
    }

    return <Layout>
        {value}
        <Button onClick={getPublicMsg} variant="contained">Get Public Msg</Button>
        <br />
        <br />
        <Button onClick={getProtectedMsg} variant="contained">Get Protected Msg</Button>
    </Layout>
}