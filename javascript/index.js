// let vehicle_ids = [];
// let dates = [];
// function makerequest() {
//     return $.ajax(
//         {
//             url: "https://vgiags.deta.dev/busdetails",
//             dataType: "json",
//             type: 'GET',
//             contentType: "application/json",
//             crossDomain: true,
//             success: function (data) {
//                 for (var i = 0; i < data.length; i++) {
//                     console.log(data[i]);
//                     vehicle_ids.push(data[i]['vehicle_id']);
//                     dates.push([data[i]['vehicle_id'], data[i]['date_field']]);
//                 }
//                 vehical_ids = $.unique(vehicle_ids);
//             }
//         });
// }
// function populate_list1() {
//     $.when(makerequest()).then(function successHandler() {
//         var list1 = document.getElementById("Vehical");
//         for (var i = 0; i < vehicle_ids.length; i++) {
//             var opt = document.createElement("option");
//             opt.val = vehicle_ids[i];
//             opt.text = vehicle_ids[i];
//             list1.add(opt, null);
//         };

//     })
// }
// populate_list1();

// $("#Vehical").change(function () {
//     $("#Dates").empty();
//     var selected = $("#Vehical").val();
//     var list2 = document.getElementById("Dates");
//     for (var i = 0; i < dates.length; i++) {
//         if (dates[i][0] == selected) {
//             var opt = document.createElement("option");
//             opt.val = dates[i][1];
//             opt.text = dates[i][1];
//             list2.add(opt, null);
//         }
//     };
// })

// $("#submittt").click(function () {
//     var vehicle_id = document.getElementById("Vehical").value;
//     var date = document.getElementById("Dates").value;
//     localStorage.setItem("Vehicle_id", vehicle_id);
//     localStorage.setItem("Date", date);
//     window.location.href = "front.html";
// }
// );

const {MongoClient} = require('mongodb');

async function main() {

    const url = "mongodb+srv://Bus-Details:bus@cluster0.u843j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);

    try {
        await client.connect();


        await getbuses(client,69);
        
    } catch (e) {
        console.error(e);   
    } finally {
        await client.close();
    }



}

main().catch(console.error);

async function getbuses(client,nameofListing) {
    const result = await client.db("Bus_details").collection("Bus").find({},{vehicle_id:1,_id:0});

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameofListing}'`);
        console.log(result);
    } else {
        console.log(`No listing found with the name '${nameofListing}'`);

    }
}



