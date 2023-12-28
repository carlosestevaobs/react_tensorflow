import * as tf from '@tensorflow/tfjs';

async function carregarModelo() {
    try {
      const model = await tf.loadLayersModel(process.env.PUBLIC_URL + '/models/modelTensorFlow.json');
   //   console.log('Modelo carregado com sucesso:', model);
      return model;
    } catch (error) {
      console.error('Erro ao carregar o modelo:', error);
      return null;
    }
  }

async function preverAmostra(amostra) {
  const model = await carregarModelo();

  if (model) {
    const featuresAmostra = amostra.map(feature => parseFloat(feature));
    const tensorAmostra = tf.tensor2d([featuresAmostra]);

    const prediction = model.predict(tensorAmostra).argMax(-1).arraySync()[0];

    console.log('Classe predita para a amostra:', prediction);
    return prediction;
  } else {
    console.error('Modelo não carregado, não é possível fazer previsão.');
    return null;
  }
}

export default preverAmostra;
