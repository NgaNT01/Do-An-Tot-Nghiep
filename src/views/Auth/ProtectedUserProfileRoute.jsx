import {Redirect, Route, useParams} from 'react-router-dom';
import {UserProfile} from "./UserProfile";
import {useEffect} from "react";

export const ProtectedUserProfileRoute = ({component: Component, currentUser,match, ...rest }) => {
    const { username } = useParams();

    useEffect(() => {
        console.log(username)
    }, [])

    if (currentUser.username !== username) {
        return <Redirect to="/auth/sign-in" />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
};