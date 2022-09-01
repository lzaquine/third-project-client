import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import robotavatarum from '../../Image/robotavatarum.png';

function Profile() {
  const { user, logout }  = useContext(AuthContext); 
  /* const navigate = Navigate() */
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();


  const storedToken = localStorage.getItem("authToken");

  const deleteProfile = () => {
      axios.delete(`${process.env.REACT_APP_API_URL}/profile/${user._id}`)
      .then(() => {
        logout();
        navigate("/signup")
      })
      .catch((err) => console.log(err));
  }

  const getProfile = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile/${user._id}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  getProfile();
}, [user]);

  return (
    <div>
      <Link to="/" className='btn  btn-sm rounded-lg text-white text-center mr-5'>Home Page</Link>
      <Link className="btn  btn-sm rounded-lg text-white text-center mr-5" to="/app">APPLICATIONS</Link>
      <Link to="/editprofile" className="btn btn-sm rounded-lg text-white text-center mr-5 ">Edit Profile</Link>
      <button className="btn  btn-sm rounded-lg text-white text-center mr-5 " onClick={deleteProfile}>Delete Profile</button>
      <button className="btn  btn-sm rounded-lg text-white text-center mr-5" onClick={logout}>Sign Out</button>
    <img src={robotavatarum} alt="logo" className='w-1/2 p-1 translate-x-1/2 mb-5'/>
      
      
      {profile && (
        <>
          {/* <img src={profileImg} alt={profile.name} /> */}
          <h1 className="-mt-42">Welcome to mAIspace, {profile.name}</h1>
          <p> There's nothing really for you to see here. All your apps are somewhere else. Look for Marv and he'll help you by answering your questions. Good luck </p>
          
        </>
      )}
      
      
      
    </div>
  )
}

export default Profile