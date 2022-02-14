
class ParserV2{

    // static parseCSVToArray(csv){
    //     const cleanCSV = this.removeSpaces(this.changeCommaWithFullStop(csv))
    //     const lines = this.splitByline(cleanCSV);
    //     let array = [];
    //     for (const line of lines) {
    //         const lineArray = this.parseLine(line);
    //         array = array.concat(lineArray);
    //     }

    //     return array;
    // }


    // static parseCSVToMatrix(csv){
    //     const cleanCSV = this.removeSpaces(this.changeCommaWithFullStop(csv))
    //     const lines = this.splitByline(cleanCSV);
    //     let array = [];
    //     for (const line of lines) {
    //         const lineArray = this.parseLine(line);
    //         array.push(lineArray);
    //     }

    // }

    static parseCSV(csv, outputType){
        const cleanCSV = this.removeSpaces(this.changeCommaWithFullStop(csv))
        const lines = this.splitByline(cleanCSV);
        console.log(lines);
        let array = [];
        for (const line of lines) {
            const lineArray = this.parseLine(line);
            if (outputType === "-a") {
                array = array.concat(lineArray);
            } else {
                array.push(lineArray);
            }
            
        }

        return array;
    }


    static parseLine(line){
        const words = this.splitStringOnSemicolon(line);
        const array = [];
        for (const word of words) {
            const value = this.parseWord(word);
            array.push(value);
        }
        return array;
    }

    static parseWord(word){
        if (!isNaN(word)) {
            return parseFloat(word);
        }
        if (word.toLowerCase() === 'true' || word.toLowerCase() === 'false'){
            return word.toLowerCase() === 'true';
        }
        if ((new Date(word) !== "Invalid Date") && !isNaN(new Date(word))) {
            return new Date(word)
        }
        return word;
    }


    static splitByline(string) {
        const lines = string.split(/\r?\n/);
        return lines;
    }

    static replaceAll(string, charToReplace, newChar) {
        const regex = new RegExp(charToReplace, 'g');
        return string.replace(regex, newChar)
    }

    static removeSpaces(string) {
        return this.replaceAll(string, " ", "")
    }

    static changeCommaWithFullStop(string) {
        return this.replaceAll(string, ",", ".")
    }

    static splitStringOnSemicolon(string) {
        return string.split(";")
    }
}

module.exports = ParserV2;