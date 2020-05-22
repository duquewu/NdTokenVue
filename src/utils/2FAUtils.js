import hmacSHA1 from 'crypto-js/hmac-sha1';
import WordArray from 'crypto-js/lib-typedarrays'

function intToWordArray(int) {
    let ba = intToBinArr(int)
    return byteArrToWordArray(ba)
}

function byteArrToWordArray(byteArr) {
    let binArr = []
    for (let i = 0; i < byteArr.length; i++) {
        binArr[(i / 4) | 0] = binArr[(i / 4) | 0] | byteArr[i] << (24 - 8 * i)
    }
    return WordArray.create(binArr, byteArr.length)
}

export function wordToByteArray(word, length) {
    var ba = [], xFF = 0xFF;
    if (length > 0)
        ba.push(word >>> 24);
    if (length > 1)
        ba.push((word >>> 16) & xFF);
    if (length > 2)
        ba.push((word >>> 8) & xFF);
    if (length > 3)
        ba.push(word & xFF);

    return ba;
}

/**
 * 将 crypto-js 专用的 WordArray 转换为字节数组
 * @param wordArray
 * @returns {*[]}
 */
export function wordArrayToByteArray(wordArray) {
    let length = wordArray.sigBytes;
    wordArray = wordArray.words;
    let result = [],
        bytes,
        i = 0;
    while (length > 0) {
        bytes = wordToByteArray(wordArray[i], Math.min(4, length));
        length -= bytes.length;
        result.push(bytes);
        i++;
    }
    return [].concat.apply([], result);
}

/**
 * 将一个整型数字转换为一个 8 字节的数组
 *
 * @param int 整型数字
 * @returns {[]} 字节数组
 */
function intToBinArr(int) {
    let buffer = []; // 整型转为字节数组，方便下一步计算
    for (let i = 7, bitMask = int; i >= 0; --i) {
        buffer[i] = (bitMask & 0xff);
        bitMask = bitMask >> 8;
    }
    return buffer
}

/**
 * 将一个字节数组转化为一组 8 位二进制的字符串
 *
 * @param binArr
 * @returns {[]}
 */
export function binArrToStringArr(binArr) {
    const stringArr = []
    for (let i = 0; i < binArr.length; i++) {
        stringArr[i] = parseInt(binArr[i]).toString(2).padStart(8, "0")
    }
    return stringArr
}

/**
 * 将一个 16 进制的字符串转化为字节数组
 * @param str
 * @returns {[]}
 */
function stringToByteArr(str) {
    const arr = str.split("")
    let result = [];
    for (let i = 0, j = 0; i < arr.length / 2; i++) {
        const high = parseInt(arr[j], 16)
        ++j;
        const low = parseInt(arr[j], 16)
        ++j;
        result[i] = (high << 4) | low
    }
    return result
}


export function getCode1(seed) {
    //获取时间戳，1970年0点0分0秒至今的秒数
    let timestamp = Date.parse(Date()) / 1000;
    //获取分钟戳，1970年0点0分0秒至今的分钟数
    let timestampMin = timestamp / 60;
    //将分钟戳转化为 crypto-js 所需的 4 字节 WordArray
    const timeRefContent = intToWordArray(timestampMin)
    //将密钥转化位 crypto-js 所需的 4 字节 WordArray
    const keyWordArray = byteArrToWordArray(stringToByteArr(seed))
    //采用 hmacSHA1 算法，获取 WordArray 结果
    const result = hmacSHA1(timeRefContent, keyWordArray)
    //将上一步获取的 WordArray 结果结果转化位字节数组
    const resultArr = wordArrayToByteArray(result)
    //获取 resultArr 最后一个字节的 int 值, 作为后续操作的起点
    const lastFlag = resultArr[resultArr.length - 1] & 0xf;
    //以 lastFlag 为索引，从 resultArr 中连续取四个字节
    const flag0 = resultArr[lastFlag]
    const flag1 = resultArr[lastFlag + 1]
    const flag2 = resultArr[lastFlag + 2]
    const flag3 = resultArr[lastFlag + 3]
    // 使用 flag0 与 127 按位或，得到前八个位，即高8位
    const first8 = (flag0 & 0b01111111) << 24
    // 使用 flag1 与 255 按位或，得到第8-16个位
    const second8 = (flag1 & 0b11111111) << 16
    // 使用 flag2 与 255 按位或，得到第16-24个位
    const third8 = (flag2 & 0b11111111) << 8
    // 使用 flag3 与 255 按位与
    const last8 = flag3 & 0b11111111
    // 将四个字节组合为一个 32 位的 int 型数字
    const result2 = first8 | second8 | third8 | last8
    // 取上一步得到的整数与 1000000 取余数，得到一个 6 位数
    const result3 = result2 % 1000000
    // 将上一步得到的 6 位数对齐，如果其不足 6 位，则在前方补 0
    return result3.toString().padStart(6, "0")
}