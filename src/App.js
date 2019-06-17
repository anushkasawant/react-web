import React from 'react';
import Assets from '../src/component/asset'
import Products from '../src/component/products'
import QrScanner from './component/qr-scanner';
function App() {
  return (
      <React.Fragment>
          <Assets/>
          {/* <Products/> */}
          <QrScanner/>
      </React.Fragment>
  );
}

export default App;
