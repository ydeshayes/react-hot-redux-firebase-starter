import React from 'react';
import moment from 'moment';

import Moment from './Moment';

const styles = {
  bubble: {
    display: 'inline-block',
    borderRadius: 10,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 7,
    paddingBottom: 5,
    color: '#000',
    maxWidth: '50vw',
    wordWrap: 'break-word',
  },
  bubbleLeft: {
    color: 'black',
    backgroundColor: '#f1f0f0',
  },
  bubbleRight: {
    color: 'white',
    backgroundColor: '#1E90FF',
  },
  bubbleWrapper: {
    display: 'flex',
    marginTop: 5,
    marginBottom: 5,
  },
  date: {
    fontSize: 7
  },
  dateRight: {
    textAlign: 'right',
    marginRight: 10,
  },
  dateLeft: {
    textAlign: 'left',
    marginLeft: 10,
  },
  senderName: {
    color: 'rgba(0, 0, 0, .40)',
    marginLeft: 10,
  }
};
const Bubble = ({right, senderName, body, date}) => {
  const style = right ? styles.bubbleRight : styles.bubbleLeft;

  return (
    <div style={{...styles.bubbleWrapper, justifyContent: right ? 'flex-end' : 'flex-start'}}>
      <div style={{display: 'flex', flexDirection:'column'}}>
        {!right && <span style={styles.senderName}>{senderName}</span>}
        <div style={{...styles.bubble, ...style}}>
          {body}
        </div>
        <span style={Object.assign({}, styles.date, right ? styles.dateRight : styles.dateLeft)}>
          <Moment date={date}/>
        </span>
      </div>
    </div>
  );
};

Bubble.propTypes = {
  right: React.PropTypes.bool,
  senderName: React.PropTypes.string,
  date: React.PropTypes.num,
  body: React.PropTypes.string.isRequired,
};

export default Bubble;
