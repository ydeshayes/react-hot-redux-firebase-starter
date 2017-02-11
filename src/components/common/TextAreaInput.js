import React, {PropTypes} from 'react';

const styles = {
  textArea: {
    resize: 'none',
    height: 100,
  }
};

const TextAreaInput = ({name, onChange, value, error, width}) => {
  let wrapperClass = '';
  if (error && error.length > 0) {
    wrapperClass += " form-group " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <div className="field">
        <textArea
          type="text"
          style={{...styles.textArea, width}}
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}>
        </textArea>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  width: PropTypes.string
};

export default TextAreaInput;
