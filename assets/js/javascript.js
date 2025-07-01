/* https://www.w3schools.com/js/DEFAULT.asp */

var datetime = new Date();
console.log("Current Time:");
console.log(datetime.toISOString());

/* https://www.w3schools.com/js/js_class_intro.asp */

class Data{
    constructor(){}
    /* https://www.w3schools.com/js/js_class_static.asp */
    static editDocument(elementID, contents){
        document.getElementById(elementID).innerHTML = contents;
    }
}

setTimeout(
    Data.editDocument(
        "contactMe", 
        document.getElementById(
            "contactMe"
        ).innerHTML
    ), 
    3000
);

/* https://www.w3schools.com/js/js_callback.asp */

/* https://www.w3schools.com/js/js_asynchronous.asp */

/* https://www.w3schools.com/js/js_promise.asp */

/* https://www.w3schools.com/js/js_async.asp */
