import React from 'react';
import Comparison from '../Comparison/Comparison.jsx';
import QA from '../QA/QA.jsx';
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 65631,
    };
  }

  render() {
    const { productId } = this.state;
    return (
      <div>
        <QA />
        <p>
          Current Product Id:
          {productId}
        </p>
        <Comparison />
      </div>
    );
  }
}

export default App;
