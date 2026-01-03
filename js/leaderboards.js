window.onload = () => {
    const leaderboard = document.querySelector('#leaderboardsTable');

    const table = document.createElement('table');
    const tableHeader = document.createElement('tr');
    tableHeader.innerHTML = "<th>Position</th><th>Player</th><th>Score</th>";

    table.appendChild(tableHeader);

    //Retrieving the users data
    const users = [];

    const allKeys = Object.keys(localStorage);
    for (const key of allKeys) {
        const data = localStorage.getItem(key);
        const parsedData = JSON.parse(data);
        users.push(parsedData);
    }

    users.sort((a, b) => b.score - a.score); // Sorting the data

    //Display the top 5 users
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        const positionCell = document.createElement('td');
        const usernameCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        //Fill in the table with the data
        positionCell.textContent = i + 1;

        if (i < users.length) {
            const user = users[i];
            usernameCell.textContent = user.username;
            scoreCell.textContent = user.score;
        }

        row.appendChild(positionCell);
        row.appendChild(usernameCell);
        row.appendChild(scoreCell);

        table.appendChild(row);
    }

    leaderboard.appendChild(table);
}  