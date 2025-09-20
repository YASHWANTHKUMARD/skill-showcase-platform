//server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect("mongodb://127.0.0.1:27017/tce_rootz")
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));
const alumniSchema = new mongoose.Schema({
name: String,
batch: String,
email: String,
phone: String,
department: String,
});
const Alumni = mongoose.model("Alumni", alumniSchema, "student_detail");
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/addAlumni", async (req, res) => {
try {
const alumni = new Alumni(req.body);
await alumni.save();
res.send(
`<h2>Alumni details saved successfully!</h2>
<a href="/display.html">View Alumni</a>`
);
} catch (err) {
res.status(500).send("Error saving alumni: " + err);
}
});
app.get("/alumni", async (req, res) => {
try {
const alumniList = await Alumni.find();
res.json(alumniList);
} catch (err) {
res.status(500).send("Error fetching alumni: " + err);
}
});
const PORT = 3000;
app.listen(PORT, () => {
console.log(`🚀 Server running at http://localhost:${PORT}`);
});