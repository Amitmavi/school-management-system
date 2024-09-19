import RegistrationFrom from "../../../../../components/user/user-registration/userRegistration"
import Navbar from "../../../components/bar/navbar/Navbar"

const adduser = ()=>{
    return (
        <div className="list">
          <div className="listContainer">
            <Navbar/>

{/* AREA TO EDIT START */}

            <RegistrationFrom/>

{/* AREA TO EDIT END */}


          </div>
        </div>
      )
}

export default adduser