import { API_KEY, SECRET_KEY, PUBLIC_KEY, URL  } from "../../config/index.js";


export const Verifycable =  async(req, res)=>{
  
  console.log(req.body)
  

  try{
    fetch(`${URL}/merchant-verify`,{ 
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
        billersCode:req.body.phone,
        serviceID:req.body.product_code,
        type:"prepaid "
   }
    )
  }).then(res => res.json()).then(data => {
console.log(data)
   res.status(200).send(data);
  }).catch(err => {
    console.log("there was an error ", err)
  })

  }catch(error){
    console.log(error)
    return res.status(500).json({msg: 'Error'})
  }

} 

