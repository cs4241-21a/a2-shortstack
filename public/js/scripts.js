let fillTable = [];

const submit = function (e) {
    e.preventDefault();

    const yourname = document.querySelector('#yourname');
    const tdate = document.querySelector('#loanDate');
    const cont = document.querySelector('#contents');
    const tcolor = document.querySelector('#tupColor');
    const tsize = document.querySelector('input[name="tup_Size"]:checked').value;
    const theirname = document.querySelector('#theirname');
    const reli = document.querySelector('#relible');

    if (yourname.value === ""|| cont.value === ""|| tcolor.value == "" || theirname.value == "" ) {
        window.alert("Non-null value must be entered to store your tupp.");
        return false;
    }

    json = { 
        yourname: yourname.value,
        tdate: tdate.value,
        cont: cont.value,
        tcolor: tcolor.value,
        tsize: tsize.value,
        theirname: theirname.value,
        reli: reli.value } ;

      body = JSON.stringify(json);

    fetch("/submit", {
      method: "POST",
      body
    })

    .then(function(response) {
        response.json().then(function(text) {
            let json = JSON.parse(text)
            fillTable = [];
            fillTable.push(json);
            populateTable();
        });
    })
};


  window.onload = function () {
    const subbutton = document.getElementById("submitDataButton")
    subbutton.onclick = submit;
  };

  const populateTable  = function (e) {
      let indi = 0;
      for (let i = 0; i < fillTable[0].length; i++) {
          let currentCell =fillTable[0][i];
          let yourname = currentCell.yourname;
          let tdate = currentCell.tdate;
          let cont = currentCell.cont;
          let tcolor = currentCell.tcolor;
          let tsize = currentCell.tsize;
          let theirname = currentCell.theirname;
          let reli = currentCell.reli;
          let prob = currentCell.prob;

      let table = document.getElementById("storedTup")
      let newRow = table.insertRow(-1)

      if (i === currentCell[0].length -1) {
        newRow.setAttribute("id", "lastRow");
      }
      else {
        newRow.setAttribute("id", indi);
      }

      let userInput = newRow.insertCell(-1);
      let userName = document.createTextNode(userName);
      userInput.appendChild(userName);

      let userInputDate = newRow.insertCell(-1);
      let userDate = document.createTextNode(userDate);
      userInputDate.appendChild(userDate);

      let userInputCont = newRow.insertCell(-1);
      let userCont = document.createTextNode(userCont);
      userInputCont.appendChild(userCont);

      let userInputColor = newRow.insertCell(-1);
      let userColor = document.createTextNode(userColor);
      userInputColor.appendChild(userColo);

      let userInputSize = newRow.insertCell(-1);
      let userSize = document.createTextNode(userSize);
      userInputSize.appendChild(userSize);

      let userInputName = newRow.insertCell(-1);
      let userGiveName = document.createTextNode(userGiveName);
      userInputName.appendChild(userGiveName);

      let userInputReli = newRow.insertCell(-1);
      let userReli= document.createTextNode(userReli);
      userInputReli.appendChild(userReli);

      let probGen = newRow.insertCell(-1);
      let probValue = document.createTextNode(probValue);
      probGen.appendChild(probValue);

      tableIndexCount++;

  }
}
