import React, {useEffect , useState} from 'react'
import phoneImage from '../images/phone.png'
import emailImage from '../images/email.png'
import addressImage from '../images/address.png'

const Contact = () => {

  const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});

  const userContact = async () => {
    try{
      const res = await fetch('/getdata', {
        method:'GET',
        headers:{
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      console.log("data :" , data);
      setUserData({...userData, name:data.name, email:data.email, phone:data.phone}); 

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
      
    }catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    userContact();
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name]:value})
  }

  // Send the data to backend
  const contactForm = async (e) => {
    e.preventDefault();

    const {name,email,phone,message} = userData;

    const res = await fetch('/contact', {
      method:'POST',
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({name,email,phone,message})

    });

    const data = await res.json();

    if(!data){
      console.log("Message not sent");
    }else{
      alert("Message sent");
      setUserData({...userData, message:""});
    }
  }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1 d-flex justify-content-center">
            <div className="box d-flex justify-content-start align-items-center w-25 m-4 p-2">
              <img src={phoneImage} alt="Phone" height="40px" />
              <div className="align-items-center ms-3">
                <h5 className='mb-0'>Phone</h5>
                <p className='mb-0'>+91 95882 95882</p>
              </div>
            </div>

            <div className="box d-flex justify-content-start align-items-center w-25 m-4 p-2">
              <img src={emailImage} alt="Email" height="40px" />
              <div className="align-items-center ms-3">
                <h5 className='mb-0'>Email</h5>
                <p className='mb-0'>aniket@patil.com</p>
              </div>
            </div>

            <div className="box d-flex justify-content-start align-items-center w-25 m-4 p-2">
              <img src={addressImage} alt="Address" height="40px" />
              <div className="align-items-center ms-3">
                <h5 className='mb-0'>Address</h5>
                <p className='mb-0'>Pune, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <form method='POST' id='contact_form' className='form'>

        <h2 className='text-center'>Get in Touch</h2>

        <div className="row mt-4">
          <div className="col">
            <input type="text" id='contact_form_name' className='form-control' placeholder='Name' onChange={handleInputs} name='name' value={userData.name} required="true" />
          </div>
          <div className="col">
            <input type="email" id='contact_form_email' className='form-control' placeholder='Email' onChange={handleInputs} name='email' value={userData.email} required="true" />
          </div>
          <div className="col">
            <input type="number" id='contact_form_phone' className='form-control' placeholder='Phone' onChange={handleInputs} name='phone' value={userData.phone} required="true" />
          </div>
        </div>

        <div className="row mt-4 mx-1">
          <textarea className="form-control" id="contact_form_message" cols="30" rows="8" placeholder='Type your Message here' onChange={handleInputs} name='message' value={userData.message}></textarea>
        </div>

        <div className='mt-4 ms-2'>
          <button type="submit" className='btn btn-primary' onClick={contactForm}>Send Message</button>
        </div>

      </form>
    </>
  )
}

export default Contact