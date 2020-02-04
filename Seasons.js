import axios from "axios";
import { key_nba } from "../config";

export default class Seasons {
  constructor(access_level, version, language_code, format) {
    this.access_level = access_level;
    this.version = version;
    this.language_code = language_code;
    //this.competition_id = competition_id;
    this.format = format;
  }

  async getResults(access_level, version, language_code, format) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try {
      //saving promise result to res variable
      const res = await axios(
        //`${proxy}https://api.sportradar.com/basketball/${this.access_level}/${this.version}/${this.language_code}/seasons/${this.season_id}/standings.${this.format}?api_key=${key}`
        //https://api.sportradar.us/nba/{access_level}/{version}/{language_code}/league/seasons.{format}?api_key
        `${proxy}https://api.sportradar.us/nba/${this.access_level}/${this.version}/${this.language_code}/league/seasons.${this.format}?api_key=${key_nba}`
      );
      this.result = res.data;
      //console.log(this.result);
    } catch (error) {
      console.log(error);
      alert("Problem with Competition func");
    }
  }
}
