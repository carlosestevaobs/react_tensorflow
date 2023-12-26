import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import { colors } from './colors'; 

function ColumnsPlot({ path }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const response = await fetch(path);
                const text = await response.text();
                const parsed = Papa.parse(text, { header: true });
                const data = parsed.data;

                const classColumnName = Object.keys(data[0]).pop(); 
                const uniqueClasses = [...new Set(data.map(item => item[classColumnName]))];
               
                const samplesCount = uniqueClasses.map((cls, index) => ({
                    class: cls,
                    count: data.filter(item => item[classColumnName] === cls).length,
                    color: colors[index % colors.length],
                }));

                const columnsData = {
                    type: 'bar',
                    x: samplesCount.map(item => item.class),
                    y: samplesCount.map(item => item.count),
                    marker: {
                        color: samplesCount.map(item => item.color), 
                    },
                };

                setChartData([columnsData]);
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            }
        };

        carregarDados();
    }, [path]);

    return (
        <Plot
            data={chartData || []} 
            layout={{ width: 600, height: 400, title: 'Quantidade de Amostras por Classe' }}
        />
    );
}

export default ColumnsPlot;
