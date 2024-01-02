import React, { useEffect, useState } from 'react';
import Select from '../../components/Select';
import { prepareData } from '../../services/preparePredict';
import Container from '../../components/Container';
import Content from '../../components/Content';
import FormGroup from '../../components/FormGroup';
import Label from '../../components/Label';
import Visualization from '../../components/Visualization';
import Button from '../../components/Button';
import FlexContainer from '../../components/FlexContainer';
import Form from '../../components/Form';
import Input from '../../components/Input';
import preverAmostraKNN from '../../services/predictKNN';

function PredictKNN() {
  const [dataPath, setDataPath] = useState('/datasets/iris.csv');
  const [resultadoPrevisao, setResultadoPrevisao] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [dataDictionary, setDataDictionary] = useState({});
  const [k, setK] = useState(3); 

  const options = [
    { label: 'iris', value: '/datasets/iris.csv'},
    { label: 'dados', value: '/datasets/dados.csv'},
    { label: 'students', value: '/datasets/students.csv'},
    { label: 'Dry Bean', value: '/datasets/Dry_Bean_Dataset.csv'},
    { label: 'Wine', value: '/datasets/wine.csv'},
    { label: 'BreastCancer', value: '/datasets/breastCancer.csv'}
  ];

  const PreverAmostra = async () => {
    const amostra = inputValues.map(input => parseFloat(input.value));

    const selectedOption = options.find(option => option.value === dataPath);
    const classePreditiva = await preverAmostraKNN(amostra, selectedOption.value, k);
    setResultadoPrevisao(classePreditiva);
  };

  const SelectChange = async (selectedPath) => {
    setDataPath(selectedPath);
    const { numColumns, dicionario } = await prepareData(selectedPath);
    const inputs = Array.from({ length: numColumns - 1 }, (_, index) => ({
      id: `input-${index}`,
      value: '',
    }));
    setInputValues(inputs);
    setDataDictionary(dicionario);
  };

  const InputChange = (index, value) => {
    setInputValues((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index].value = value;
      return updatedInputs;
    });
  };

  useEffect(() => {
    SelectChange(dataPath);
  }, [dataPath]);

  return (
    <Container>
      <Content>
        <Form>
          <FormGroup>
            <h3>Conjunto de dados</h3>
            <Select
              options={options}
              value={dataPath}
              onChange={SelectChange}
            />
          </FormGroup>
          <FormGroup>
                      
                        <Label text="Valor de K" />
                        <Input
                            type="number"
                            value={k}
                            onChange={setK}
                        />
                    </FormGroup>
        </Form>
        <Visualization>
          <h2>Machine Learning </h2>
          <h2>Predição com KNN</h2>
          <FormGroup>
            <h3>Defina as entradas</h3>
            <FlexContainer>
              {inputValues.map((input, index) => (
                <div key={input.id}>
                  <Label text={`Atributo ${index + 1}`} />
                  <input
                    type="text"
                    value={input.value}
                    onChange={(e) => InputChange(index, e.target.value)}
                  />
                </div>
              ))}
            </FlexContainer>
          </FormGroup>
          <Button onClick={PreverAmostra} text="Prever Amostra" />
          <div>
            <strong>Dicionário de dados:</strong>
            <ul>
              {Object.keys(dataDictionary).map((key) => (
                <li key={key}>
                  {key}: {dataDictionary[key]}
                </li>
              ))}
            </ul>
          </div>
          {resultadoPrevisao !== null && (
            <p>Classe predita: {resultadoPrevisao}</p>
          )}
        </Visualization>
      </Content>
    </Container>
  );
}

export default PredictKNN;
