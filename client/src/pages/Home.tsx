import React from 'react';
import styled from 'styled-components';
import Header from '../components/elements/Header';

interface Props {
    logout: () => void;
}

const Home: React.FC<Props> = props => {
    return (
        <>
            <Header logout={props.logout} />
            <Trackables>
                {/* this is where all the things I'm tracking can be listed */}
            </Trackables>
        </>
    );
}

export default Home;

const Trackables = styled.div`

`;