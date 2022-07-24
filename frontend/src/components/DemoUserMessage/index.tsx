import React from "react";

import { demoUser } from "configs/demo-user";

export default React.memo(function DemoUserMessage() {
    return <>
        You can sign in as a demo user with <b>{demoUser.username}
        </b> as the email and <b>{demoUser.password}</b> as the password
    </>
});