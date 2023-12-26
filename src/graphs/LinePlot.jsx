import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function LinePlot({ acuracias, losses, melhorEpoch }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (acuracias && losses) {
            const accTrace = {
                x: Array.from({ length: acuracias.length }, (_, i) => i + 1),
                y: acuracias,
                mode: 'lines',
                name: 'Acurácia',
                line: { color: 'blue' }
            };

            const lossTrace = {
                x: Array.from({ length: losses.length }, (_, i) => i + 1),
                y: losses,
                mode: 'lines',
                name: 'Loss',
                line: { color: 'red' }
            };

            const melhorEpochTrace = {
                x: [melhorEpoch],
                y: [acuracias[melhorEpoch - 1]],
                mode: 'markers',
                name: 'Melhor época',
                marker: {
                    color: 'green',
                    size: 10
                }
            };

            setChartData([accTrace, lossTrace, melhorEpochTrace]);
        }
    }, [acuracias, losses, melhorEpoch]);

    return (
        <Plot
            data={chartData || []}
            layout={{
                width: 600,
                height: 400,
                title: 'Acurácia e Loss por Época',
                xaxis: { title: 'Época' },
                yaxis: { title: 'Valor' }
            }}
        />
    );
}

export default LinePlot;
