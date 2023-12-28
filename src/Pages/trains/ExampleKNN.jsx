import React, { useState } from 'react';
import ScatterPlot from '../../graphs/ScatterPlot';
import ColumnsPlot from '../../graphs/ColumnsPlot';
import styled from 'styled-components';
import BoxPlot from '../../graphs/BoxPlot';
import ViolinPlot from '../../graphs/ViolinPlot';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Label from '../../components/Label';
import Checkbox from '../../components/Checbox';
import Range from '../../components/Range';
import ConfusionMatrixPlot from '../../graphs/ConfusionMatrixPlot';
import Loading from '../../components/Loading';
import treinarKNN from '../../services/treinamentoKNN';

const Container = styled.div`
  display: flex;  
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;  
  gap: 20px;
  width: 100vw; 
`;

const Form = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;


const Visualization = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FlexContainer = styled.div`
    gap: 20px;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;    
`;

function ExampleKNN() {
    const [treinando, setTreinando] = useState(false);
    const [acuraciaTreino, setAcuraciaTreino] = useState(null);
  
    const [acuraciaTeste, setAcuraciaTeste] = useState(null);
 
    const [k, setK] = useState(3); 
    const [dataPath, setDataPath] = useState("/datasets/iris.csv");

    const [coluna1, setColuna1] = useState(0);
    const [coluna2, setColuna2] = useState(1);
    const [atributo, setAtributo] = useState(0);

    const [reaisTreino, setReaisTreino] = useState([]);
    const [preditosTreino, setPreditosTreino] = useState([]);
    const [reaisTeste, setReaisTeste] = useState([]);
    const [preditosTeste, setPreditosTeste] = useState([]);

    const [normalize, setNormalize] = useState(false)

    const [divisaoConjunto, setDivisaoConjunto] = useState(70);

    const options = [
        { label: 'iris', value: '/datasets/iris.csv' },
        { label: 'dados', value: '/datasets/dados.csv' },
        { label: 'students', value: '/datasets/students.csv' },
        { label: 'Dry Bean', value: '/datasets/Dry_Bean_Dataset.csv' },
        { label: 'Wine', value: '/datasets/wine.csv' },
        { label: 'BreastCancer', value: '/datasets/breastCancer.csv' }
    ];

    const handleRangeChange = (event) => {
        setDivisaoConjunto(event.target.value);
    };


    const handleCheckboxChange = (event) => {
        setNormalize(event);
    };

    const iniciarTreinamento = async () => {
        await treinarKNN(
            dataPath,
            setTreinando,
            setAcuraciaTreino,
            setAcuraciaTeste,
            k,
            normalize,
            divisaoConjunto,
            setPreditosTreino,
            setReaisTreino,
            setPreditosTeste,
            setReaisTeste
        );
    }

    return (
        <Container>
            <Content>
                <Form>
                    <FormGroup>
                        <h3>Conjunto de dados</h3>
                        <Select
                            options={options}
                            value={dataPath}
                            onChange={setDataPath}
                        />
                    </FormGroup>

                    <FormGroup>
                        <h3>Gráficos</h3>
                        <strong>ScatterPlot</strong>

                        <Label text="Coluna 1" />
                        <Input
                            type="number"
                            value={coluna1}
                            onChange={setColuna1}
                        />

                        <Label text="Coluna 2" />
                        <Input
                            type="number"
                            value={coluna2}
                            onChange={setColuna2}
                        />
                    </FormGroup>
                    <FormGroup>
                        <strong>BloxPlot e Violino</strong>

                        <Label text="Atributo" />
                        <Input
                            type="number"
                            value={atributo}
                            onChange={setAtributo}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h3>Configuração do treinamento</h3>
                        <Label text="Valor de K" />
                        <Input
                            type="number"
                            value={k}
                            onChange={setK}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            checked={normalize}
                            onChange={handleCheckboxChange}
                            text="Normalize"
                        />

                    </FormGroup>
                    <FormGroup>
                        <Range
                            value={divisaoConjunto}
                            min={1}
                            max={99}
                            step={1}
                            onChange={handleRangeChange}
                        />
                        <div> Treinamento: {divisaoConjunto} % </div>
                        <div> Teste: {100 - divisaoConjunto} % </div>
                    </FormGroup>
                    <Button
                        onClick={iniciarTreinamento}
                        disabled={treinando}
                        text={treinando ? 'Treinando...' : 'Iniciar Treinamento'}
                    />

                </Form>
                <Visualization>

                    <h2>Machine Learning </h2>
                    {treinando ? <Loading /> : null}
                    <h2>Classificação KNN no React</h2>
                    <FlexContainer>
                        <ScatterPlot path={dataPath} columns={[coluna1, coluna2]} />
                        <ColumnsPlot path={dataPath} />
                        <BoxPlot path={dataPath} attribute={atributo} />
                        <ViolinPlot path={dataPath} attribute={atributo} />

                    </FlexContainer>
                 

                    <p>Valor de K: {k}</p>
                    <FlexContainer>                       
                        <div>
                            <h2>Acurácia no Conjunto de Treinamento:</h2>
                            <strong>Acurácia:</strong> {acuraciaTreino ? acuraciaTreino.toFixed(4) : '-'}
                  
                            <h2>Acurácia  no Conjunto de Teste:</h2>
                            <strong>Acurácia:</strong> {acuraciaTeste ? acuraciaTeste.toFixed(4) : '-'}
                     
                          {/*  <div>
                                <h2>Predições:</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Reais</th>
                                            <th>Preditos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reaisTreino.map((reais, index) => (
                                            <tr key={index}>
                                                <td>{reais}</td>
                                                <td>{preditosTreino[index]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                        </div>*/}
                        </div>
                        <div>

                            <h2>Matriz de Confusão - Treinamento:</h2>
                            <ConfusionMatrixPlot
                                reais={reaisTreino}
                                preditos={preditosTreino}
                            />


                            <h2>Matriz de Confusão - Teste:</h2>
                            <ConfusionMatrixPlot
                                reais={reaisTeste}
                                preditos={preditosTeste}
                            />

                        </div>

                    </FlexContainer>
                </Visualization>
            </Content>
        </Container>
    );
};

export default ExampleKNN;