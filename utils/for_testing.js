const palindrome = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = (array) => {
    return array.length === 0
        ? 0
        : array.reduce((acc, curr) => { return acc + curr }, 0) / array.length
}

const twoSum = (array, targetNumber) => {
    if (array.length === 0) { return [] }
    if (!targetNumber) { return [] }
    //guardar o primeiro valor até a metade do array
    //rodar o restante do array para achar um match. Se tiver match, guardar o par em outro array
    let resultArray = []
    for (let i = 0; i < array.length; i++){
        for (let j = 1; j < array.length; j++){
            if (array[i] + array[j] === targetNumber){
                console.log(array[i], array[j])
                resultArray.push([ array[i], array[j] ])
            }
        }
    }
    return resultArray

    // const pairs = [];
    // const store = [];

    // for (let part1 of array) {
    //     const part2 = sum - part1;
    //     if (store.indexOf(part2) !== -1) pairs.push([part1, part2]);
    //     store.push(part1);
    // }

    // return pairs;

}

module.exports = {
    palindrome,
    average,
    twoSum
}