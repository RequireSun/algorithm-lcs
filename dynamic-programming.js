'use strict';

const PADDING = 0;
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
        direction.push([0]);
    }

    // 第二维为 sample 长度
    for (let i = 0, l = sample.length; i < l; ++i) {
        matrix[0].push(0);
        direction[0].push(0);
    }

    for (let i = 1, l = target.length + 1; i < l; ++i) {
        for (let j = 1, k = sample.length + 1; j < k; ++j) {
            if (i === 1 && j === 4) {
                console.log(matrix[i - 1][j], matrix[i][j - 1]);
            }
            if (target[i - 1] === sample[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1] + 1;
                direction[i][j] = LEFT_TOP;
            } else if (matrix[i - 1][j] > matrix[i][j - 1]) {
                matrix[i][j] = matrix[i - 1][j];
                direction[i][j] = TOP;
            } else {
                matrix[i][j] = matrix[i][j - 1];
                direction[i][j] = LEFT;
            }
        }
    }

    // console.log(matrix);
    console.log(direction);

    for (let i = target.length, j = sample.length; i > 0;) {
        switch (direction[i][j]) {
            case LEFT_TOP: {
                result = `${target[i - 1]}${result}`;
                --i;
                --j;
                break;
            }
            case LEFT: {
                result = `-${sample[j - 1]}${result}`;
                --j;
                break;
            }
            case TOP: {
                result = `+${target[i - 1]}${result}`;
                --i;
                break;
            }
            case PADDING: {
                if (0 === i) {
                    result = `-${sample[j - 1]}${result}`;
                    --j;
                } else if (0 === j) {
                    result = `+${target[i - 1]}${result}`;
                    --i;
                }
                break;
            }
        }
    }

    return result;
};
