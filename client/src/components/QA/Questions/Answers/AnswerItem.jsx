import React from 'react';
import AItemCSS from './AnswerItem.module.css';

class AnswerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){
    return (
      <div>
        This will be one Answer Item.
      </div>
    )
  }
}

export default AnswerItem;