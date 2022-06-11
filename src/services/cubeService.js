const fs = require('fs/promises');
const cubes = require('../db.json');
const path = require('path');

exports.getOne = (cubeId) => cubes[cubeId];

exports.save = (cube) => {
    cubes.push(cube);
    let textData = JSON.stringify(cubes, '', 4);

    return fs.writeFile(path.resolve('src', 'db.json'), textData, { encoding: 'utf8' })
}