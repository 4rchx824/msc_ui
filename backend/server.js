var app = require("./controller/app");

const PORT = 8081;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
