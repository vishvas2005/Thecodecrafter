require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is working with Firebase!");
});

app.post("/add-doctor", async (req, res) => {
  try {
   const newDoctors = req.body;

   if(!Array.isArray(newDoctors)){
    return res.status(400).json({error:"its an array"});
   }

   res.status(201).json({message:"doctor added successfully",doctors:newDoctors});
  } catch (error) {
    console.error("error in /doctor route",error);
    res.status(500).json({error:"internal server arrr",error});
  }
});


app.get("/doctors", async (req, res) => {
  try {
    const snapshot = await db.collection("doctors").get();
    let doctors = [];
    snapshot.forEach((doc) => doctors.push({ id: doc.id, ...doc.data() }));
    res.json(doctors);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
