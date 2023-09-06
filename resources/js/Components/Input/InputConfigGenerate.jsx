import { ColorPicker, Form, Input } from 'antd';
import React from 'react';
import InputImage from './InputImage';

/**
 *
 *
 * @export
 * @param {{ inputConfig : { key, name, type, value, default_value }, inputMatch, inputName, form, _token }} props
 */
export function ItemInputGenerate(props) {
  const form = props.form;
  const inputConfig = props.inputConfig ?? null;
  const inputMatch = props.inputMatch ?? null;
  const inputName = props.inputName ?? null;
  const _token = props._token ?? null;

  let renderInput = null;
  switch (inputConfig.type) {
    case 'text':
      renderInput = (
        <Input
          placeholder={inputConfig.label}
          defaultValue={inputConfig.value}
        />
      );
      break;
    case 'color':
      renderInput = <ColorPicker defaultValue={inputConfig.value} />;
      break;
    case 'image':
      renderInput = (
        <InputImage _token={_token} defaultValue={inputConfig.value} />
      );
      break;

    default:
      console.log(inputConfig.type);
      break;
  }

  if (inputConfig)
    return (
      <Form.Item
        style={{ marginBlock: 40 }}
        name={inputConfig.name}
        label={inputConfig.label}
        key={inputName}
      >
        {renderInput}
      </Form.Item>
    );
}

/**
 *
 *
 * @export
 * @param {{ config : {input_configs: [{ type : String, name : String, label : String, value : String, default_value : String }], input_matches: [String], input_names: [String]}, _token }} props
 */
export default function InputConfigGenerate(props) {
  const [form] = Form.useForm();
  const inputConfigs = props?.config?.input_configs ?? [];
  const inputMatches = props?.config?.input_matches ?? [];
  const inputNames = props?.config?.input_names ?? [];
  const _token = props?._token;

  return (
    <Form form={form}>
      {inputConfigs.map((_, index) => (
        <ItemInputGenerate
          form={form}
          _token={_token}
          inputConfig={inputConfigs[index]}
          inputMatches={inputMatches[index]}
          inputNames={inputNames[index]}
        />
      ))}
    </Form>
  );
}
