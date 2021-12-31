var vehicle_id = localStorage.getItem("Vehicle_id");
var date = localStorage.getItem("Date");
var resetValue = 0;
// localStorage.setItem("Vehicle_id", resetValue);
// localStorage.setItem("Date", resetValue);

let back_door_entry;
let back_door_exit;

let distress_count;
let front_door_entry;
let front_door_exit;
let key;
let trip;
let trip_count;

function makerequest() {
    return $.ajax(
        {
            url: `https://vgiags.deta.dev/busdetails/vehicle_id/${vehicle_id}?date_field=${date}`,
            dataType: "json",
            type: 'GET',
            contentType: "application/json",
            crossDomain: true,
            success: function (data) {
                back_door_entry = data[0]["back_door_entry"];
                back_door_exit = data[0]["back_door_exit"];
                distress_count = data[0]["distress_count"];
                front_door_entry = data[0]["front_door_entry"];
                front_door_exit = data[0]["front_door_exit"];
                key = data[0]["key"];
                trip = data[0]["trip"];
                trip_count = data[0]["trip_count"];
                console.log(trip_count);
                vehicle_id = data[0]["vehicle_id"];
                date = data[0]["date_field"];
            }
        });
}
function fill() {
    $.when(makerequest()).then(function () {
        $("#distress-count").html(distress_count);
        $("#front-entry").html(front_door_entry);
        $("#front-exit").html(front_door_exit);
        $("#back-entry").html(back_door_entry);
        $("#back-exit").html(back_door_exit);
        $("#trip-count").html(trip_count);
        $("#Vehical").html(vehicle_id);
        $("#front").attr('src',`https://busrecordings.s3.ap-south-1.amazonaws.com/${vehicle_id}_${date}`)
        $("#Dates").html(date);
    });
}
fill();

let dates=[];
function makerequest_date() {
    return $.ajax(
        {
            url: `https://vgiags.deta.dev/busdetails/vehicle_id/${vehicle_id}`,
            dataType: "json",
            type: 'GET',
            contentType: "application/json",
            crossDomain: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    dates.push([data[i]['date_field']]);
                }
            }
        });
}
function populate_list1() {
    $.when(makerequest_date()).then(function successHandler() {
        var list1 = document.getElementById("Dates");
        for (var i = 0; i < dates.length; i++) {
            var opt = document.createElement("option");
            opt.val = dates[i];
            opt.text = dates[i];
            list1.add(opt, null);
        };
    })
}
console.log(vehicle_id);
populate_list1();
var date1;
$("#Dates").click(function url1(){
    date1=document.getElementById("Dates").value;
    console.log(date);
    let url1 = `https://gamerra.herokuapp.com/bus_id/${vehicle_id}/bus_date/${date1}/`;
    var vid = document.getElementsById("sources");
    vid.setAttribute('src', 'http://www.tools4movies.com/trailers/1012/Kill%20Bill%20Vol.3.mp4');
}
)


