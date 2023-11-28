import React, {useEffect, useState} from "react";
require('../styles/allUsersEntryViewModal.css');

const AllUsersEntryViewModal = () => {

    const [allEntries, setAllEntries] = useState([]);
    const getAllUsers = async () => {
        try{
            const request = await fetch('http://localhost:3001/allEntries');
            if(request.ok){
                const requestJson = await request.json();
                setAllEntries(()=> requestJson);
            }
        }catch(error){
            console.log(`moh says error retriving data...${error}`);
        }
    };
    getAllUsers();

    useEffect(() => {
        getAllUsers();
    }, [allEntries]);
    let serialNo = 0;
    // Get all users entries
    return(
        <div className="container entryViewModalTopContainer" id="entryViewModalTopContainer">
            <h1 className="text-center" id="viewModalTitle">All users submitted entries</h1>
            <table className="table table-responsive w-100 table-bordered" id="entryViewModalContainer">
                <tbody id="entriesTable">
                    <tr>
                        <th>Serial No</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Phone</th>
                        <th>UserID</th>
                    </tr>
                    {allEntries.map(entry => (
                        <tr key={entry._id}>
                            <td>{serialNo++}</td>
                            <td>{entry.fName}</td>
                            <td>{entry.lName}</td>
                            <td>{entry.email}</td>
                            <td>{entry.dob}</td>
                            <td>{entry.phone}</td>
                            <td>{entry.userID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllUsersEntryViewModal;
