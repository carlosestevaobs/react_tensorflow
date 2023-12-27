import * as tf from '@tensorflow/tfjs';
import { divideTreinoETeste } from './divisionTrain';

async function treinarTensorFlow(
  datapath,
  setTreinando,
  setEpocasConcluidas,
  setAcuraciaFinal,
  setLossFinal,
  setAcuraciaTeste,
  setLossTeste,
  acuraciasTreinoRef,
  lossesTreinoRef,
  epocas,
  setChartData, 
  normalize,
  divisaoConjunto,
  setPreditosTreino,
  setReaisTreino,
  setPreditosTeste,
  setReaisTeste
) {
  setTreinando(true);
  try {
    const { treino: dadosTreino, teste: dadosTeste, colunas: numColunas, numClasses: nClasses } = await divideTreinoETeste(datapath, divisaoConjunto, normalize);

    
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, inputShape: [numColunas - 1], activation: 'relu' }));
    model.add(tf.layers.dense({ units: nClasses, activation: 'softmax' }));
    model.compile({ loss: 'categoricalCrossentropy', optimizer: 'sgd', metrics: ['accuracy'] });

    const callback = {
      onEpochEnd: async (epoch, logs) => {
        setEpocasConcluidas(epoch + 1);
        acuraciasTreinoRef.current.push(logs.acc);
        lossesTreinoRef.current.push(logs.loss);
      },
    };

    const prepararDados = (dados) => {
        const features = dados.map(item => Object.values(item).slice(0, -1).map(feature => parseFloat(feature)));
        const classes = dados.map(item => Object.values(item)[Object.keys(item).length - 1]);
      
        const dicionario = {};
        const labels = classes.map((classe) => {
          if (!(classe in dicionario)) {
            dicionario[classe] = Object.keys(dicionario).length;
          }
          return dicionario[classe];
        });
      
        const xs = tf.tensor2d(features);
        const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), Object.keys(dicionario).length);
      
        return { xs, ys };
      };
      
      const { xs: xsTreino, ys: ysTreino } = prepararDados(dadosTreino);
      const { xs: xsTeste, ys: ysTeste } = prepararDados(dadosTeste);
 

    await model.fit(xsTreino, ysTreino, { epochs: epocas, callbacks: callback });

    const evaluationTreino = model.predict(xsTreino).argMax(-1);
    setReaisTreino(ysTreino.argMax(-1).arraySync());
    setPreditosTreino(evaluationTreino.arraySync());

    const evaluation = await model.evaluate(xsTeste, ysTeste);
    const accTeste = evaluation[1].dataSync()[0];
    const lossTeste = evaluation[0].dataSync()[0];

    setAcuraciaFinal(acuraciasTreinoRef.current[acuraciasTreinoRef.current.length - 1]);
    setLossFinal(lossesTreinoRef.current[lossesTreinoRef.current.length - 1]);
    setAcuraciaTeste(accTeste);
    setLossTeste(lossTeste);

    const evaluationTeste = model.predict(xsTeste).argMax(-1);
    setReaisTeste(ysTeste.argMax(-1).arraySync());
    setPreditosTeste(evaluationTeste.arraySync());

    if (acuraciasTreinoRef.current && lossesTreinoRef.current) {
      const melhorEpoch = acuraciasTreinoRef.current.indexOf(Math.max(...acuraciasTreinoRef.current)) + 1;
      setChartData({
        acuracias: acuraciasTreinoRef.current,
        losses: lossesTreinoRef.current,
        melhorEpoch
      });
    }
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  } finally {
    setTreinando(false);
  }
}

export default treinarTensorFlow;
