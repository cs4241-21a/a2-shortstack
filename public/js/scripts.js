const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const form = document.querySelector("form"),
    json = {
      title: form.title.value,
      author: form.author.value,
      score: form.score.value,
      notes: form.notes.value,
      year: form.year.value,
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body
  })
    .then(function (response) {
      // do something with the reponse
      console.log(response);
      return response.json();
    })

    .then(function (jason) {
      let json = JSON.parse( jason );
      document.querySelector("form").reset();

      let row = document.querySelector("#table").insertRow();
      row.insertCell(0).innerHTML = json[indx].title;
      row.insertCell(1).innerHTML = json[indx].author;
      row.insertCell(2).innerHTML = json[indx].score;
      row.insertCell(3).innerHTML = json[indx].notes;
      row.insertCell(4).innerHTML = json[indx].year;
    });

  return false;
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
}
