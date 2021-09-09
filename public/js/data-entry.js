const handleData = (data) => {
    let dataView = document.getElementById('data-view');
    dataView.innerHTML = '';
    for (let entry of data) {
        console.log(entry.title);
        const dataEntry = new DataEntry(entry);
        dataView.appendChild(dataEntry);
    }
}

class DataEntry extends HTMLDivElement {
    constructor(entry) {
        super();

        const headerDiv = document.createElement('div');
        headerDiv.className = 'data-header';
        const header = document.createElement('h2');

        const dataDiv = document.createElement('div');
        dataDiv.className = 'data-div';

        this.bodyDiv = document.createElement('div');
        this.bodyDiv.style.display = "none"; // start hidden

        const idTitle = entry.title.replace(/[^a-zA-Z]/g, '');

        const wordInfo = document.getElementById('word-info');

        // this is an array of [word start index, word end index]
        // we sort it so that the largest index is first
        // this is so that as we modify the text, the earlier indexes remain correct
        let wordSpans = Object.keys(entry.words)
            .flatMap(word => entry.words[word].positions
                .map(pos => [pos, pos + word.length]))
            .sort((a, b) => a[0] < b[0]);

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

        this.bodyDiv.innerHTML = newText.replace(/\n/g, `<br>`);
        const bodyWords = this.bodyDiv.childNodes;

        for (let word of bodyWords) {
            handleWordEvents(idTitle, word, wordInfo, entry.words, entry.title);
        }

        const headerWords = header.childNodes;
        for (let word of headerWords) {
            handleWordEvents(idTitle, word, wordInfo, entry.words, entry.title);
        }

        dataDiv.append(this.makeShowHideButton(), this.bodyDiv);
        headerDiv.append(header, this.makeDeleteButton(entry.title));
        this.append(headerDiv, dataDiv);
    }

    makeShowHideButton() {
        const deleteButton = document.createElement('button');
        deleteButton.innerText = "Show";
        deleteButton.addEventListener('click', event => {
            const btn = event.target;

            if (btn.innerText === "Show") {
                this.bodyDiv.style.display = "block";
                btn.innerText = "Hide";
            } else {
                this.bodyDiv.style.display = "none";
                btn.innerText = "Show";
            }
        });
        return deleteButton;
    }

    makeDeleteButton(title) {
        const deleteButton = document.createElement('button');
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener('click', event => {
            const json = {
                action: "delete",
                title,
            };
            const body = JSON.stringify(json);

            fetch('/submit', {
                    method: 'POST',
                    body
                })
                .then(response => response.json())
                .then(handleData);
        });

        return deleteButton;
    }
}

const handleWordEvents = (idTitle, word, wordInfo, allWords, title) => {
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
            const titleDiv = document.createElement('div');
            const wordDiv = document.createElement('div');
            const infoDiv = document.createElement('div');
            const documentFreqDiv = document.createElement('div');

            titleDiv.innerText = title;
            wordDiv.innerText = `Word: ${text}`;
            const wordOccurances = allWords[text.toLowerCase()].positions.length
            infoDiv.innerText = `This word appears ${wordOccurances} times`;
            const documentFrequency = wordOccurances / wordCount;
            documentFreqDiv.innerText = `This is ${(100 * documentFrequency).toFixed(4)}% of words in this document`;
            wordInfo.innerHTML = '';
            wordInfo.append(titleDiv, wordDiv, infoDiv, documentFreqDiv);
        })
    }
}


customElements.define('custom-data-entry', DataEntry, { extends: "div" });