/*
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URLS } from "../../apiConfig";
import {
    ScheduleComponent, Week, Inject,
    ViewsDirective, ViewDirective, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const PostSchedule = () =>{
    const postShiftSettings = {
        Subject: 'Posted',
        categoryColor: '#F57F16',
        IsReadonly: false,
    };

    const [isLoading,setIsLoading] = useState(true);
    const [shifts, setShifts] = useState([]);

    const postShift = (shiftData) =>{

    };

    const getShifts = () =>{
        axios.get(API_URLS.schedule).then((res)=>{
            const data = res.data;
            console.log(typeof data, Array.isArray(data));
            if(Array.isArray(data)){
                let fetchedShifts = [];
                data.forEach((shift)=>{
                    let data = {};
                    data['StartTime'] = shift.startDatetime;
                    data['EndTime'] = shift.endDatetime;
                    data['Id'] = shift.id;
                    data['approved'] = shift.approved;
                    data = Object.assign(data,postShiftSettings);
                    data = Object.assign(data, shift.user)
                    fetchedShifts.push(data);
                });
                setShifts(fetchedShifts);
            }
        }, (error)=>{
            console.error(error);
        });
    };

    useEffect(()=>{
       getShifts();
    },[])

    return(
        <div className="scheduler-container">
        {isLoading ? (<div style={{ display: "flex", justifyContent: "center", flexFlow: "column", alignItems: "center" }}>

            <h2>Loading Shifts</h2>
            <CircularProgress></CircularProgress>
        </div>) : (<>
            <ScheduleComponent actionBegin={onActionBegin} selectedDate={new Date()} popupOpen={onPopupOpen} actionComplete={onActionComplete} width={windowDimensions.width - 128} height={windowDimensions.height - 128} ref={scheduleObj} eventSettings={{ dataSource: shifts }} eventRendered={onEventRendered}>
                <ViewsDirective>
                    <ViewDirective option='Week'></ViewDirective>
                </ViewsDirective>
                <Inject services={[Week, DragAndDrop]} />
            </ScheduleComponent>
        </>)}
    </div>
    )
}

export default PostSchedule;
*/

import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URLS } from "../../apiConfig";
import {
    ScheduleComponent, Week, Inject,
    ViewsDirective, ViewDirective, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import CircularProgress from '@mui/material/CircularProgress';

import "./schedule.css";

const PostSchedule = () => {
    const postShiftSettings = {
        Subject: 'Posted',
        categoryColor: '#F57F16',
        IsReadonly: true,
    };

    const userData = JSON.parse(localStorage.getItem('userData'));

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const [isLoading, setIsLoading] = useState(true);
    const [shifts, setShifts] = useState([]);

    const toADTISOString = (date) => {
        let adtDate = new Date(date.getTime() - (3 * 60 * 60 * 1000));
        let adtISOString = adtDate.toISOString().slice(0, 19);
        return adtISOString;
    }

    const onActionComplete = (args) => {
        let newshiftData = {};
        if (args.data) {
            const data = args.data[0];
            newshiftData['startDateTime'] = toADTISOString(new Date(data.StartTime));
            newshiftData['endDateTime'] = toADTISOString(new Date(data.EndTime));
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
            ...postShiftSettings,
            StartTime: shift.startDateTime,
            EndTime: shift.endDateTime,
            Id: shift.id,
            approved: shift.approved,
            user: shift.user
        };
    };

    async function postShift(shift) {
        axios.post(API_URLS.postShifts, shift).then((res) => {
            getShifts();
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
                    setShifts(data.map(processShift));
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

export default PostSchedule;
