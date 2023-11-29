import express from "express";
import User from "../../models/User.js";
import Transaction from "../../models/Transaction.js";

//get transaction by user api key
export const updateUser = async (req, res) => {
   const id = req.user._id
    try {
        const Key = await User.findOne({_id:id });
        if(!Key){
            return res.status(400).json({msg:"No user found"})
        }
        
        // update autCode in user and save and send response

        Key.authCode = req.body.authCode;
        Key.save();
        res.status(200).send({msg: "User update successfully"});

    } catch (error) {
        console.log("there was an  error", error);
        res.status(200).send(error);
    }
}

