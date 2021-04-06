import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';

import API from '../api';
import { AxiosResponse } from 'axios';

interface Props {
    id?: string;
    logout: () => void;
}

interface ITrackerData {
    isNew?: boolean;
    title?: string;
    subtitle?: string;
    createdAt: Date;
    lastEditedAt?: Date;
}

interface IFieldsToShow {
    subtitle: boolean;
    notes: boolean;
    createdAt: boolean;
    lastEditedAt: boolean;
}

const Tracker: React.FC<Props> = props => {
    const history = useHistory();
    const now = new Date();

    const [trackerData, setTrackerData] = useState<ITrackerData>({ createdAt: now });
    const [fieldsToShow, setFieldsToShow] = useState<IFieldsToShow>({
        subtitle: true,
        notes: true,
        createdAt: true,
        lastEditedAt: true,
    });
    const [fieldEditable, setFieldEditable] = useState<boolean>(false);

    function addField() {

    }

    function saveNewFucknTracker() {

    }


    useEffect(() => {
        (async function() {
            if (history.location.search) {
                // get data from store or db
                const search = history.location.search.split('=')[1];
                const tracker = await API.tracker.getOne(search);
                setTrackerData({
                    title: tracker.data.title,
                    subtitle: tracker.data.subtitle,
                    createdAt: tracker.data.createdAt
                })
            } else {
                // load default form
                setTrackerData({
                    isNew: true,
                    createdAt: now,
                    title: 'New Tracker',
                    subtitle: 'I am a new tracker for tracking trackable things.'
                });
            }
        })();
    }, []);


    return (
        <Wrapper>
            <Header>
                <h2>Title: {trackerData.title}</h2>
                {fieldsToShow.subtitle && <h3>Subtitle: {trackerData.subtitle}</h3>}
            </Header>

            <Body>
                <button onClick={addField}>Add field</button>
                {fieldEditable && (
                    <form action="">
                        <label htmlFor="field-type">Field Type:</label>
                        <select name="type" id="field-type-selector">
                            <option value="text">text - short</option>
                            <option value="text">text - long</option>
                            <option value="date">date</option>
                            <option value="countdown">countdown</option>
                            <option value="countup">countup</option>
                            <option value="link">link</option>
                        </select>
                    </form>
                )}
            </Body>
            
            <Footer>
                <p id="creation-date">created on: {format(new Date(trackerData.createdAt), 'MMM dd, yyyy')}</p>
                <p id="edited-date">last edited: {format(new Date(trackerData.createdAt), 'MMM dd, yyyy')}</p>
                <button onClick={saveNewFucknTracker}>Save!</button>
            </Footer>
        </Wrapper>
    );
}

export default Tracker;

const Wrapper = styled.div`
    margin: auto;
    padding: 30px 50px;
    width: 1000px;
    min-height: 100vh;
    background-color: #faf1f4;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    height: 50px;

    h2 {
        font-size: 35px;
    }

    h3 {
        padding-left: 10px;
    }
`;

const Body = styled.div`
    flex-grow: 1;
`;

const Footer = styled.div`
    #creation-date, #edited-date {
        display: inline-block;
        font-size: 12px;
        color: #454745;
        padding-left: 10px;
    }

    #edited-date {
        margin-left: 20px;
    }
`;