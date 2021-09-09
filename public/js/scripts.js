const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    let longTitle = false;
    //prevents any submissions with no image.
    if (document.querySelector('#imgLink').value == "" || !document.querySelector('#imgLink').value.includes('http')) {
      return false;
    }
    if (document.querySelector('#title').value.length > 100) {
      longTitle = true;
      document.querySelector('#title').value = document.querySelector('#title').value.substring(0,100);
    }

    const jsonObj = {
      'title': document.querySelector('#title').value,
      'description': document.querySelector('#description').value,
      'linkToImg': document.querySelector('#imgLink').value,
      'titleCutOff': longTitle
    }

    data = JSON.stringify(jsonObj)

    fetch( '/submitData', {
      method:'POST',
      body: data
    })
    .then( function( response ) {
      updateImage();
      document.querySelector('#title').value = "";
      document.querySelector('#description').value = "";
      document.querySelector('#imgLink').value = "";
      return "";
    })
  }

window.onload = function() {
    updateImage();
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }


function updateImage() {
    const imageDiv = document.getElementById('loadimages')
    let data = fetch('/imgData.json').then(response => response.json()).then(data => {
      if (data.length!=imageDiv.childElementCount) {
        imageDiv.innerHTML='';
        for (let i=data.length-1;i>=0;i--) {
          const thisImg = document.createElement('div');
          const title = document.createElement('h3');
          const description = document.createElement('p');
          const imgE = document.createElement('img');
          thisImg.className = "indivImg";
          imgE.src = JSON.parse(data[i])['linkToImg'];
          if (JSON.parse(data[i])['titleCutOff']) {
            title.innerHTML = JSON.parse(data[i])['title']+"...";
          }
          else {
            title.innerHTML = JSON.parse(data[i])['title'];
          }
          description.innerHTML = JSON.parse(data[i])['description'];
          thisImg.append(title);
          thisImg.append(imgE)
          thisImg.append(description);
          imageDiv.append(thisImg);
        }
      }
    })
  }

setInterval(updateImage, 2000);

