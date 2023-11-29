import express from "express";
import Transaction from "../../models/Transaction.js";
import User from "../../models/User.js";
import { sendBorrowToken, sendToUserEmail, sendSms } from "../../utils/Index.js";

//save transaction details
export const saveTransaction = async (req, res ) => {
    console.log("data here",req.body)
    const user = req.user
    const paymentmode = req.body.paymentmode
    const amount = req.body.amount
    const servicecharge =  req.body.servicecharge
    const Saved = {...req.body}
    const saveTransaction = new Transaction(Saved);
    const interest = parseInt(amount * 0.25)
    const newauthCode = req.body.authCode


    console.log("this is saved", Saved)
    
  
    try {
       const _id = user._id;
       const Key = await User.findOne({_id : _id });
        if(!Key){
            return console.log("not found")
        }

        console.log(servicecharge, amount, interest)
       // console.log("this data",saveTransaction)
        if(paymentmode === "Wallet"){
            const newamount = parseInt(amount) + parseInt(servicecharge)
            const balance = parseInt(Key.balance) - newamount ;
            Key.balance = balance;
            Key.save();
           await saveTransaction.save();
           const data = saveTransaction
            //sendToUserEmail(data);
           // sendSms(data)
        return  res.status(201).send({ msg: "Transaction saved successfully", data });
        }

        if(Saved.paymentmode === 'vendor' && Saved.type === 'cable'){
            const newamount = parseInt(amount) + parseInt(servicecharge)
            
            const balance = parseInt(Key.balance) - newamount
            Key.balance = balance;
              const newclaims = parseInt(Key.claims) + parseInt(70)
              Key.claims = newclaims; 
              Key.save();
              await saveTransaction.save();
              const data = saveTransaction
             
              //sendToUserEmail(data);
             // sendSms(data)
            return res.status(201).send({ msg: "Transaction saved successfully", data });
        }  

        if(Saved.paymentmode === 'vendor' && Saved.type === 'electricity'){
            const newamount = parseInt(amount) + parseInt(servicecharge)
            
            const balance = parseInt(Key.balance) - newamount
            Key.balance = balance;
              const newclaims = parseInt(Key.claims) + parseInt(70)
              Key.claims = newclaims; 
              Key.save();
              await saveTransaction.save();
              const data = saveTransaction
             
              //sendToUserEmail(data);
             // sendSms(data)
            return res.status(201).send({ msg: "Transaction saved successfully", data });
        } 

        if(Saved.paymentmode === 'vendor' && Saved.type === 'airtime'){
            const newamount = parseInt(amount) + parseInt(servicecharge)
            
            const balance = parseInt(Key.balance) - newamount
            Key.balance = balance;
                const commission = parseInt(Saved.data.content.transactions.commission)  * parseInt(50) / parseInt(100) 
              const newclaims = parseInt(Key.claims) + parseInt(commission)
              Key.claims = newclaims; 
              Key.save();
              await saveTransaction.save();
              const data = saveTransaction
             
            //   //sendToUserEmail(data);
            //  // sendSms(data)
            return res.status(201).send({ msg: "Transaction saved successfully", data });
           
        
        } 

        if(Saved.paymentmode === 'vendor' && Saved.type === 'data'){
            const newamount = parseInt(amount) + parseInt(servicecharge)
            
            const balance = parseInt(Key.balance) - newamount
            Key.balance = balance;
                const commission = parseInt(Saved.data.content.transactions.commission)  * parseInt(50) / parseInt(100) 
              const newclaims = parseInt(Key.claims) + parseInt(commission)
              Key.claims = newclaims; 
              Key.save();
              await saveTransaction.save();
              const data = saveTransaction
             
            //   //sendToUserEmail(data);
            //  // sendSms(data)
            return res.status(201).send({ msg: "Transaction saved successfully", data });
           
        
        } 
        
        




//if transaction type is borrow update users borrowedAmount with amount + service charge
        if(paymentmode == "borrow"){
            const newborrowedAmount =  parseInt(amount) + parseInt(servicecharge) + parseInt(interest);
            Key.borrowedAmount = newborrowedAmount;
            Key.authCode =  newauthCode
            Key.balance = parseInt(Key.balance) + parseInt(40)
            Key.save();
            await saveTransaction.save();
            const data = saveTransaction
            //sendBorrowToken(data);
            //sendSms(data)
           return res.status(201).send({ msg: "Transaction saved successfully", data }); 
        }

        if(paymentmode == "card"){
          await saveTransaction.save();
         const data = saveTransaction
         console.log(data)
         //sendToUserEmail(data);
        return res.status(201).send({ msg: "Transaction saved successfully", data });  
        }
        
    }
    catch (error) {
        console.log("there was an  error", error);
       // res.status(200).send(error);
    }
}





