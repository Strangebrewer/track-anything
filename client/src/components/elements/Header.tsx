import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getTokenSourceMapRange } from 'typescript';

import { UserContext } from '../../App';

type Props = {
    logout: () => void;
}

const Header: React.FC<Props> = props => {
    const history = useHistory();
    const user = useContext(UserContext);

    function goTo(route: string): void {
        history.push(route)
    }

    return (
        <Wrapper>
            <LinkButton onClick={() => goTo('/')}>HOME</LinkButton>
            {user 
                ? <AuthBtn onClick={props.logout}>LOGOUT</AuthBtn>
                : <AuthBtn width="150" onClick={() => goTo('/login')}>LOGIN</AuthBtn>}
        </Wrapper>
    );
};

export default Header;

const Wrapper = styled.header`
    background-color: #000;
    min-height: 92px;
    max-height: 92px;
    padding: 30px;
    position: relative;
`;

const AuthBtn = styled.button<{ width?: string }>`
    background-color: white;
    border: 2px solid ${props => props.theme.nRed};
    border-radius: 20px;
    box-shadow: inset 1px 1px 5px ${props => props.theme.blue}, inset -1px -1px 5px ${props => props.theme.blue};
    color: ${props => props.theme.purple};
    cursor: pointer;
    height: 32px;
    outline: none;
    position: absolute;
    right: 30px;
    top: 30px;
    width: ${props => props.width ? props.width : '100'}px;
`;

const LinkButton = styled.button`
    background-color: ${props => props.theme.purple};
    border: 2px solid ${props => props.theme.blue};
    border-radius: 16px;
    box-shadow: inset 1px 1px 5px white, inset -1px -1px 5px white;
    color: white;
    cursor: pointer;
    height: 32px;
    margin: 0 30px;
    outline: none;
    width: 100px;
`;
