const app = require("./app"); // ✅ Only one import needed

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
