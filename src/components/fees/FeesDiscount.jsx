import React from 'react';
import './stylee.css';

function FeesDiscount() {

  return (
    <div style={{ display: 'flex' }}>
    {/* Left Part */}
    <div style={{ flex: '1', marginRight: '10px' }}>
        
    <div>
      <h2>Add Fees Discount</h2>
      <br></br>
      <form>
        <div>
        <h5>Name<span style={{ color: 'red', fontSize: '18px', marginRight: '5px' }}>*</span></h5>
        <input
              type="text"
              id="percentage"
              // value={percentage}
              // onChange={(e) => setPercentage(e.target.value)}
              // disabled={amountType !== "percentage"}
            />
        </div>
        <div>
        <h5>Discount Code<span style={{ color: 'red', fontSize: '18px', marginRight: '5px' }}>*</span></h5>
        <input
              type="text"
              id="percentage"
              // value={percentage}
              // onChange={(e) => setPercentage(e.target.value)}
              // disabled={amountType !== "percentage"}
            />
        </div>
        <div>
            <h5>Discount Type</h5>
            <div className="label">
            <label htmlFor="amountTypeNone">Percentage</label>
            <input
              type="radio"
              id="amountTypePercentage"
              name="amountType"
              value="percentage"
              // checked={amountType === "percentage"}
              // onChange={(e) => setAmountType(e.target.value)}
            />
            <label htmlFor="amountTypeNone">Fix Amount</label>
            <input
              type="radio"
              id="amountTypePercentage"
              name="amountType"
              value="percentage"
              // checked={amountType === "percentage"}
              // onChange={(e) => setAmountType(e.target.value)}
            />
            </div>
          </div>
          <div>
          <div className="type">
            <label htmlFor="amountTypePercentage">Percentage (%) <span style={{ color: 'red', fontSize: '18px', marginRight: '5px' }}>*</span></label>
            <input
              type="text"
              id="percentage"
              // value={percentage}
              // onChange={(e) => setPercentage(e.target.value)}
              // disabled={amountType !== "percentage"}
            />
          </div>
          <div>
            <label htmlFor="amountTypeFixAmount">Fix Amount ($) <span style={{ color: 'red', fontSize: '18px', marginRight: '5px' }}>*</span></label>
            <input
              type="text"
              id="fixAmount"
              // value={fixAmount}
              // onChange={(e) => setFixAmount(e.target.value)}
              // disabled={amountType !== "fixAmount"}
            />
          </div>
          <div>
            <label htmlFor="description">Description ($) <span style={{ color: 'red', fontSize: '18px', marginRight: '5px' }}>*</span></label>
            <select size="3" ><input
              type="text"
              id="percentage"
              // value={percentage}
              // onChange={(e) => setPercentage(e.target.value)}
              // disabled={amountType !== "percentage"}
            />
            </select>
          </div>
        </div>
        <button style={{ margin: '10px' }}>Save</button>
      </form>
    </div>
    </div>  
    <div className="container">
      <div className="vertical-line"></div>
      <div className="content">
        {/* Your content goes here */}
      </div>
    </div>
      {/* Right Part */}
      <div className="content-wrapper">
      <div style={{ flex: '1', overflowY: 'scroll', overflowX: 'hidden', height: 'calc(100vh - 100px)'  }}>
      <h2>Fees Discount List</h2>
      <br></br>
      <br></br>
      <form>
      <input
        type="text"
        placeholder="Search..."
      />
    </form>
    <div class="card-list">
      <table style={{ height:'15px'}}>
      <thead>
      <tr style={{ backgroundColor: 'white', color: 'black'  }}>
          <th>Name</th>
          <select style={{ width: '10px', height:'15px'}}>
            <option value=""></option>
            </select>
          <th>Discount Code</th>
          <select style={{ width: '10px', height:'15px'}}>
          <option value=""></option>
          </select>
          <th>Percentage (%)</th>
          <select style={{ width: '10px', height:'15px'}}>
            <option value=""></option>
            </select>
          <th>Amount ($)</th>
          <select style={{ width: '10px', height:'15px'}}>
            <option value=""></option>
            </select>
        </tr>
      </thead>
    </table>
    <br></br>
    <div class="footer">
    <p>Records: 1 to 3 of 3</p>
  </div>
      <hr />
      {/* More content */}
    </div>
      
      </div>
    </div>
    </div>
  );
}

export default FeesDiscount;
