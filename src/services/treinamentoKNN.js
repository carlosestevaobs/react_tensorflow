import { divideTreinoETeste } from './divisionTrain';

async function treinarKNN(
  datapath,
  setTreinando,
  setAcuraciaTreino,
  setAcuraciaTeste,
  kValue,
  normalize,
  divisaoConjunto,
  setPreditosTreino,
  setReaisTreino,
  setPreditosTeste,
  setReaisTeste
) {
  setTreinando(true);
  try {
    const { treino: dadosTreino, teste: dadosTeste } = await divideTreinoETeste(datapath, divisaoConjunto, normalize);

    const featuresTreino = dadosTreino.map(item => Object.values(item).slice(0, -1).map(feature => parseFloat(feature)));
    const labelsTreino = dadosTreino.map(item => Object.values(item)[Object.keys(item).length - 1]);

    const featuresTeste = dadosTeste.map(item => Object.values(item).slice(0, -1).map(feature => parseFloat(feature)));
    const labelsTeste = dadosTeste.map(item => Object.values(item)[Object.keys(item).length - 1]);

    const k = kValue;

    function euclideanDistance(pointA, pointB) {
      let sum = 0;
      for (let i = 0; i < pointA.length; i++) {
        sum += Math.pow(pointA[i] - pointB[i], 2);
      }
      return Math.sqrt(sum);
    }

    function getMostCommon(arr) {
      const counts = {};
      let max = 0;
      let mostCommon;
      for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        counts[el] = (counts[el] || 0) + 1;
        if (counts[el] > max) {
          max = counts[el];
          mostCommon = el;
        }
      }
      return mostCommon;
    }

    function getNearestNeighbors(testPoint, k, trainFeatures, trainLabels) {
      const distances = [];
      for (let i = 0; i < trainFeatures.length; i++) {
        const dist = euclideanDistance(testPoint, trainFeatures[i]);
        distances.push([dist, trainLabels[i]]);
      }
      distances.sort((a, b) => a[0] - b[0]);
      const neighbors = distances.slice(0, k).map(neighbor => neighbor[1]);
      return neighbors;
    }

    const predictionsTreino = [];
    for (let i = 0; i < featuresTreino.length; i++) {
      const neighbors = getNearestNeighbors(featuresTreino[i], k, featuresTreino, labelsTreino);
      const prediction = getMostCommon(neighbors);
      predictionsTreino.push(prediction);
    }
    setReaisTreino(labelsTreino);
    setPreditosTreino(predictionsTreino);

    const acuraciaTreino = accuracy(labelsTreino, predictionsTreino);
    setAcuraciaTreino(acuraciaTreino);

    const predictionsTeste = [];
    for (let i = 0; i < featuresTeste.length; i++) {
      const neighbors = getNearestNeighbors(featuresTeste[i], k, featuresTeste, labelsTeste);
      const prediction = getMostCommon(neighbors);
      predictionsTeste.push(prediction);
    }
    const acuraciaTeste = accuracy(labelsTeste, predictionsTeste);
    setAcuraciaTeste(acuraciaTeste);

    setReaisTeste(labelsTeste);
    setPreditosTeste(predictionsTeste);

  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  } finally {
    setTreinando(false);
  }
}
function accuracy(labels, predictions) {
  let correct = 0;
  for (let i = 0; i < labels.length; i++) {
    if (labels[i] === predictions[i]) {
      correct++;
    }
  }
  return correct / labels.length;
}


export default treinarKNN;
