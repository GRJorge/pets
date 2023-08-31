const { connect } = require("mongoose");

const url = "mongodb://localhost:27017/";
const dbName = "pets";

(async () => {
    try {
        await connect(url + dbName);
    } catch (error) {
        console.log("Error DB:\n" + error);
    }
})();
