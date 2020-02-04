import { key_nba } from "../config";
import axios from "axios";

export default class Games {
  // constructor(access_level, version, language_code, year, month, day, format) {
  //   (this.access_level = access_level),
  //     (this.version = version),
  //     (this.language_code = language_code),
  //     (this.year = year),
  //     (this.month = month),
  //     (this.day = day),
  //     (this.format = format);
  // }

  constructor(gameDate) {
    this.gameDate = gameDate;
  }
  async getResults(gameDate) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try {
      const res = await axios(
        `${proxy}https://api.sportradar.us/nba/trial/v7/en/games/${this.gameDate}/schedule.json?api_key=${key_nba}`
      );
      this.result = res.data;
    } catch (err) {
      alert("problem with Games.js query" + err);
    }
  }
}
