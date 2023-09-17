import { Button, Col, Form, Row, Typography } from 'antd';
import React from 'react';
import CodeEditor from './Component/Partials/Inputs/CodeEditor';
import { GenerateInputOption } from './Component/Utils/Helpers';
import GenerateInputs from './Component/Partials/GenerateInputs';
import HtmlRender from './Component/Partials/HtrmlRender';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

export default function HTMLTemplateFormEditor({
  html = '',
  onChange = (html, generateInputOption) => {},
  wrapTemplateOptions = [],
  onUploadImage = (e, setImageUrl, setLoading) => {},
  validateStatus = 'success',
  help = '',
}) {
  const [textHTML, setTextHTML] = React.useState(html);
  const [generateInputOption, setGenerateInputOption] = React.useState(
    GenerateInputOption.formText(html)
  );
  const [mdSize, setMdSize] = React.useState({
    left: 10,
    right: 14,
  });

  React.useEffect(() => {
    const generateInputOption = GenerateInputOption.formText(textHTML);
    setGenerateInputOption(generateInputOption);
    onChange(textHTML, generateInputOption);
  }, [textHTML]);

  const handleGenerateInputsChange = generateInputs => {
    let editGenerateInputOption = generateInputOption;
    let editTextHTML = textHTML;

    for (const index in generateInputs) {
      const newKeyGenerateInput = `{${JSON.stringify(generateInputs[index])}}`;

      editTextHTML = editTextHTML?.replaceAll(
        editGenerateInputOption.keyGenerateInputs[index],
        newKeyGenerateInput
      );
    }

    setTextHTML(editTextHTML);
  };

  const getRenderTextHTML = () => {
    let renderTextHTML = textHTML;
    const generateInputs = generateInputOption.generateInputs;

    for (const index in generateInputs) {
      renderTextHTML = renderTextHTML.replaceAll(
        generateInputOption.keyGenerateInputs[index],
        generateInputs[index]?.value
      );
    }

    return renderTextHTML;
  };

  return (
    <React.Fragment>
      <Row gutter={5}>
        <Col md={mdSize.left}>
          <Row>
            <Col md={24}>
              <CodeEditor
                validateStatus={validateStatus}
                help={help}
                onResizeClick={e => {
                  const left = mdSize.left + 1;
                  const right = mdSize.right - 1;

                  if (left > 1 && left < 18) {
                    setMdSize({ left, right });
                  }
                }}
                value={textHTML}
                onChange={textHTML => setTextHTML(textHTML)}
              />
            </Col>
            <Col md={24}>
              <GenerateInputs
                onUploadImage={onUploadImage}
                generateInputs={generateInputOption.generateInputs}
                onChange={handleGenerateInputsChange}
              />
            </Col>
          </Row>
        </Col>
        <Col md={mdSize.right}>
          <HtmlRender
            onResizeClick={e => {
              const left = mdSize.left - 1;
              const right = mdSize.right + 1;

              if (right > 1 && right < 18) {
                setMdSize({ left, right });
              }
            }}
            wrapTemplateOptions={wrapTemplateOptions}
            html={getRenderTextHTML()}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
