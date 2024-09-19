import React from 'react';
import BooklistComponent from '../../../../../components/Library-management/Book-list/BookList';
import Navbar from '../../../components/bar/navbar/Navbar';


const BookList = () => {
    return (
        <div className="list">
            <div className="listContainer">
                <Navbar />
                
                {/* Include StudentAdmissionForm component */}
                <BooklistComponent />
            </div>
        </div>
    );
}

export default BookList;
