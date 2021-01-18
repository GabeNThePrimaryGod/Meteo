export default async function formatData(rawData, indexs = ["d", "station", "n", "hours", "h"]) {
    const formatedData = {};

    formatDataLoop(rawData, formatedData, indexs, 0);

    return formatedData;
}

export function formatDataLoop(currentData, formatedData, indexs = ["d", "station", "n", "hours", "h"], curr = 0) {
    const index = indexs[curr];

    for (const _key in currentData) {
        const value = currentData[_key]; // cpy
        const key = (value[index]) ? value[index] : _key; // cpy

        const iterables = [];

        // si la valeur n'est pas un objet ou un tableau
        if (typeof value !== 'object') {
            formatedData[key] = value;
        } else {
            // si c'est un objet ou un tableau on le stock pour le parcourir ensuite
            iterables.push(value) // cpy

        }

        for (const iterable of iterables) {
            formatedData[key] = {};
            
            formatDataLoop(iterable, formatedData[key], index, curr + 1);
        }
    }
}