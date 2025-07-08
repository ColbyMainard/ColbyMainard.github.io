/* https://www.w3schools.com/js/DEFAULT.asp */

function printCurrentTime(){
    var datetime = new Date();
    console.log("Current Time:");
    console.log(datetime.toISOString());
}

printCurrentTime();