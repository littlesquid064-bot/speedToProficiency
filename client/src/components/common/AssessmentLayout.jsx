import React from 'react';
import RoadmapSidebar from './RoadmapSidebar';

const AssessmentLayout = ({ children, currentStep }) => {
    return (
        <div style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            background: '#f8fafc'
        }}>
            <RoadmapSidebar currentStep={currentStep} />
            <div style={{
                flex: 1,
                overflowY: 'auto',
                position: 'relative'
            }}>
                {children}
            </div>
        </div>
    );
};

export default AssessmentLayout;
