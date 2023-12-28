import React, { useState } from 'react';
import preverAmostra from '../../services/predictTensorflow';

function PredictTensorflow() {
  const [resultadoPrevisao, setResultadoPrevisao] = useState(null);

  const handlePreverAmostra = async () => {
    const entradaAmostra = [4.9,3,1.4,.2]; 
    const classePreditiva = await preverAmostra(entradaAmostra);

    setResultadoPrevisao(classePreditiva);
  };

  return (
    <div>
      <strong>Em construção</strong>
      <button onClick={handlePreverAmostra}>Prever Amostra</button>
      {resultadoPrevisao !== null && (
        <p>Classe predita para a amostra: {resultadoPrevisao}</p>
      )}
    </div>
  );
}

export default PredictTensorflow;
