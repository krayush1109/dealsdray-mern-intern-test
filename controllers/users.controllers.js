const User_Collection = require('../models/user.schema');

// utility/helper functions
var getNextSerialNumber = require('../utils/getNextSerialNumber');


exports.handleRegistration = async (req, res, next) => {
    try {
        let { full_name, username, password } = req.body;
        // console.log(full_name, username, password);     

        const new_serial_no = await getNextSerialNumber();
        // console.log("New Serial No : ",  new_serial_no);

        // saving details to db
        await User_Collection.register(new User_Collection({
            f_sno: new_serial_no,
            username: username,
            f_full_name: full_name,
        }), password);

        res.send("Registered Sucessfully");
    } catch (err) {
        console.log(err.message)
        res.send(err);
        // res.send(err.message);
        // res.send("ERROR: ", err);
    }
}