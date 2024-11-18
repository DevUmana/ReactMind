import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import { readFile } from "fs/promises";

async function seedQuestions() {
  // Dynamically load the JSON file
  const pythonQuestions = JSON.parse(
    (
      await readFile(new URL("./pythonQuestions.json", import.meta.url))
    ).toString()
  );

  db.once("open", async () => {
    try {
      // Clean the database
      await cleanDB("Question", "questions");

      // Seed questions
      await Question.insertMany(pythonQuestions);

      console.log("Questions seeded!");
    } catch (error) {
      console.error("Error seeding questions:", error);
    } finally {
      process.exit(0);
    }
  });
}

seedQuestions();
