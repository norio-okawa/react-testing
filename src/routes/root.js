import AppLayout from "../layout";
import Auth from "../Auth";
import React from "react";

const Root = () => {
    return (
        <Auth>
            <AppLayout/>
        </Auth>
    );
};

export default Root;
