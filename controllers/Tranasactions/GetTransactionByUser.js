import express from "express";
import User from "../../models/User.js";
import Transaction from "../../models/Transaction.js";

//get transaction by user api key
export const getTransactionByUser = async (req, res) => {
    const id = req.user_id
   
    try {
        
        const transaction = await Transaction.find({id}).sort( { userid: -1 } );
        const data = transaction
        res.status(200).send({ msg: "Transaction retrieved successfully", data });
    } catch (error) {
        console.log("there was an  error", error);
        res.status(200).send(error);
    }
}

