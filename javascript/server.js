const {MongoClient} = require('mongodb');

console.log(MongoClient)

async function main() {

    const url = "mongodb+srv://Bus-Details:bus@cluster0.u843j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);

    try {
        await client.connect();
        
    } catch (e) {
        console.error(e);   
    } finally {
        await client.close();
    }



}

main().catch(console.error);

async function findOneListingByName(client,nameofListing) {
    const result = await client.db("Bus_details").collection("Bus").findOne({name: nameofListing});

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameofListing}'`);
        console.log(result);
    }
}