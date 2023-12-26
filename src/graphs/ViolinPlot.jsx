import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import { colors } from './colors'; 

function ViolinPlot({ path, attribute }) {
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

                const violinData = uniqueClasses.map((cls, index) => {
                    const values = data
                        .filter(item => item[classColumnName] === cls)
                        .map(item => parseFloat(item[attributeNames[attribute]]));

                    return {
                        y: values,
                        type: 'violin',
                        name: cls,
                        marker: {
                            color: colors[index % colors.length], 
                        },
                    };
                });

                setChartData(violinData);
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            }
        };

        carregarDados();
    }, [path, attribute]);

    return (
        <Plot
            data={chartData || []}
            layout={{ width: 600, height: 400, title: `Violin Plot para o atributo ${attribute}` }}
        />
    );
}

export default ViolinPlot;
