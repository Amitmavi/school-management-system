  import React, { useEffect } from 'react';

function FeesDiscount() {
  useEffect(() => {
    // Freeze the page by setting overflow to hidden when component mounts
    document.body.style.overflow = 'hidden';

    // Restore overflow when component unmounts
    return () => {
      document.body.style.overflow = ''; // Empty string restores default overflow behavior
    };
  }, []);

  return (
    <div style={{ flex: 1, marginRight: '60px', marginBottom: '20px' }}>
      <div>
        <h3 style={{ fontFamily: 'Georgia, Times, serif', color: 'rgb(95, 88, 88)', marginBottom: '20px', fontSize: '30px', marginLeft: '60px', marginTop: '10px' }}>Fees Discount</h3>
        <div>
          <h5 style={{marginLeft: "60px"}}>Name</h5>
          <input
            id="feesType"
            name="feesType"
            style={{ width: "70%", padding: "8px", marginLeft: "60px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <div>
          <h5 style={{marginLeft: "60px"}}>Discount Code</h5>
          <input
            id="feesType"
            name="feesType"
            style={{ width: "70%", padding: "8px", marginLeft: "60px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <h3 style={{marginLeft: "60px"}}>Discount</h3>
        <br />
        <div>
          <label htmlFor="fixAmount" style={{marginLeft: "60px"}}>Fix Amount ($)</label><br></br>
          <input
            id="feesType"
            name="feesType"
            style={{ width: "70%", padding: "8px", marginLeft: "60px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          /><br></br>
          <label htmlFor="" style={{marginLeft: "60px"}}>Description</label>
          <div>
            <textarea
              id="groupDescriptions"
              style={{ width: "73%", padding: "20px", marginLeft: "60px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
          </div>
          <div>
            <button style={{ width: '8rem', height: '40px', backgroundColor: 'rgb(93, 93, 87)', marginTop: '0rem', marginLeft: '60px', fontSize: '18px', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px', outline: 'none', transition: 'background-color 0.3s ease', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeesDiscount;