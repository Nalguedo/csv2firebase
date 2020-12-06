var admin = require("firebase-admin");

var serviceAccount = require("./private.json");

const url = "https://zzzzzzzzzzzzzzzzzzzz.firebaseio.com/";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: url,
});

const csv = require("csv-parser");
const fs = require("fs");

const firestore = admin.firestore();

fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", (row) => {
        console.log(row);
        if (row) {
            firestore.collection("csv").add({
                EndDate: row.EndDate,
                EndTime: row.EndTime,
                EndLatitude: row.EndLatitude,
                EndLongitude: row.EndLongitude,
            });
        } else {
            console.log("No data");
        }
    })
    .on("end", () => {
        console.log("CSV file successfully processed");
    });
