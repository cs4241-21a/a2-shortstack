class DataEntry extends HTMLDivElement {
    constructor(entry) {
        super();

        const header = document.createElement('h2');
        const dataDiv = document.createElement('div');
        dataDiv.className = 'data-div';

        const body = document.createElement('p');
        const bodyDiv = document.createElement('div');
        const idTitle = entry.title.replace(/[^a-zA-Z]/g, '');

        const wordInfo = document.getElementById('word-info');
        // wordInfo.className = 'word-info';

        let wordSpans = Object.keys(entry.words)
            .flatMap(word => entry.words[word].positions
                .map(pos => [pos, pos + word.length]))
            .sort((a, b) => a[0] < b[0]);
        // console.log('word spans:');
        // console.log(wordSpans);
        let newText = entry.text;
        let newTitle = entry.title;
        const titleLength = entry.title.length + 1;

        // put a span with class word around every word in the text
        for (let span of wordSpans) {
            let [start, end] = span;

            if (start < titleLength) {
                // the word is in the title
                let text = newTitle.substring(start, end);
                let beforeText = newTitle.substring(0, start);
                let afterText = newTitle.substring(end);
                let spanText = `<span class="word">${text}</span>`
                newTitle = beforeText + spanText + afterText;

            } else {
                // the word is in the main text
                let realStart = start - titleLength;
                let realEnd = end - titleLength;
                let text = newText.substring(realStart, realEnd);
                let beforeText = newText.substring(0, realStart);
                let afterText = newText.substring(realEnd);
                let spanText = `<span class="word">${text}</span>`
                newText = beforeText + spanText + afterText;
            }
        }

        header.innerHTML = newTitle;

        bodyDiv.innerHTML = newText.replace(/\n/g, `<br>`); //spannedText;
        const bodyWords = bodyDiv.childNodes;

        for (let word of bodyWords) {
            handleWordEvents(idTitle, word, wordInfo, entry.words);
        }

        const headerWords = header.childNodes;
        for (let word of headerWords) {
            handleWordEvents(idTitle, word, wordInfo, entry.words);
        }

        dataDiv.append(bodyDiv);
        this.append(header, dataDiv);
    }

    getWordsTable() {
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        const HEADERS = ['Word', 'Positions'];
        for (let header of HEADERS) {
            const tableHeader = document.createElement('th');
            tableHeader.innerText = header;
            headerRow.appendChild(tableHeader);
        }
        table.appendChild(headerRow);
        return table;
    }
}

const valid_char_regex = /[a-zA-Z0-9\s]/;
const cleanUpText = (text) => {
    return Array.from(text).filter(chr => valid_char_regex.test(chr)).reduce((a, b) => a + b).toLowerCase();
}


const handleWordEvents = (idTitle, word, wordInfo, allWords) => {
    if (word.className === 'word') {
        const wordCount = Object.keys(allWords)
            .map(word => allWords[word].positions.length)
            .reduce((a, b) => a + b);
        word.className += " " + idTitle + word.innerText.toLowerCase();
        word.addEventListener('mouseenter', event => {
            let sameWords = document.getElementsByClassName(event.target.className.split(' ')[1]);
            for (let word of sameWords) {
                word.style.backgroundColor = 'blue';
            }

        })
        word.addEventListener('mouseout', event => {
            let sameWords = document.getElementsByClassName(event.target.className.split(' ')[1]);
            for (let word of sameWords) {
                word.style.backgroundColor = '';
            }

        })
        word.addEventListener('mouseover', event => {
            const text = event.target.innerText.toLowerCase();
            const wordDiv = document.createElement('div');
            const infoDiv = document.createElement('div');
            const documentFreqDiv = document.createElement('div');
            wordDiv.innerText = `Word: ${text}`;
            const wordOccurances = allWords[text.toLowerCase()].positions.length
            infoDiv.innerText = `This word appears ${wordOccurances} times`;
            const documentFrequency = wordOccurances / wordCount;
            documentFreqDiv.innerText = `This is ${(100 * documentFrequency).toFixed(4)}% of words in this document`;
            wordInfo.innerHTML = '';
            wordInfo.append(wordDiv, infoDiv, documentFreqDiv);
        })
    }
}


customElements.define('custom-data-entry', DataEntry, { extends: "div" });