exports.storeToken = function ( tok )
{
    try
    {
      localStorage.setItem('token_data', tok.accessToken);
      console.log("Token stored");
    }
    catch(e)
    {
      console.log(e.message);
    }
}

exports.retrieveToken = function ()
{
    var ud;
    try
    {
      ud = localStorage.getItem('token_data');
      console.log("ud: "+ ud);
    }
    catch(e)
    {
      console.log(e.message);
    }
    return ud;
}

exports.retrieveTokenPassword = function ()
{
    var ud;
    try
    {
      ud = localStorage.getItem('pass_data');
    }
    catch(e)
    {
      console.log(e.message);
    }
    return ud;
}

exports.retrieveTokenEmail = function ()
{
    var ud;
    try
    {
      ud = localStorage.getItem('email_data');
    }
    catch(e)
    {
      console.log(e.message);
    }
    return ud;
}