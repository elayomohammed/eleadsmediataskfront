import React, {useState} from "react";
import AllUsersEntryViewModal from './AllUsersEntryViewModal';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
require('buffer');
require('../styles/usersDetailForm.css');

const UsersDetailForm = () => {

    const [userDetails, setUserDetails] = useState({
        fName: '',
        lName: '',
        email: '',
        dob: '',
        phone: 0,
        userID: null,
    });
    
    // Auth0 variables
    const { user, isAuthenticated, isLoading } = useAuth0();

    // handling inputs
    const handleUserInput = async (event) => {
        const {name, value, type, files} = event.target;
        const userID = document.getElementById('userID').files[0];
        setUserDetails({
            ...userDetails, [name]: value || files[0],
        });
    }

    function validatedateOfBirth(dateOfBirth) {
        // Regular expression patterns for Nigeria and India phone numbers
      
        // Check if the phone number matches either pattern
        if (!new Date().toDateString() - dateOfBirth >= 18) {
          return false;
        } else {
          return true;
        }
    }

    // insert user transaction
    const insertUser = async () => {
        try{
            const reqBody = {
                fName: userDetails.fName,
                lName: userDetails.lName,
                email: userDetails.email,
                dob: userDetails.dob,
                phone: userDetails.phone,
                userID: userDetails.userID,
            };

            const headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}

            validatedateOfBirth(reqBody.dob)?
            axios.post('https://eleadsmediabackendtask.onrender.com/api/insert', reqBody, {headers})
                .then(res =>{
                    console.log(res);
                })
                .catch(error =>{
                    console.error(`elayo says error inserting data: ${error}`);
                }) : window.alert("Your age must be 18 years old or older...");
        }catch(error){
            console.log(`error: ${error}`);
        }
    }

    // handling formsubmission
    const handleSubmitBTN = async (event) => {
        event.preventDefault();
        await insertUser();
        if(insertUser()){
            document.getElementById('userDetailsForm').style.display = 'none';
            document.getElementById('entryViewModalTopContainer').style.display = 'block';
            return true;
        }else{
            console.log('theres a problem inserting user data...');
        }
    }

    // Auth0 settup
    if (isLoading) {
        return <div>Loading ...</div>;
    }
    return(
        isAuthenticated && (document.getElementById('login').style.display = 'none') && (
            <div>
                <h5>Welcome {user.name}</h5><br />
                <form onSubmit={handleSubmitBTN} className="container userDetailsFormControl" id="userDetailsForm">
                    <h3 className="text-center">Please  enter your details</h3>
                    <div className="form-group row">
                        <div className="col">
                            <input type="text" className="input-small form-control form-control-lg" name="fName" placeholder="first name" onChange={handleUserInput} />
                        </div>
                        <div className="col">
                            <input type="text" className="input-small form-control form-control-lg" name="lName" placeholder="last name" onChange={handleUserInput} />
                        </div>
                    </div><br /> <br />
                    <div className="form-group row">
                        <div className="col">
                            <input type="email" className="input-small form-control form-control-lg" name="email" placeholder="email address" onChange={handleUserInput} />
                        </div>
                    </div><br /> <br />
                    <div className="form-group row">
                        <div className="col">
                            <input type="date" className="input-small form-control" name="dob" placeholder="date of birth" onChange={handleUserInput} />
                        </div>
                        <div className="col">
                            <input type="phone" className="input-small form-control" name="phone" placeholder="phone number" onChange={handleUserInput} />
                        </div>
                    </div><br /> <br />
                    <div className="form-group row">
                        <div className="col">
                            <input type="text" className="input-small form-control" name="language" placeholder="language" onChange={handleUserInput} />
                        </div>
                        <div className="col">
                            <label htmlFor="userID"><input type="file" className="input-small form-control" name="userID" id="userID" accept=".jpeg, .png, .pdf" onChange={handleUserInput} /> Upload your ID</label>
                        </div>
                    </div><br />
                    <div className="form-group text-center">
                        <input type="checkbox" id="terms" name="termStatus" /><label htmlFor="terms">Accept terms and conditions</label>
                    </div>
                    <div className="form-group text-center">
                        <input type="submit" value="Submit" className="btn-lg btn btn-active" name="id" style={{backgroundColor: '#3C4FAF'}} />
                    </div>
                </form>
                {handleSubmitBTN? <AllUsersEntryViewModal /> : ''}
            </div>
        )
    )
}

export default UsersDetailForm;
