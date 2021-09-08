// Add some Javascript code here, to run on the front end.


const signin = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#username' ),
        toSend = { username: input.value },
        body = JSON.stringify( toSend )

    fetch( '/submit', {
        method:'POST',
        body 
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                if (response.status === 404) {
                    alert("Username not found")
                }
                return Promise.reject(new Error("Error"))
            }
        })
        .then( response => {
            setupUserInfo(response)
        },
        rej => console.log("Error"))

    return false
}

const signout = function( e ) {
    document.querySelector('#userinfo').style.display = "none"
    document.querySelector('#username').value = ""
}

const setupUserInfo = function(json) {
    let userArea = document.querySelector( '#userinfo' )
    document.querySelector("#newEntryForm").style = "display:none"
    modifying = false

    userArea.style="display:flex;justify-content: flex-start;flex-direction: column;align-items: center;"
    let head = document.querySelector("#userinfo>h3")
    head.innerHTML = json.username

    let finInfoTable = document.querySelector("#userinfo>table")
    let tbody = document.querySelector('#tableBody')
    tbody.innerHTML = ""

    for (let asset in json.assets) {
        let cur = json.assets[asset]
        console.log(cur)
        !function(dataModel){
            let newRow = document.createElement('tr')

            let cell1 = document.createElement('td')
            cell1.innerHTML = dataModel.ticker
            let cell2 = document.createElement('td')
            cell2.innerHTML = dataModel.amt
            let cell3 = document.createElement('td')
            cell3.innerHTML = dataModel.purch
            let cell4 = document.createElement('td')
            cell4.innerHTML = dataModel.curPrice
            let cell5 = document.createElement('td')
            cell5.innerHTML = dataModel.pl

            newRow.appendChild(cell1)
            newRow.appendChild(cell2)
            newRow.appendChild(cell3)
            newRow.appendChild(cell4)
            newRow.appendChild(cell5)
            
            newRow.UUID = dataModel.UUID

            tbody.appendChild(newRow)
        }(cur)
    }
}

let modifying = false

const setupModifyEntries = function(e) {

    if (modifying) {
        // Close the modifying window

        modifying = false
    } else {
        modifying = true

        let entryform = document.querySelector('#newEntryForm')
        entryform.style = "display:block;margin:15px"

        let userInfo = document.querySelector('#tableBody')
        var rows = userInfo.getElementsByTagName("tr")
        console.log(rows)
        for (i = 0; i < rows.length; i++) {
            var curRow = userInfo.rows[i]
            console.log(curRow)
            var createClickHandler = function(row) {
                return function() {
                    console.log("CLICK")
                    let cells = row.getElementsByTagName("td")
                    for (i = 0; i < cells.length; i++) {
                        let curCell = cells[i]
                        let str = curCell.innerHTML
                        console.log(str)
                        if (row.toDel) {
                            curCell.innerHTML = str.replace("<strike>", "").replace("</strike>", "")
                        } else {
                            curCell.innerHTML = "<strike>" + str + "</strike>"
                        }
                    }
                    if (row.toDel) {
                        row.toDel = false
                    } else {
                        row.toDel = true
                    }
                }
            }    
            var funcPnt =  createClickHandler(curRow);
            curRow.onclick = funcPnt    
        }
    }
}

const signup = function( e ) {
    e.preventDefault()


    const input = document.querySelector( '#username' ),
        toSend = { username: input.value },
        body = JSON.stringify( toSend )

    if (input.value === "") {
        //Cant be empty
        alert("Cannot be empty")

        return false;
    }
    // User name not empty

    fetch( '/signup', {
        method:'POST',
        body 
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            
            if (response.status === 409) {
                alert("Username already exists")
            }

            return Promise.reject(new Error("error"))
        }
    })
    .then(
        data => setupUserInfo(data),
        rej => console.log("Error"))

}

const submitnewasset = function( e ) {
    e.preventDefault()

    let data = {}
    data.username = document.querySelector('#username').value
    data.tick = form.nTick.value
    data.amt = form.nAmt.value
    data.purch = form.nPurch.value
    const body = JSON.stringify( data )

    form.nTick.value = ""
    form.nAmt.value = ""
    form.nPurch.value = ""

    let userInfo = document.querySelector('#tableBody')
    var rows = userInfo.getElementsByTagName("tr")
    for (i = 0; i < rows.length; i++) {
        var curRow = userInfo.rows[i]
        if (curRow.toDel) {
            let data2 = {}
            data2.username = data.username
            data2.UUID = curRow.UUID

            fetch('/deleteAsset', {
                method: 'POST',
                body:JSON.stringify( data2 )
            })
                .then(response => {
                    if (response.ok) {
                        console.log("DELETED")
                        return response.json()
                    } else {
                        console.log("PROBLEM")
                        return Promise.reject(new Error('AssetNotDeleted'))
                    }
                })
                            .then(
                                data => setupUserInfo(data),
                                res => console.log('REJECTION'))
        }
    }
    
    if (data.tick === "" && data.amt === "" && data.purch === "") {
        return
    }

    fetch( '/newAsset', {
        method:'POST',
        body
    })
        .then(response => {
            if (response.ok) {
                console.log("Asset Added!")
                return response.json()
            } else {
                console.log("Asset not added!")
                return Promise.reject(new Error('assetNotAdded'))
            }
        })
        .then(
            data => setupUserInfo(data),
            res => console.log('REJECTION'))
}

const clearform = function ( e ) {
    e.preventDefault()

    for (let l in form) {
        console.log(l)
        console.log(form[l].value)
        form[l].value = ""
    }

    let userInfo = document.querySelector('#tableBody')
    var rows = userInfo.getElementsByTagName("tr")
    for (i = 0; i < rows.length; i++) {
        var curRow = userInfo.rows[i]
        let cells = curRow.getElementsByTagName("td")
        for (i = 0; i < cells.length; i++) {
            let curCell = cells[i]
            let str = curCell.innerHTML
            if (curRow.toDel) {
                curCell.innerHTML = str.replace("<strike>", "").replace("</strike>", "")
            }
        }
        if (curRow.toDel) {
            curRow.toDel = false
        }
    }
}












