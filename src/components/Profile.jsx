import React, {useEffect, useState} from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import userApi from '../api/userApi';
export default function Profile(props) {
  const { setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender]= useState("");
  const [mobile, setMobile]= useState("");
  useEffect( ()=>{
    const fetchUser = async () => { 
      const result = await userApi.get("/auth/getuserdata", {
                          withCredentials:true
                        });
      const userData = result?.data || {}; 
      setFirstName(userData?.user?.firstName || ""); 
      setLastName(userData?.user?.lastName || ""); 
      setEmail(userData?.user?.email || ""); 
      setGender(userData?.user?.gender || ""); 
      setMobile(userData?.user?.phone || "");                  
    }
    fetchUser();
  }, []);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await userApi.post("/save", 
                          {
                            firstName:firstName,
                            lastName:lastName,
                            email:email, 
                            gender:gender,
                            phone: mobile 
                          }, 
                          {withCredentials: true});
    if(result){
      setUser(result.data.user);
    }
  }
  return (
    <div className="bgf-other-wrapper">
        <div className='bgf-other-title'>
          <span>{props.pageHeading || "Personal Information"}</span> 
          <span  onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</span>
        </div>
        <div className='profile-form'>
          <form onSubmit={handleSubmit}>
            <div className='input-group-flex'>
              <div className="input-with-placeholder">
                  <input 
                    type="text" 
                    value={firstName}
                    placeholder=" "
                    onChange={(e) => setFirstName(e.target.value)} 
                    disabled={!isEditing}
                    style={isEditing ? { background: "none" } : {}}
                  />
                  {!(firstName) && <label htmlFor="firstname">First Name</label>}
              </div>
              
              <div className="input-with-placeholder">
                  <input 
                    type="text" 
                    value={lastName}
                    placeholder=" "
                    onChange={(e) => setLastName(e.target.value)} 
                    disabled={!isEditing}
                    style={isEditing ? { background: "none" } : {}}
                  />
                  {!(lastName) && <label htmlFor="lastname">Last Name</label>}
              </div>
              <button disabled={!isEditing}>Save</button>
            </div>

            <div className='input-group-block'>
              <label htmlFor="gender" className='label-title'>Gender</label>
              <div className="input-group radio-group">
                <label htmlFor='male'>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    onChange={(e) => setGender(e.target.value)} 
                    disabled={!isEditing}
                    style={isEditing ? { background: "none" } : {}}
                    checked={"male" === gender.trim()}
                  />
                  <span>Male</span>
                </label>

                <label htmlFor='female'>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="female"
                    onChange={(e) => setGender(e.target.value)} 
                    disabled={!isEditing}
                    style={isEditing ? { background: "none" } : {}}
                    checked={"female" === gender.trim()}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            <div className='input-group-block single'>
              <label htmlFor='email' className='title-label'>Email</label>
              <div className="input-with-placeholder">
                  <input 
                    type="text" 
                    value={email}
                    placeholder=" "
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled={!isEditing}
                    style={isEditing ? { background: "none" } : {}}
                  />
                  {!(email) && <label htmlFor="email">Email</label>}
              </div>
            </div>

            <div className='input-group-block single'>
              <label htmlFor='mobile' className='title-label'>Mobile</label>
              <div className="input-with-placeholder">
                  <input 
                    type="text" 
                    value={mobile}
                    placeholder=" "
                    onChange={(e) => setMobile(e.target.value)} 
                    disabled={!isEditing}
                    style={isEditing ? { background: "none" } : {}}
                  />
                  { !(mobile) && <label htmlFor="mobile">mobile</label> }
              </div>
            </div>

          </form>
        </div>
    </div>
  )
}
