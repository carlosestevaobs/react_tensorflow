import Papa from 'papaparse'; 

export async function prepareData(dataPath) {
  const response = await fetch(dataPath);
  const text = await response.text();
  const parsed = Papa.parse(text, { header: true });

  let data = parsed.data;

  const numColumns = parsed.data[0] ? Object.keys(parsed.data[0]).length : 0;
  const classColumnName = Object.keys(data[0]).pop();
  const uniqueClasses = [...new Set(data.map(item => item[classColumnName]))];

  const dicionario = {};
  const labels = uniqueClasses.map((classe) => {
    if (!(classe in dicionario)) {
      dicionario[classe] = Object.keys(dicionario).length;
    }
    return dicionario[classe];
  });
  console.log(labels)
  return {
    numColumns,
    dicionario
  };
}
