import Papa from 'papaparse';

async function preverAmostraKNN(amostra, dataPath, k) {
  try {
    const response = await fetch(dataPath);
    const text = await response.text();
    const parsed = Papa.parse(text, { header: true });
    const data = parsed.data;

    const featuresTreino = data.map(item => Object.values(item).slice(0, -1).map(feature => parseFloat(feature)));
    const labelsTreino = data.map(item => Object.values(item)[Object.keys(item).length - 1]);

    const featuresAmostra = amostra.map(feature => parseFloat(feature));

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

    const neighbors = getNearestNeighbors(featuresAmostra, k, featuresTreino, labelsTreino);
    const prediction = getMostCommon(neighbors);

    return prediction;

  } catch (error) {
    console.error('Erro durante a previsão:', error);
    return null;
  }
}

export default preverAmostraKNN;
