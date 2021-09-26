import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export const LoginRoute = ({ component: InternalComponent, ...rest } : any) => {
    const refreshToken = useAppSelector((state) => !!state.user.token);

    return (
    <Route
        {...rest}
        render={(props) => 
            !!refreshToken ? (
                <InternalComponent {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }}/>
            )
        }
    />
    );
}