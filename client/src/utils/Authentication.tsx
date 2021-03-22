import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthProps } from '../pages/Authoritaw';

export default (WrappedComponent: React.FC<AuthProps>, passedProps: AuthProps) => {
    const Authentication: React.FC<AuthProps> = (props: AuthProps) => {
        const [redirect, setRedirect] = useState(false);
        const [destination, setDestination] = useState('');

        useEffect(() => {
            (function() {
                const { required, authenticated } = passedProps;

                if (required && !authenticated) {
                    setRedirect(true);
                    setDestination('login');
                }

                if (!required && authenticated) {
                    setRedirect(true);
                    setDestination('');
                }
            })();
        });

        if (redirect)
            return <Redirect to={`/${destination}`} />
        
        return <WrappedComponent {...props} {...passedProps} />
    }

    return Authentication;
}
