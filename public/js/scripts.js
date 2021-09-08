
function updateLeaderboard(leaderboard) {
    const holder = document.querySelector('#data');
    holder.innerHTML = '';
    leaderboard.forEach((element, index) => {
        const row = document.createElement('tr');
        // Sign-up Name
        const userData = document.createElement('td');
        const userInput = document.createElement('input');
        userInput.className = 'table-input';
        userData.appendChild(userInput);
        userInput.value = element.yourName;
        userInput.id = `user-${index}`;

        // Summoner Name
        const summonerData = document.createElement('td');
        const summonerInput = document.createElement('input');
        summonerInput.className = 'table-input';
        summonerData.appendChild(summonerInput);
        summonerInput.value = element.summonerName;
        summonerInput.id = `summonerName-${index}`;

        // Rank
        const rankData = document.createElement('td');
        const rankInput = document.createElement('input');
        rankInput.className = 'table-input';
        rankData.appendChild(rankInput);
        rankInput.value = element.rank;
        rankInput.id = `rank-${index}`;


        // Primary Position
        const primaryRoleData = document.createElement('td');
        const primaryRoleInput = document.createElement('input');
        primaryRoleInput.className = 'table-input';
        primaryRoleData.appendChild(primaryRoleInput);
        primaryRoleInput.value = element.primaryRole;
        primaryRoleInput.id = `primaryRole-${index}`;

        //Make team
        const makeTeamData = document.createElement('td');
        const makeTeamInput = document.createElement('input');
        makeTeamInput.className = 'table-input';
        makeTeamData.appendChild(makeTeamInput);
        makeTeamInput.value = element.makeTeam;
        makeTeamInput.id = `makeTeam-${index}`;
        row.appendChild(userData);
        row.appendChild(summonerData);
        row.appendChild(rankData);
        row.appendChild(primaryRoleData);
        row.appendChild(makeTeamData);
        holder.appendChild(row);
    });
}

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    const yourname = document.querySelector('#yourname');
    const rank = document.querySelector('#rank');
    const sumname = document.querySelector('#sumname');
    const prole = document.querySelector('#prole');
    const json = {yourName: yourname.value, rank: rank.value, summonerName: sumname.value, primaryRole: prole.value, makeTeam: true};
    const body = JSON.stringify(json);
    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( async function (response) {
            const leaderboard = await response.json();
            updateLeaderboard(leaderboard);
        })

    return false
}

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
}
