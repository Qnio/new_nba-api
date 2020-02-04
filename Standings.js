import axios from "axios";
import { key, key_nba } from "../config";

export default class Standings {
  constructor() {}
  async getResults() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try {
      //saving promise result to res variable
      const res = await axios(
        //https://api.sportradar.us/nba/{access_level}/{version}/{language_code}/seasons/{season_year}/{nba_season}/standings.{format}?api_key={your_api_key}
        //`${proxy}https://api.sportradar.com/basketball/${this.access_level}/${this.version}/${this.language_code}/seasons/${this.season_id}/standings.${this.format}?api_key=${key}`
        //`${proxy}https://api.sportradar.com/basketball/${this.access_level}/${this.version}/${this.language_code}/seasons/${this.season_id}/standings.${this.format}?api_key=${key}`
        `${proxy}https://api.sportradar.us/nba/trial/v7/en/seasons/2019/REG/standings.json?api_key=${key_nba}`
      );
      this.result = res.data;
    } catch (error) {
      console.log(error);
      alert("Problem with Standing func");
    }
  }
  //   fetch(
  //     `${proxy}https://api.sportradar.us/nba/${this.access_level}/${this.version}/${this.language_code}/seasons/${this.season_year}/${this.nba_season}/rankings.${this.format}?api_key=${key}`,
  //     {
  //       method: "GET"
  //       // headers: {
  //       //   "x-rapidapi-host": "api.sportradar.us",
  //       //   "x-rapidapi-key": "xpmjs9hyy3bxnxna58b94atb"
  //       // }
  //     }
  //   )
  //     .then(response => {
  //       this.result = response;
  //       console.log(this.result);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
}
