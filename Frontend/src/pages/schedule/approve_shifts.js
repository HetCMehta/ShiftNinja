import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URLS } from "../../apiConfig";
import {
    ScheduleComponent, Week, Inject,
    ViewsDirective, ViewDirective, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import CircularProgress from '@mui/material/CircularProgress';

import "./schedule.css";

const ApproveShifts = () => {
    const scheduleSettings = {
        Subject: 'userId',
        categoryColor: '#1B76D2',
        IsReadonly: false
    };

    const userData = JSON.parse(localStorage.getItem('userData'));

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const [isLoading, setIsLoading] = useState(true);
    const [shifts, setShifts] = useState([]);

    const onActionComplete = (args) => {
        let newshiftData = {};
        if (args.data) {
            const data = args.data[0];
            newshiftData['startDateTime'] = new Date(data.StartTime).toISOString().slice(0, 19);
            newshiftData['endDateTime'] = new Date(data.EndTime).toISOString().slice(0, 19);
        } else {
            return;
        }

        if (args.requestType === 'eventCreated') {
            postShift(newshiftData);
        }

        if (args.requestType === "eventChanged") {
        }

        if (args.requestType === "eventRemoved") {

        }
    };

    const onEventRendered = (args) => {

        let categoryColor = args.data.categoryColor;
        const el = args.element;

        if (!args.element || !categoryColor) {
            return;
        }
        else {
            el.style.backgroundColor = categoryColor;
        }
    };

    const processShift = (shift) => {
        return {
            ...scheduleSettings,
            StartTime: shift.startDateTime,
            EndTime: shift.endDateTime,
            Id: shift.id,
            approved: shift.approved,
            user: shift.user
        };
    };

    async function postShift(shift) {
        axios.post(API_URLS.postShifts, shift).then((res) => {
        }).catch((error) => {
            console.error(error);
        });
    }

    async function getShifts() {
        setIsLoading(true);
        await axios.get(API_URLS.schedule)
            .then((res) => {
                const data = res.data;
                if (Array.isArray(data)) {
                    setShifts(data.map(processShift).filter(shift => shift.approved === false));
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    };

    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    useEffect(() => {
        getShifts();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [])

    return (
        <div className="scheduler-container">
            {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center", flexFlow: "column", alignItems: "center" }}>
                    <h2>Loading Shifts</h2>
                    <CircularProgress></CircularProgress>
                </div>
            ) : (
                <ScheduleComponent width={windowDimensions.width - 128} height={windowDimensions.height - 128} eventSettings={{ dataSource: shifts }}
                    eventRendered={onEventRendered} actionComplete={onActionComplete}
                >
                    <ViewsDirective>
                        <ViewDirective option='Week'></ViewDirective>
                    </ViewsDirective>
                    <Inject services={[Week, DragAndDrop]} />
                </ScheduleComponent>
            )}
        </div>
    )
}

export default ApproveShifts;