import { ColorPicker, Form, Input } from 'antd';
import React from 'react';
import InputImage from './InputImage';

/**
 *
 *
 * @export
 * @param {{ inputConfig : { key, name, type, value, default_value }, inputMatch, inputName, _token, table, onChange : (inputConfig, index) => {}, index}} props
 */
export function ItemInputGenerate(props) {
  const inputConfig = props.inputConfig ?? null;
  const inputName = props.inputName ?? null;
  const _token = props._token ?? null;
  const table = props.table ?? null;

  const handleChangeValueInputConfig = value => {
    let newChangeInputConfig = inputConfig;
    newChangeInputConfig.value = value;
    props.onChange(newChangeInputConfig, props.index);
  };

  let renderInput = null;
  switch (inputConfig.type) {
    case 'text':
      renderInput = (
        <Input
          onChange={({ target: { value } }) =>
            handleChangeValueInputConfig(value)
          }
          placeholder={inputConfig.label}
          defaultValue={inputConfig.value}
        />
      );
      break;
    case 'color':
      renderInput = (
        <ColorPicker
          onChange={(_, value) => {
            handleChangeValueInputConfig(value);
          }}
          defaultValue={inputConfig.value}
        />
      );
      break;
    case 'image':
      renderInput = (
        <InputImage
          onChange={value => {
            handleChangeValueInputConfig(value);
          }}
          _token={_token}
          table={table}
          defaultValue={inputConfig.value}
        />
      );
      break;

    default:
      break;
  }

  if (inputConfig && renderInput)
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
 * @param {{ config : {input_configs: [{ type : String, name : String, label : String, value : String, default_value : String }], input_matches: [String], input_names: [String]}, onChange : (config) => {}, _token, table }} props
 */
export default function InputConfigGenerate(props) {
  const [inputConfigs, setInputConfigs] = React.useState([]);
  const [inputMatches, setInputMatches] = React.useState([]);
  const [inputNames, setInputNames] = React.useState([]);
  const _token = props._token ?? null;
  const table = props.table ?? null;

  React.useEffect(() => {
    setInputConfigs(props?.config?.input_configs ?? []);
    setInputMatches(props?.config?.input_matches ?? []);
    setInputNames(props?.config?.input_names ?? []);
  }, [props.config]);

  const handleChangeItemInputGenerate = (inputConfig, index) => {
    let newInputConfigs = inputConfigs;
    newInputConfigs[index] = inputConfig;
    setInputConfigs([...newInputConfigs]);

    props.onChange({
      input_configs: [...newInputConfigs],
      input_matches: inputMatches,
      input_names: inputNames,
    });
  };

  return (
    <Form>
      {inputConfigs.map((_, index) => (
        <ItemInputGenerate
          _token={_token}
          table={table}
          onChange={handleChangeItemInputGenerate}
          inputConfig={inputConfigs[index]}
          inputMatches={inputMatches[index]}
          inputNames={inputNames[index]}
          index={index}
        />
      ))}
    </Form>
  );
}
