         function updateTable(name, responsibility, watch, fan){
            let table = document.getElementById("responses");

            let n = row.insertCell(0);
            let r = row.insertCell(1);
            let w = row.insertCell(2);
            let f = row.insertCell(3);
          
            
            n.innerHTML = name.replace("+"," ");
            r.innerHTML = responsibility;
            if(watch == "y"){
                w.innerHTML = "Yes";
            } else {
                w.innerHTML = "No";
            }
          
            if(fan == "y"){
                f.innerHTML = "Yes";
            } else {
                f.innerHTML = "No";
            }

        }