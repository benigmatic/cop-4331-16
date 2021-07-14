import React from 'react';

function LoggedInName()
{

    var _ud = localStorage.getItem('user_data');
    console.log(JSON.stringify(_ud));

    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    console.log(userId);

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };    

  return(
   <div id="loggedInDiv">

   <span id="userName">Logged In As {firstName} {lastName} ID: {userId}</span><br />
   <button type="button" id="logoutButton" class="buttons" 

     onClick={doLogout}> Log Out </button>
   </div>
  );
};

export default LoggedInName;
