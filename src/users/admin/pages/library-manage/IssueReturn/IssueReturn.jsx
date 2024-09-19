import React from 'react';
import IssueReturnComponent from '../../../../../components/Library-management/IssueReturn/IssueReturn'; // Corrected import path
import Navbar from '../../../components/bar/navbar/Navbar';

const IssueReturn = () => {
    return (
        <div className="list">
            <div className="listContainer">
                <Navbar />
                <IssueReturnComponent /> {/* Rendering IssueReturnComponent */}
            </div>
        </div>
    );
}

export default IssueReturn;
