import React, {useEffect , useState} from 'react';
import {useNavigate } from 'react-router-dom';

const About = () => {

  const Navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try{
      const res = await fetch('/about', {
        method:'GET',
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials:"include"
      });

      const data = await res.json();
      console.log("data :" , data);
      setUserData(data); 

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
      
    }catch (err) {
      console.log(err);
      Navigate('/login');
    }
  }

  useEffect(() => {
    callAboutPage();
  }, [])
  

  return (
    <div className='form'>
      <form method='GET'>
        <div className="row mt-3">
          <div className="col-md-4">
            <img src="https://cdn.pixabay.com/photo/2021/02/12/13/43/among-us-6008615__340.png" alt="img" height="200px" />
          </div>

          <div className="col-md-6">
            <div className="profile">
              <h4>{userData.name}</h4>
              <h5>{userData.work}</h5>
              <p className="mt-3 mb-0">Bachelor of Engineering</p>
              <p className="mb-5 mt-0">Computer Science</p>

              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Profile</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Work Experience</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-2">
            <input type="submit" className='btn btn-secondary' value="Edit Profile" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div>
              <h6>Work Links</h6>
              <a href="https://github.com/Awesomeap2001" target="_blank" className='nav-link'>Github</a>
              <a href="https://www.linkedin.com/in/aniket-patil-636b7022a/" target="_blank" className='nav-link'>LinkedIn</a>
              <a href="https://github.com/Awesomeap2001" target="_blank" className='nav-link'>Github</a>
              <a href="https://www.linkedin.com/in/aniket-patil-636b7022a/" target="_blank" className='nav-link'>LinkedIn</a>            </div>
          </div>

          <div className="col-md-8 ps-4 mt-3">
            <div className="tab-content" id='myTabContent'>
              <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <div className="row">
                  <div className="col-md-6">
                    <label>User Id</label>
                  </div>
                  <div className="col-md-6">
                    <p>3425167</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.name}</p>
                  </div>

                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.phone}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.email}</p>
                  </div>
                </div>
              </div>

              <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                <div className="row">
                  <div className="col-md-6">
                    <label>Profession</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.work}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Type</label>
                  </div>
                  <div className="col-md-6">
                    <p>MERN Stack</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Experience</label>
                  </div>
                  <div className="col-md-6">
                    <p>2 years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>


  )
}

export default About