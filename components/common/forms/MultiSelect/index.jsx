import React from "react";
import { Select } from "antd";

const { Option } = Select;

const MutiSelect = ({
  error,
  options,
  onChange,
  labelKey,
  labelVal,
  value,
  ...props
}) => {
  console.log(value);
  return (
    <Select
      mode="multiple"
      className={`multi-select ${error && "err_field"}`}
      onChange={(val) =>
        onChange({ target: { name: props?.name, value: val } })
      }
      allowClear
      popupClassName="multi-select-dropdown"
      virtual={false}
      value={value?.length > 0 ? value : []}
      {...props}
    >
      {options?.length > 0 &&
        options?.map((opt) => (
          <Option key={opt[labelVal]} value={opt[labelVal]}>
            {opt[labelKey]}
          </Option>
        ))}
    </Select>
  );
};

export default MutiSelect;
