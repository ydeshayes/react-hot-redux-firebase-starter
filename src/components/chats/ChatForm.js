import React from 'react';
import TextInput from '../common/TextInput';

const ChatForm = ({chat = {}, onSave, onChange, saving}) => {
  return (
    <form>
      <h1>Chat</h1>
      <TextInput
        name="name"
        label="Name"
        onChange={onChange}
        value={chat.name}
        />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Creating ...' : 'Create'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

ChatForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  chat: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired
};

export default ChatForm;
