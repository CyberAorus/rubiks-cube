const fs = require('fs/promises');
const path = require('path');
const cubes = require('../db.json');

exports.getAll = (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;
    const filteredCubes = cubes
        .filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()))
        .filter(cube => cube.difficulty >= from && cube.difficulty <= to);

    return filteredCubes;
};

exports.getOne = (cubeId) => cubes[cubeId];

exports.save = (cube) => {
    cubes.push(cube);
    let textData = JSON.stringify(cubes, '', 4);

    return fs.writeFile(path.resolve('src', 'db.json'), textData, { encoding: 'utf8' })
}