import React from 'react';
import Header from '../components/elements/Header';

type Props = {
    logout: () => void;
}

const Home: React.FC<Props> = props => {
    return (
        <>
            <Header logout={props.logout} />
        </>
    );
}

export default Home;
// 