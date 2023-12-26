function normalizeData(data) {
    if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
        console.error('Os dados não estão no formato esperado.');
        return data;
    }

    const numColumns = Object.keys(data[0]).length;
    const features = data.map((item) => {
        const values = Object.values(item).slice(0, numColumns - 1);
        return values.map((value) => parseFloat(value));
    });
  
    const allNumeric = features.every((row) => row.every((val) => !isNaN(val)));
    if (allNumeric) {
        const normalizedData = data.map((item) => {
            const values = Object.values(item);
            const normalizedFeatures = values.slice(0, numColumns - 1).map((feat, featIndex) => {
                const min = Math.min(...features.map((col) => col[featIndex]));
                const max = Math.max(...features.map((col) => col[featIndex]));
                return (parseFloat(feat) - min) / (max - min);
            });
            return [...normalizedFeatures, values[numColumns - 1]];
        });
        return normalizedData;
    } else {
        console.error('Os dados não são numéricos.');
        return data;
    }
}

export default normalizeData;
