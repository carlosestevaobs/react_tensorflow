import Papa from 'papaparse';
import normalizeData from './NormalizeData';

export function divideTreinoETeste(dataPath, divisaoConjunto, normalize) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(dataPath);
            const text = await response.text();
            const parsed = Papa.parse(text, { header: true });

            let data = parsed.data;

            if (normalize) {
                data = normalizeData(data);
            }
            //  console.table(data)

            const numColumns = parsed.data[0] ? Object.keys(parsed.data[0]).length : 0;

            const classColumnName = Object.keys(data[0]).pop();
            const uniqueClasses = [...new Set(data.map(item => item[classColumnName]))];

            const groupedDataByClass = {};
            uniqueClasses.forEach((cls) => {
                groupedDataByClass[cls] = data.filter(item => item[classColumnName] === cls);
            });

            const balancedDataTreino = [];
            const balancedDataTeste = [];

            Object.values(groupedDataByClass).forEach((classGroup) => {
                const totalSamples = classGroup.length;
                const splitIndex = Math.floor(totalSamples * (divisaoConjunto / 100));

                balancedDataTreino.push(...classGroup.slice(0, splitIndex));
                balancedDataTeste.push(...classGroup.slice(splitIndex));
            });

            resolve({ treino: balancedDataTreino, teste: balancedDataTeste, colunas: numColumns, numClasses: uniqueClasses.length });
        } catch (error) {
            reject(error);
        }
    });
}
