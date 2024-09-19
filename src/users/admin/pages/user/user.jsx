import "./user.scss"
import Datatable from "../../../../components/widget/datatable/Datatable"
import Navbar from "../../components/bar/navbar/Navbar"

const AllUser = () => {
  return (
    <div className="list">
      
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default AllUser