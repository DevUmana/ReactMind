import { readFile } from "fs/promises";
import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import { resolve } from "path";

async function seedQuestions() {
  try {
    const jsonPath = resolve("./src/seeds/pythonQuestions.json");
    const pythonQuestions = JSON.parse(await readFile(jsonPath, "utf-8"));

    console.log("Seeding questions...");
    console.log(pythonQuestions);

    db.once("open", async () => {
      await cleanDB("Question", "questions");
      await Question.insertMany(pythonQuestions);
      console.log("Questions seeded!");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error seeding questions:", error);
    process.exit(1);
  }
}

seedQuestions();
