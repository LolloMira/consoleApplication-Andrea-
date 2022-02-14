class Parser {
    /**
     * Given a string with semicolon separated value, it returns an array of numbers
     * @param {string} string - the string to be parsed
     * @returns {number[]} The array of numbers.
     */
    static parseCSVLine(string) {

        const isStringEmpty = string.length === 0;

        if (isStringEmpty) {
            throw new EmptyStringError("vuota")
        }

        const stringWithNoSpaces = Parser.removeSpaces(string);
        const stringWithOnlyFullStop = Parser.changeCommaWithFullStop(stringWithNoSpaces);
        const stringArray = Parser.splitStringOnSemicolon(stringWithOnlyFullStop)
        const numbersArray = Parser.fromStringArrayToNumberArray(stringArray);

        const allParsingFailed = numbersArray.length === 0;

        if (allParsingFailed) {
            throw new InvalidStringError("invalido");
        }

        const atLeastOneParsingFailed = numbersArray.length < stringArray.length;

        if (atLeastOneParsingFailed) {
            throw new PartialInvalidStringError("parzialmente invalido", numbersArray);
        }

        return numbersArray;

    }

    static replaceAll(string, charToReplace, newChar) {
        const regex = new RegExp(charToReplace, 'g');
        return string.replace(regex, newChar)
    }

    static removeSpaces(string) {
        return Parser.replaceAll(string, " ", "")
    }

    static changeCommaWithFullStop(string) {
        return Parser.replaceAll(string, ",", ".")
    }

    static splitStringOnSemicolon(string) {
        return string.split(";")
    }

    /**
     * Convert a string array to a number array
     * @param {string[]} array - the array of strings to be converted to numbers.
     * @returns an array of numbers.
     */
    static fromStringArrayToNumberArray(array) {
        const numbersArray = [];
        for (const stringa of array) {
            const numero = parseFloat(stringa);
            if (isNaN(numero) === false) {
                numbersArray.push(numero);
            }
        }
        return numbersArray;
    }

}


class EmptyStringError extends Error {
    constructor(message) {
        super(message);
    }
}


class InvalidStringError extends Error {
    constructor(message) {
        super(message);
    }
}

class PartialInvalidStringError extends Error {
    constructor(message, partialResult) {
        super(message);
        this.partialResult = partialResult;
    }
}

module.exports = {Parser, InvalidStringError, EmptyStringError, PartialInvalidStringError};