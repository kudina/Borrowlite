import { API_KEY, SECRET_KEY, PUBLIC_KEY, URL  } from "../../config/index.js";
import User from '../../models/User.js';


export const ReQuery =  async(req, res)=>{
  try{
    fetch(`${URL}/requery`, { 
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
        request_id:req.body.request_id,
    }),
  
  }).then( res => res.json()).then(async data => {
  if(data.response_description == 'TRANSACTION SUCCESSFUL'){
     res.status(200).send(data); 
  }
   
  }).catch(err => {
    console.log("there was an error ", err)
  })

  }catch(error){
    console.log(error)
    return res.status(500).json({msg: 'Error'})
  }

}

