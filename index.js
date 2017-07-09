"use strict";

(function ()
{
    $(document).ready(handleDocumentReady);

    return {};
    
    function handleErrors(msg, url, line, col, error) 
    {
        var extra = !col ? '' : '\ncolumn: ' + col;
        extra += !error ? '' : '\nerror: ' + error;
        console.log("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
        return true;
    }

    function handleDocumentReady()
    {
		console.log('Ready to go');
    }
})();
