const express = require('express');
const fs = require('fs');

const app = express();

app.get("/api/billboard", (req, res) => {
	//processing
	const data = JSON.parse(fs.readFileSync("billbo.json", "utf-8"));
	res.status(200).json(
		data
	);
});

app.listen(5000, () => console.log("Loaded API."))