import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import { colors } from './colors';

function ScatterPlot({ path, columns }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const response = await fetch(path);
                const text = await response.text();
                const parsed = Papa.parse(text, { header: true });
                const data = parsed.data;

                const classColumnName = Object.keys(data[0]).pop(); 
                const attributeNames = Object.keys(data[0]).filter(column => column !== classColumnName);

                const uniqueClasses = [...new Set(data.map(item => item[classColumnName]))];

                const colorsByClass = {};
                uniqueClasses.forEach((cls, index) => {
                    colorsByClass[cls] = colors[index % colors.length]; 
                });

                const scatterData = {
                    x: data.map(item => parseFloat(item[attributeNames[columns[0]]])),
                    y: data.map(item => parseFloat(item[attributeNames[columns[1]]])),
                    type: 'scatter',
                    mode: 'markers',
                    marker: {
                        color: data.map(item => colorsByClass[item[classColumnName]]),
                    },
                };

                setChartData([scatterData]);
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            }
        };

        carregarDados();
    }, [path, columns]);

    return (
        <>
            {chartData && (
                <Plot
                    data={chartData}
                    layout={{ width: 600, height: 400, title: 'Conjunto de Dados' }}
                />
            )}
        </>
    );
}

export default ScatterPlot;
