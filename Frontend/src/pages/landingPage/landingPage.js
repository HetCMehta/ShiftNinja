import React, { useState, useEffect, useRef } from 'react';
import {
    ScheduleComponent, Week, Inject,
    ViewsDirective, ViewDirective, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import "./landingPage.css";
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';

import { Button } from '@mui/material';
import { createRoot } from 'react-dom/client';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const LandingPage = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const location = useLocation();
    const [currentPath, setPath] = useState(location.pathname);
    const [shifts, setShifts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const eventSettings = {
        availableShifts: {
            Subject: 'Available',
            categoryColor: '#1AAB55',
            IsReadonly: true
        },

        myShifts: {
            Subject: '',
            categoryColor: '#1B76D2',
            IsReadonly: false,
        },

        postShifts: {
            Subject: '',
            categoryColor: '#F57F16',
            IsReadonly: false,
        },

        schedule: {
            Subject: 'userId',
            categoryColor: '#1B76D2',
            IsReadonly: false
        }
    }

    //remove later
    const schedule = [
        {
            "Id": 1,
            "startDateTime": "2023-07-23T12:00:00.000Z",
            "endDateTime": "2023-07-23T16:00:00.000Z"
        },
        {
            "Id": 1,
            "startDateTime": "2023-07-25T12:00:00.000Z",
            "endDateTime": "2023-07-25T20:00:00.000Z"
        },
        {
            "Id": 2,
            "startDateTime": "2023-07-26T12:00:00.000Z",
            "endDateTime": "2023-07-26T20:00:00.000Z"
        },
        {
            "Id": 2,
            "startDateTime": "2023-07-28T12:00:00.000Z",
            "endDateTime": "2023-07-28T20:00:00.000Z"
        },
    ]

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const modifyForMyShifts = (shift) => {
        const date = new Date(shift.StartTime);
        const today = new Date();

        if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear() && date.getDate() === today.getDate()) {
            shift.Subject = "Your next shift is today";
        } else {
            shift.Subject = date.toLocaleDateString("en-US", { weekday: 'long' });
        }

        if (date.getDate() < today.getDate() && date.getMonth() <= today.getMonth()) {
            shift.IsReadonly = true;
            shift.Subject += " (Completed)"
        }
        return shift;
    };


    const modifyShiftData = (scheduleData, scheduleSettings) => {
        const modifiedSchedule = [];
        scheduleData.forEach((shift) => {
            let modifiedShift = {};
            modifiedShift['ID'] = shift.ID;
            modifiedShift["StartTime"] = shift.startDateTime;
            modifiedShift["EndTime"] = shift.endDateTime;
            modifiedShift = Object.assign(modifiedShift, scheduleSettings);
            if (currentPath === "/my_shifts") {
                modifiedShift = modifyForMyShifts(modifiedShift);
            }
            modifiedSchedule.push(modifiedShift);
        });
        setShifts(modifiedSchedule);
    }

    const onActionComplete = (args) => {
        if (args.requestType === 'eventCreated') {
            console.log(args.data); // args.data contains the created event(s)
            // Do whatever you want with the new event here...
        }
    };

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    },);

    const scheduleObj = useRef(null)

    const onEventRendered = (args) => {
        let categoryColor = args.data.categoryColor;
        if (!args.element || !categoryColor) {
            return;
        }
        const el = args.element;
        if (scheduleObj.current.currentView === 'Agenda') {
            el.firstChild.style.borderLeftColor = categoryColor;
        }
        else {
            el.style.backgroundColor = categoryColor;
        }



    };

    // Custom Button to select Shifts in scheduler
    function CustomButton() {
        return (
            <Button
                variant='outlined'
                color="success"
                onClick={(e) => {
                    setSnackbarMessage("Shift Assigned to you");
                    setOpen(true);
                }}
            >
                Select Shift
            </Button>
        );
    }

    const onPopupOpen = (args) => {
        if (location.pathname === "/available_shifts") {
            if (args.type === 'QuickInfo') {
                const quickPopup = args.element;
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add("select-shift-container");
                quickPopup.appendChild(buttonContainer);
                const root = createRoot(buttonContainer);
                root.render(<CustomButton></CustomButton>);
            }
        }
    }
    useEffect(() => {
        setPath(location.pathname);
        setShifts([]);
        if (currentPath === "/my_shifts") {
            modifyShiftData(schedule, eventSettings.myShifts);
        } else if (currentPath === "/available_shifts") {
            modifyShiftData(schedule, eventSettings.availableShifts);
        } else if (currentPath === "/schedule") {
            modifyShiftData(schedule, eventSettings.schedule);
        } else if (currentPath === "/post_shifts") {
            modifyShiftData(schedule, eventSettings.postShifts);
        }
        setIsLoading(false);
    }, [location.pathname, currentPath]);

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => { setOpen(false) }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div className="scheduler-container">
            {isLoading ? (<>
                <h2>Loading Shifts</h2>
                <CircularProgress></CircularProgress>
            </>) : (<>
                <ScheduleComponent selectedDate={new Date()} popupOpen={onPopupOpen} actionComplete={onActionComplete} width={windowDimensions.width - 128} height={windowDimensions.height - 128} ref={scheduleObj} eventSettings={{ dataSource: shifts }} eventRendered={onEventRendered}>
                    <ViewsDirective>
                        <ViewDirective option='Week'></ViewDirective>
                    </ViewsDirective>
                    <Inject services={[Week, DragAndDrop]} />
                </ScheduleComponent>
            </>)}

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={(event) => { setOpen(false) }}
                message={snackbarMessage}
                anchorOrigin={{ vertical:"top", horizontal:'center' }}
                action={action}
            >
            </Snackbar>
        </div>
    );

}

export default LandingPage;