import { API_KEY, SECRET_KEY, PUBLIC_KEY, URL  } from "../../config/index.js";
import moment from 'moment-timezone';
import User from "../../models/User.js";

export const BuyElectricity =  async(req, res)=>{

   const id = req.user._id 
   let user = await User.findById({ _id: id })
   if(req.body.paymentmethod == "Wallet"){
    if (user.balance < req.body.amount){
        console.log("error here")
        return res.status(200).send({msg: 'insufficent balance please fund your wallet'})
       }
   }
  
    function generateRequestId() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        const hour = String(today.getHours()).padStart(2, '0');
        const minute = String(today.getMinutes()).padStart(2, '0');
      
        const requestId = `${year}${month}${day}${hour}${minute}`;
        
        // You can concatenate it with any other alphanumeric string as desired
        const concatenatedRequestId = requestId + 'ad8ef08acd8fc0f';
      
        return concatenatedRequestId;
      }
    
     
      
      const requestId = generateRequestId();

    try{
      fetch(`${URL}/pay`, { 
        method: "Post", 
        headers:{
          // 'Authorization': 'Basic',
          "api-key": `${API_KEY}`, 
          "secret-key": `${SECRET_KEY}`,
           "public-key": `${PUBLIC_KEY}`,
           "Content-Type": "application/json",
        },
      body: JSON.stringify(
        {
          request_id:requestId,
          billersCode:req.body.meterNumber,
          serviceID:req.body.product_code,
          variation_code:"prepaid",
           amount:req.body.amount,
             phone:req.body.phone
      }),
    
    }).then(res => res.json()).then(data => {
 console.log("data here", data)
     res.status(200).send(data);
    }).catch(err => {
      console.log("there was an error ", err)
    })
  
    }catch(error){
      console.log(error)
      return res.status(500).json({msg: 'Error'})
    }


}