import React from 'react';

import ChatForm from './ChatForm';

const ChatModal = ({ id, onChange, onSave, saving }) => (
  <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 className="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div className="modal-body">
        <ChatForm
          onSave={onSave}
          onChange={onChange}
          saving={saving}
        />
      </div>
    </div>
  </div>
</div>);

ChatModal.propTypes = {
  id: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired
};

export default ChatModal;
