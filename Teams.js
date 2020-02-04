import axios from "axios";
import { key_nba } from "../config";

export default class Teams {
  constructor(access_level, version, language_code, team_id, format) {
    this.access_level = access_level;
    this.version = version;
    this.language_code = language_code;
    this.team_id = team_id;
    this.format = format;
  }

  async getResults(access_level, version, language_code, team_id, format) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try {
      //saving promise result to res variable
      const res = await axios(
        //`${proxy}https://api.sportradar.com/basketball/${this.access_level}/${this.version}/${this.language_code}/seasons/${this.season_id}/standings.${this.format}?api_key=${key}`
        `${proxy}https://api.sportradar.us/nba/${this.access_level}/${this.version}/${this.language_code}/teams/${this.team_id}/profile.${this.format}?api_key=${key_nba}`
      );
      this.result = res.data;
      //console.log(this.result);
    } catch (error) {
      console.log(error);
      alert("Problem with Teams func");
    }
  }
}
