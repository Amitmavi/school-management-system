import Navbar from "../../components/bar/navbar/Navbar";
import "./home.scss";
import Widget from "../../../../components/widget/Widget";
import Featured from "../../../../components/featured/Featured";
import Chart from "../../../../components/widget/chart/Chart";
import Table from "../../../../components/widget/table/Table";

const Home = () => {
  return (
    <div className="home">
 
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="total-student" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
