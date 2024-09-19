// FeesDiscountList.js
import React from 'react';

function FeesDiscountList() {
  return (
    <div style={{ flex: 1, height: "610px",marginLeft: "60px", width: "40%", padding: "20px", border: "1px solid #ccc", borderRadius: "2px", backgroundColor: "#e0e0e0", marginRight: "10px", marginBottom: "20px", overflowY: "auto", overflowX: "hidden" }}>
      <h3 style={{ fontFamily: 'Georgia, Times, serif', color: 'rgb(95, 88, 88)', marginBottom: '20px', fontSize: '30px', marginLeft: '10px', marginTop: '10px' }}>Fees Discount List</h3>
      <form style={{ width: "100px"}}>
        <input type="text" placeholder="Search..." className="search-input" style={{ width: '400px'}} />
      </form >
      <div style={{ marginTop: "20px", width: "1020px"}}>
        <table style={{ width: "610px", borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#b1abab', color: '#1a0707', border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Name</th>
              <th style={{ backgroundColor: '#b1abab', color: '#1a0707', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Discount Code</th>
              <th style={{ backgroundColor: '#b1abab', color: '#1a0707', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ccc' }} />
      </div>
    </div>
  );
}

export default FeesDiscountList;
