import * as tf from '@tensorflow/tfjs';

async function carregarModelo(modelPath) {
  try {
    const model = await tf.loadLayersModel(process.env.PUBLIC_URL + modelPath);
    return model;
  } catch (error) {
    console.error('Erro ao carregar o modelo:', error);
    return null;
  }
}

async function preverAmostra(amostra, modelPath) {
  const model = await carregarModelo(modelPath);

  if (model) {
    try {
      const featuresAmostra = amostra.map(feature => parseFloat(feature));
      const tensorAmostra = tf.tensor2d([featuresAmostra]);

      const prediction = model.predict(tensorAmostra).argMax(1).dataSync()[0];
      return prediction;
    } catch (error) {
      console.error('Erro durante a previsão:', error);
      return null;
    }
  } else {
    console.error('Modelo não carregado, não é possível fazer previsão.');
    return null;
  }
}

export default preverAmostra;
