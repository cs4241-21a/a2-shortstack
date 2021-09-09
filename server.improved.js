const http = require('http'),
	fs = require('fs'),
	mime = require('mime'),
	dir = 'public/',
	port = 3000

let budget = 2500;

const appdata = [
	{
		"date": "2021-09-07",
		"I": 4273.82,
		"O": 47.32,
		"transactions": [
			{"isIn": false, "date": "2021-09-07", "amount": "34.99", "category": "Brunch"},
			{"isIn": false, "date": "2021-09-07", "amount": "12.33", "category": "Uber"},
			{"isIn": true, "date": "2021-09-07", "amount": "4273.82", "category": "Stock Sold"}
		]
	}, {
		"date": "2021-09-08",
		"I": 297.64,
		"O": 480.17,
		"transactions": [
			{"isIn": true, "date": "2021-09-08", "amount": "297.64", "category": "Stock Sold"},
			{"isIn": false, "date": "2021-09-08", "amount": "480.17", "category": "Dentist"}
		]
	}
]

const server = http.createServer(function (request, response) {
	if (request.method === 'GET') {
		handleGet(request, response)
	} else if (request.method === 'POST') {
		handlePost(request, response)
	}
})

const handleGet = function (request, response) {
	const filename = dir + request.url.slice(1)
	if (request.url === '/') {
		sendFile(response, 'public/index.html')
	} else if (request.url === '/submit') {
		console.log(request)
		console.log(response)
		console.log(filename)
	} else {
		sendFile(response, filename)
	}
}

const handlePost = function (request, response) {
	let dataString = ''

	request.on('data', function (data) {
		dataString += data
	})

	request.on('end', function () {
		let received = JSON.parse(dataString)
		console.log(received)
		if (received.type === 'getData') {
			response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
			response.end(JSON.stringify(appdata))
		} else if (received.type === "getBudget") {
			response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
			response.end(JSON.stringify(budget))
		} else if (received.type === "budget") {
			budget = received.budget
			console.log(budget)
			response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
			response.end(JSON.stringify(budget))
		} else if ((received.type === "income" || received.type === "expense") && !isNaN(Date.parse(received.date)) && !isNaN(received.amount)) {
			let searched = appdata.find(each => each.date === received.date)
			if (searched !== undefined) {
				if (received.type === "expense") {
					searched.transactions.push(
						{
							"isIn": false,
							"date": received.date,
							"amount": (+received.amount).toFixed(2),
							"category": received.category
						})
					searched.O += +(+received.amount).toFixed(2)
				} else {
					searched.transactions.push(
						{
							"isIn": true,
							"date": received.date,
							"amount": (+received.amount).toFixed(2),
							"category": received.category
						})
					searched.I += +(+received.amount).toFixed(2)
				}
			} else if (received.type === "expense") {
				appdata.push(
					{
						"date": received.date,
						"I": 0.00,
						"O": +(+received.amount).toFixed(2),
						"transactions": [
							{
								"isIn": false,
								"date": received.date,
								"amount": (+received.amount).toFixed(2),
								"category": received.category
							}
						]
					})
			} else {
				appdata.push(
					{
						"date": received.date,
						"I": +(+received.amount).toFixed(2),
						"O": 0.00,
						"transactions": [
							{
								"isIn": true,
								"date": received.date,
								"amount": (+received.amount).toFixed(2),
								"category": received.category
							}
						]
					})
			}
			// console.log(appdata)
			// appdata.forEach(each => each.transactions.forEach(each => console.log(each)))
			response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
			response.end(JSON.stringify(appdata))
		} else {
			console.log(appdata)
			response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
			response.end("Illegal action, not performed")
		}
	})
}

const sendFile = function (response, filename) {
	const type = mime.getType(filename)

	fs.readFile(filename, function (err, content) {

		// if requesting a teapot, then we return a teapot
		// if the error = null, then we've loaded the file successfully
		if (filename === 'public/teapot') {
			response.writeHeader(418)
			response.end(`418: I'm a teapot`)
		} else if (err === null) {
			response.writeHeader(200, {'Content-Type': type})
			response.end(content)
			console.log('Accessed: ' + filename)
		} else {
			response.writeHeader(404)
			response.end('404 Error: File Not Found')
		}
	})
}

server.listen(process.env.PORT || port)
