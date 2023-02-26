/**
 * Строковый метод принимает color, возвращает обёрнутую в ссылку на цвет строку.
 *
 * @param color - строка с указанным цветом (cyan | red | gray | green | white)
 * */
module.exports = String.prototype.outputColor = function (color) {
    switch (color) {
        case 'cyan':
            return `\x1b[36m${this}\x1b[0m`;
        case 'red':
            return `\x1b[31m${this}\x1b[0m`;
        case 'gray':
            return `\x1b[90m${this}\x1b[0m`;
        case 'green':
            return `\x1b[32m${this}\x1b[0m`;
        case 'white':
            return `\x1b[37m${this}\x1b[0m`;
        case 'yellow':
            return `\x1b[33m${this}\x1b[0m`;
        default:
            return `\x1b[0m${this}\x1b[0m`;
    }
}