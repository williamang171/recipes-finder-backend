// src/auth/auth0-provider-with-history.js

import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';

interface Props {
    children: React.ReactNode
}

const Auth0ProviderWithHistory = (props: Props) => {
    const { children } = props;
    const navigate = useNavigate();
    const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "";
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

    const onRedirectCallback = () => {
        navigate(`/finder`)
    };

    return <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={`${window.location.origin}/finder`}
        onRedirectCallback={onRedirectCallback}
        audience={audience}
    >
        {children}
    </Auth0Provider>

};

export default Auth0ProviderWithHistory;