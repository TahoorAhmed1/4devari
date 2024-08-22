// MultiTextChip.js
import React, { useState } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const MultiTextChip = ({ value: initialValue, onValueChange, name, className, placeholder}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue) {
      onValueChange({target:{ name: name, value: [...initialValue, inputValue]}});
      setInputValue('');
    }
  };

  const handleRemove = (removedText) => {
    const newSelectedTexts = initialValue.filter((text) => text !== removedText);
    onValueChange({target:{ name: name, value: newSelectedTexts}});
  };

  return (
    <div>
      <Input
        type="text"
        className={`multi-text-chip ${className}`}
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={handleInputConfirm}
        placeholder={placeholder}
        addonAfter={
          <Tooltip title="Add">
            <PlusOutlined onClick={handleInputConfirm} />
          </Tooltip>
        }
      />
      {initialValue?.length > 0 && initialValue?.map((text) => (
        <Tooltip key={text} title={text}>
          <Tag closable onClose={() => handleRemove(text)}>
            {text}
          </Tag>
        </Tooltip>
      ))}
    </div>
  );
};

export default MultiTextChip;
