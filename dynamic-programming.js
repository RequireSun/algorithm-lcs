'use strict';

const LEFT = 1;
const TOP = 2;
const LEFT_TOP = 4;

/**
 * 0 的位置先不管
 * @param target
 * @param sample
 */
module.exports = function (target, sample) {
    if (!target || !sample) {
        throw new Error('input length error!');
    }

    const matrix = [];
    const direction = [];
    let result = '';

    // 第一维为 target 的长度
    for (let i = 0, l = target.length + 1; i < l; ++i) {
        matrix.push([0]);
        direction.push([]);
    }

    // 第二维为 sample 长度
    for (let i = 0, l = sample.length + 1; i < l; ++i) {
        matrix[0].push(0);
    }

    for (let i = 1, l = target.length + 1; i < l; ++i) {
        for (let j = 1, k = sample.length + 1; j < k; ++j) {
            if (target[i] === sample[j]) {
                matrix[i][j] = matrix[i - 1][j - 1];
                direction[i][j] = LEFT_TOP;
            } else if (matrix[i - 1][j] > matrix[i][j - 1]) {
                matrix[i][j] = matrix[i - 1][j];
                direction[i][j] = LEFT;
            } else {
                matrix[i][j] = matrix[i][j - 1];
                direction[i][j] = TOP;
            }
        }
    }

    for (let i = target.length, j = sample.length; i > 0; --i) {
        switch (direction[i][j]) {
            case LEFT_TOP: {
                result = `${target[i]}${result}`;
                break;
            }
            case LEFT: {
                result = `-${sample[j]}${result}`;
                break;
            }
            case TOP: {
                result = `+${target[i]}${result}`;
                break;
            }
        }
    }

    return result;
};
