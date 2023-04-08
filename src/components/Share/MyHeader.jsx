import React from 'react';
import {Helmet} from "react-helmet";

const MyHeader = (props) => {
    return (
        <Helmet >
                <meta charSet="utf-8"/>
                <meta http-equiv="cache-control" content="no-cache"/>
                <meta http-equiv="pragma" content="no-cache"/>
                <meta http-equiv="expires" content="0"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{props.title}</title>
        </Helmet>
    );
};

export default MyHeader;