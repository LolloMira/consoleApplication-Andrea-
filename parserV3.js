//1) Ripulire la stringa da spazi e virgole;

//2) Creare un array di linee (lines) spezzando la stringa per ogni linea;

//3) Creare un array di proprietà (properties) spezzando la prima linea per punto e virgola;

//4) Creare un array (users) vuoto per contenere gli oggetti che creeremo;

//5) Ciclare sulle linee rimanenti;

//   Per ogni linea:
//        6) Creare un array di parole (words) spezzando la linea sul punto e virgola e parsando le parole;  
//        7) Creare un oggetto vuoto;
//        8) Ciclare sull'array delle proprietà;

//   Per ogni proprietà:
//        9) Assegnare all'oggetto la proprietà attribuendogli il valore corrispondente all'indice della proprietà 
//           nell'array di parole;

//   10) Aggiungere l'oggetto all'array Users;

//11) Ritornare l'array Users.





class ParserV3{

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

    // static parseCSV(csv, outputType){
    //     const cleanCSV = this.removeSpaces(this.changeCommaWithFullStop(csv))
    //     const lines = this.splitByline(cleanCSV);
    //     let array = [];
    //     for (const line of lines) {
    //         const lineArray = this.parseLine(line);
    //         if (outputType === "-a") {
    //             array = array.concat(lineArray);
    //         } else {
    //             array.push(lineArray);
    //         }
            
    //     }

    //     return array;
    // }

    static parseCSV(csv, outputType){
        const cleanCSV = this.removeSpaces(this.changeCommaWithFullStop(csv))
        const lines = this.splitByline(cleanCSV);
        const properties = this.splitStringOnSemicolon(lines[0]);
        let users = [];
        for (let i = 1; i < lines.length; i++) {
            let wordArray = this.cleanWords(lines[i])
            let user = this.createUsers(properties)
            let userPropArray = Object.keys(user)
            for (let j = 0; j < userPropArray.length; j++) {
                user[userPropArray[j]] = wordArray[j];
            }
            users.push(JSON.parse(JSON.stringify(user)))
        }

        return users;
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


    static cleanWords(string){
        const arrayWords = this.splitStringOnSemicolon(string);
        let newArray = [];
        for (let i = 0; i < arrayWords.length; i++) {
            const word = this.parseWord(arrayWords[i]);
            newArray.push(word);
        }
        return newArray;
    }

    static createUsers(array){
        let user = {};
        for (let i = 0; i < array.length; i++) {
            Object.assign(user, {[array[i]]: ""});
        }
        return user
    }

    static completeUser(array, properties){
        
        for (let i = 1; i < array.length; i++) {
            let wordArray = this.cleanWords(array[i])
            let user = this.createUsers(properties)
            let userPropArray = Object.keys(user)
            for (let j = 0; j < userPropArray.length; j++) {
                user[userPropArray[j]] = wordArray[j];
            }
        }
        return user;
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

module.exports = ParserV3;