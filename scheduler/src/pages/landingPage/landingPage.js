import React, { useState, useEffect } from 'react';
import {
    ScheduleComponent, Week, Inject,
    ViewsDirective, ViewDirective
} from '@syncfusion/ej2-react-schedule';
import "./landingPage.css";

const LandingPage = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="scheduler-container">
            <ScheduleComponent selectedDate={new Date()} width={windowDimensions.width - 128} height={windowDimensions.height - 128}>
                <ViewsDirective>
                    <ViewDirective option='Week'></ViewDirective>
                </ViewsDirective>
                <Inject services={[Week]} />
            </ScheduleComponent>
        </div>
    );

}

export default LandingPage;