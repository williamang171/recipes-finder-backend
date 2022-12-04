import React from "react";

import { demoUser } from "configs/demo-user";

export default React.memo(function DemoUserMessage() {
    return <>
        <div>Demo User Email:  {demoUser.username}</div>
        <div>Demo User Password: {demoUser.password}</div>
    </>
});