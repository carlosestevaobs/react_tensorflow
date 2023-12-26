import React from 'react';
import { ConfusionMatrix } from 'react-confusion-matrix';

function ConfusionMatrixPlot({ reais, preditos }) {
    const hasPredictions = preditos && preditos.length > 0;
    if (!hasPredictions || !reais || reais.length !== preditos.length) {
        return <div>Não há dados preditos para gerar a matriz de confusão.</div>;
    }

    const uniqueLabels = [...new Set([...reais, ...preditos])].sort();
    const matrixData = Array.from({ length: uniqueLabels.length }, () => Array(uniqueLabels.length).fill(0));

    for (let i = 0; i < reais.length; i++) {
        const realIndex = uniqueLabels.indexOf(reais[i]);
        const predictedIndex = uniqueLabels.indexOf(preditos[i]);

        if (realIndex !== -1 && predictedIndex !== -1) {
            matrixData[realIndex][predictedIndex]++;
        }
    }

    return (
        <div>
            <ConfusionMatrix data={matrixData} labels={uniqueLabels} />
        </div>
    );
}

export default ConfusionMatrixPlot;
