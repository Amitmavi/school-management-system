import React from 'react';

const MyWebView = () => {
  return (
  <div style={{ width: '375px', height: '667px', border: '1px solid #000', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
      {/* Phone frame */}
      <div style={{ width: '100%', height: '100%', borderRadius: '20px', overflow: 'hidden', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {/* WebView component */}
        <iframe
          src="https://pulsezest-school.web.app/"
          title="Web View"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
};

export default MyWebView;
