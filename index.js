import Games from "./Games";
import Standings from "./Standings";

//---------------------------------------------------------------------------------------------------------
//-----------------------------------------------DATA CONTROLLER-------------------------------------------
//---------------------------------------------------------------------------------------------------------
let dataController = (function() {
  let time = new Date().getDate();
  //data structure
  const gameState = {
    //   allDataResults: {},
    //   allTeamsByDivision: {
    //     eastConference: {},
    //     southeastDiv: {},
    //     atlanticDiv: {},
    //     centralDiv: {}
    //   },
    //   westConference: {
    //     southwestDiv: {},
    //     pacificDiv: {},
    //     northwestDiv: {}
    //   }
    //
  };
  const standingsState = {};
  window.gameState = gameState;
  window.standingsState = standingsState;
  const teamAliasMap = [
    { name: "Mavericks", alias: "DAL" },
    { name: "Rockets", alias: "HOU" },
    { name: "Spurs", alias: "SAS" },
    { name: "Grizzlies", alias: "MEM" },
    { name: "Pelicans", alias: "NOP" },
    { name: "Lakers", alias: "LAL" },
    { name: "Clippers", alias: "LAC" },
    { name: "Kings", alias: "SAC" },
    { name: "Suns", alias: "PHX" },
    { name: "Warriors", alias: "GSW" },
    { name: "Nuggets", alias: "DEN" },
    { name: "Jazz", alias: "UTA" },
    { name: "Thunder", alias: "OKC" },
    { name: "Trail Blazers", alias: "POR" },
    { name: "Timberwolves", alias: "MIN" },
    { name: "Heat", alias: "MIA" },
    { name: "Magic", alias: "ORL" },
    { name: "Hornets", alias: "CHA" },
    { name: "Wizards", alias: "WAS" },
    { name: "Hawks", alias: "ATL" },
    { name: "Celtics", alias: "BOS" },
    { name: "Raptors", alias: "TOR" },
    { name: "76ers", alias: "PHI" },
    { name: "Nets", alias: "BKN" },
    { name: "Knicks", alias: "NYK" },
    { name: "Bucks", alias: "MIL" },
    { name: "Pacers", alias: "IND" },
    { name: "Bulls", alias: "CHI" },
    { name: "Pistons", alias: "DET" },
    { name: "Cavaliers", alias: "CLE" }
  ];

  return {
    getAliasMap: function() {
      return teamAliasMap;
    },
    getGameData: async function(dateOfGames) {
      const gameDate = dateOfGames;
      gameState.search = new Games(gameDate);
      try {
        await gameState.search.getResults();
        console.log("---------Games---------");
        console.log(gameState.search.result);
      } catch (err) {
        alert("Game.js issue: " + err);
      }
    },

    getClosedGames: function() {
      gameState.closedGames = [];
      gameState.closedGames = gameState.search.result.games.map(el => {
        if (el.status === "closed") {
          return {
            name_home: el.home.name,
            name_home_alias: el.home.alias,
            poits_home: el.home_points,
            name_away: el.away.name,
            name_away_alias: el.away.alias,
            points_away: el.away_points
          };
        } else {
          return {
            name_home: el.home.name,
            name_home_alias: el.home.alias,
            poits_home: "---",
            name_away: el.away.name,
            name_away_alias: el.away.alias,
            points_away: "---"
          };
        }
      });
    }, //----------end getClosedGames-------

    getStandingsData: async function() {
      standingsState.search = new Standings();
      try {
        await standingsState.search.getResults();
        console.log("---------RANKINGS---------");
        console.log(standingsState.search.result);
      } catch (err) {
        console.log("Standing.js..." + err);
      }
    },

    getLogo: function(name, alias) {
      let searchAlias = "";
      alias.forEach(el => {
        if (el.name === name) searchAlias = el.alias;
      });
      return searchAlias;
    },

    getAllStandings: function() {
      //all rankings divided to two divisions east and west
      standingsState.allDivisions = standingsState.search.result.conferences.map(
        el => el.divisions.map(el2 => el2.teams).flat()
      );

      //console.log(standingsState.allDivisions);
      standingsState.allTeams = standingsState.allDivisions
        .flat()
        .map(el => {
          return {
            id: el.id,
            name: el.name,
            market: el.market,
            wins: el.wins,
            losses: el.losses,
            alias: this.getLogo(el.name, teamAliasMap)
          };
        })
        .sort(function(a, b) {
          return a.wins > b.wins ? -1 : 1;
        })
        .sort(function(a, b) {
          if (a.wins === b.wins) return a.losses - b.losses;
        });

      console.log(standingsState.allTeams);
    },
    //---------------------------------------------------------------------------------------------------------
    //---------------------------------------------DATA CONTROLLER---------------------------------------------
    //----------------------------------------------Calendar Data----------------------------------------------

    getCalendar: function(year, month) {
      // let currDate = new Date();
      //how many days we got in month
      this.year = year;
      this.month = month;
      let day = time;
      let daysInMonth = new Date(year, month + 1, 0).getDate();
      //building array with separate days
      let arrWithDayInMonth = this.numberToArr(daysInMonth);
      let firstDayofMonth = new Date(year, month, 1).getDay();
      let prevMonthDays = new Date(year, month, 0).getDate();
      let nextMonthDays = new Date(year, month + 2, 0).getDate();
      let prevMonth = new Date(year, month - 1, 1);
      let nextMonth = new Date(year, month + 1, 1);
      let prevYear = new Date(year - 1, 0, 1);
      let nextYear = new Date(year + 1, 0, 1);

      return {
        year,
        month,
        day,
        days: daysInMonth,
        daysArr: arrWithDayInMonth,
        startMonth: firstDayofMonth,
        prevMonthDays,
        nextMonthDays,
        prevMonth,
        prevYear,
        nextMonth,
        nextYear,
        isActive: true,
        isSelected: false
      };
    },

    getAllDaysInMonth(obj) {
      let maxDaysInCalendar;
      //let days = [...obj.daysArr];
      let startDay = obj.startMonth;
      //let prevMonthDays = [];
      //let nextMonthDays = [];

      let prevDays = this.numberToArr(startDay)
        .map((el, index) => {
          return {
            day: obj.prevMonthDays - index,
            month: obj.prevMonth.getMonth(),
            year: obj.prevYear.getFullYear(),
            isActive: false
          };
        })
        .reverse();

      // for (let i = 0; i < startDay; i++) {
      //   prevMonthDays.push(obj.prevMonthDays - i);
      // }

      let currDays = this.numberToArr(obj.days).map((el, index) => {
        return {
          day: ++index,
          month: obj.month,
          year: obj.year,
          isActive: obj.isActive
        };
      });

      maxDaysInCalendar = 37 - (prevDays.length + currDays.length);

      let nexDays = this.numberToArr(maxDaysInCalendar).map((el, index) => {
        return {
          day: ++index,
          month: obj.nextMonth.getMonth(),
          year: obj.nextYear.getFullYear(),
          isActive: false
        };
      });
      // for (let i = 1; i <= maxDaysInCalendar; i++) {
      //   nextMonthDays.push(i);
      // }

      return (obj.allDays = [...prevDays, ...currDays, ...nexDays]);
    },

    decreaseYear: function(obj) {
      obj.year -= 1;
    },

    increaseYear: function(obj) {
      obj.year += 1;
    },

    changeMonth: function(obj, setMonth) {
      obj.month = setMonth;
    },

    updateActiveDay: function(obj, setDay) {
      obj.day = setDay;
      obj.isSelected = true;
    },

    numberToArr: function(nbr) {
      return new Array(nbr).fill().map((e, i) => i + 1);
    }

    // getYearAndMonth: function(calendarDate) {
    //   return {
    //     month: calendarDate.getMonth(),
    //     year: calendarDate.getFullYear()
    //   };
    // }
  };
})();
//---------------------------------------------------------------------------------------------------------
//-----------------------------------------------UI CONTROLLER---------------------------------------------
//---------------------------------------------------------------------------------------------------------
let UIController = (function() {
  const DOMstrings = {
    currDate: ".current-date",
    btnStandings: "#btn-standings",
    btnGames: "#btn-games",
    rankingList: ".container-standings",
    games: ".container-games",
    gameItem: ".game-item",
    gamesSchDay: ".games-schedule",
    // Calendar data:
    selectYear: ".main-year",
    downYearBtn: ".btn-left",
    upYearBtn: ".btn-right",
    calendarDays: ".calendar-days",
    calendarDay: ".calendar-day",
    calendarMonths: ".calendar-months",
    weekDays: ".day-of-week"
  };

  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const allWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return {
    getDOMstrings: function() {
      return DOMstrings;
    },

    getInput: function() {
      return {
        date: document.querySelector(DOMstrings.currDate).value
      };
    },

    deleteListItem: function() {
      let el = document.querySelector(DOMstrings.gamesSchDay);
      let first = el.firstElementChild;
      while (first !== null) {
        first.remove();
        first = el.firstElementChild;
      }

      //let el_nested = document.querySelector(DOMstrings.gameItem);
      // if (el.firstChild !== null) {
      //   while (el.firstChild) {
      //     el.removeChild(el.firstChild);
      //   }
      // }

      //       let element = document.getElementById("top");
      // while (element.firstChild) {
      //   element.removeChild(element.firstChild);
    },

    renderGames: function() {
      const gamesListHtml = gameState.closedGames.flat().map((el, index) => {
        return `<div class="game-item"><img src="./img/${el.name_home_alias}_logo.svg" class="img_sm_logo"><div class="home-team-name">${el.name_home}</div><div class="points-home">${el.poits_home}</div><div class="vs-text">vs</div><img src="./img/${el.name_away_alias}_logo.svg" class="img_sm_logo"><div class="away-team-name">${el.name_away}</div><div class="points-away">${el.points_away}</div></div>`;
      });
      document
        .querySelector(DOMstrings.gamesSchDay)
        .insertAdjacentHTML("beforeend", gamesListHtml.join(""));
    },

    renderStandingsUI: async function() {
      const rankListHtml = standingsState.allTeams.flat().map((el, index) => {
        return `<div class="tile-item item-${index}"><div class="rank">${index +
          1}</div><img src="./img/${
          el.alias
        }_logo.svg" class="img_sm_logo"><div class="team-name">${el.market} ${
          el.name
        }</div><div class="win">Win: ${el.wins}</div><div class="loss">Loss: ${
          el.losses
        }</div></div>`;

        // `<div class="item" id="item-${index}"><div class="rank">${el.rank}</div><div class="team-name">${el.team}</div><div class="win">Win: ${el.win}</div><div class="loss">Loss: ${el.loss}</div></div>`;
      });
      document
        .querySelector(DOMstrings.rankingList)
        .insertAdjacentHTML("beforeend", rankListHtml.join(""));
    },
    //---------------------------------Calendar UI-----------------------

    buildDays: function(obj) {
      let html = [];
      obj.allDays.forEach(el =>
        html.push(
          `<div class="item-flex ${obj.isActive ? "" : "another-month"}">${
            el.day
          }</div>`
        )
      );
      html.forEach(el =>
        document
          .querySelector(DOMstrings.calendarDays)
          .insertAdjacentHTML("beforeend", el)
      );
    },

    buildMonths: function() {
      let html = [];
      allMonths.forEach(el => html.push(`<div class="item-flex">${el}</div>`));
      html.forEach(el =>
        document
          .querySelector(DOMstrings.calendarMonths)
          .insertAdjacentHTML("beforeend", el)
      );
    },

    buildWeek: function() {
      let html = [];
      allWeekDays.forEach(el =>
        html.push(`<div class="item-flex">${el}</div>`)
      );
      html.forEach(el =>
        document
          .querySelector(DOMstrings.weekDays)
          .insertAdjacentHTML("beforeend", el)
      );
    },

    displayCalendar: function(obj) {
      this.buildMonths();
      this.buildWeek();
      this.buildDays(obj);
    },

    clearCalendar: function(anchor) {
      document.querySelector(anchor);

      let element = document.querySelector(anchor);
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },

    displayYear: function(obj) {
      document.querySelector(DOMstrings.selectYear).innerHTML = obj.year;
    },

    getMonths: function() {
      return allMonths;
    },

    getActiveDate: function(obj) {
      return `${obj.year}/${
        obj.month + 1 < 10 ? "0" + (obj.month + 1) : obj.month + 1
      }/${obj.day < 10 ? "0" + obj.day : obj.day}`;
    }
  };
})();

//---------------------------------------------------------------------------------------------------------
//-----------------------------------------------APP CONTROLLER--------------------------------------------
//---------------------------------------------------------------------------------------------------------

let APPcontroler = (function(gameDataCtrl, UICtrl) {
  let DOM = UICtrl.getDOMstrings();
  let setupEventListeners = function() {
    document
      .querySelector(DOM.btnStandings)
      .addEventListener("click", renderStandings);
    document.querySelector(DOM.btnGames).addEventListener("click", renderGames);

    //-------Calendar event listeners-------------
    document.querySelector(DOM.downYearBtn).addEventListener("click", downYear);
    document.querySelector(DOM.upYearBtn).addEventListener("click", upYear);
    document
      .querySelector(DOM.calendarMonths)
      .addEventListener("click", changeMonthInCalendar);
    document
      .querySelector(DOM.calendarDays)
      .addEventListener("click", selectActiveDay);
  };

  let currentDate = function(selection, attr) {
    const dateToday = new Date();
    const currDay = dateToday.getDate() - 2;
    const currMonth = dateToday.getMonth() + 1;
    const currYear = dateToday.getFullYear();
    let fullDate = "";

    if (currMonth <= 9 || currDay <= 9) {
      fullDate = `${currYear}-0${currMonth}-${currDay}`;
    } else {
      fullDate = `${currYear}-${currMonth}-${currDay}`;
    }

    const selectPlace = document.querySelector(selection);
    const createAttr = document.createAttribute(attr);
    createAttr.value = fullDate;

    selectPlace.setAttributeNode(createAttr);
  };

  let renderStandings = async function() {
    //make query to API
    await gameDataCtrl.getStandingsData();
    //get specific data for Standings
    gameDataCtrl.getAllStandings();
    //display in UI
    await UICtrl.renderStandingsUI();
  };

  let renderGames = async function() {
    //get input
    let input = UICtrl.getActiveDate(newCalendar);
    console.log(input);
    //make query for API
    await gameDataCtrl.getGameData(input);
    //get specific data for closed games to present
    gameDataCtrl.getClosedGames();
    //display UI
    UICtrl.deleteListItem();
    UICtrl.renderGames();
  };
  //------------------------------Calendar Controler-------------------

  let changeYear = 2020;
  let changeMonth = 0;

  let newCalendar = gameDataCtrl.getCalendar(changeYear, changeMonth);
  gameDataCtrl.getAllDaysInMonth(newCalendar);

  const selectActiveDay = function() {
    const innerDayValue = parseInt(event.target.innerHTML);
    console.log(innerDayValue);
    //if same month just update day if not generate new calendar
    newCalendar.allDays.forEach(el => {
      if (innerDayValue === el.day && el.isActive === true && el.year) {
        gameDataCtrl.updateActiveDay(newCalendar, innerDayValue);
      } else if (innerDayValue === el.day && el.isActive === false) {
        newCalendar = gameDataCtrl.getCalendar(el.year, el.month);
        gameDataCtrl.getAllDaysInMonth(newCalendar);
      }
    });
    // newCalendar = gameDataCtrl.getCalendar(newCalendar.year, newCalendar.month);
    // gameDataCtrl.getAllDaysInMonth(newCalendar);
    drawCalendar();
    console.log(newCalendar);
  };

  const changeMonthInCalendar = function(event) {
    const innerValueMonth = event.target.innerHTML;
    const months = UICtrl.getMonths();
    const changeMonth = months.indexOf(innerValueMonth);
    // gameDataCtrl.changeMonth(newCalendar, toChange);
    newCalendar = gameDataCtrl.getCalendar(newCalendar.year, changeMonth);
    gameDataCtrl.getAllDaysInMonth(newCalendar);
    drawCalendar();
    console.log(newCalendar);
  };

  const displayStartCalendar = function() {
    console.log(newCalendar);
    // gameDataCtrl.getAllDaysInMonth(newCalendar);
    UICtrl.displayCalendar(newCalendar);
    UICtrl.displayYear(newCalendar);
    UICtrl.getActiveDate(newCalendar);
  };

  const drawCalendar = function() {
    UICtrl.clearCalendar(DOM.calendarDays);
    UICtrl.clearCalendar(DOM.calendarMonths);
    UICtrl.clearCalendar(DOM.weekDays);
    UICtrl.displayCalendar(newCalendar);
    UICtrl.displayYear(newCalendar);
    UICtrl.getActiveDate(newCalendar);
  };

  //creating new current calendar

  const downYear = function() {
    gameDataCtrl.decreaseYear(newCalendar);
    newCalendar = gameDataCtrl.getCalendar(newCalendar.year, newCalendar.month);
    gameDataCtrl.getAllDaysInMonth(newCalendar);
    drawCalendar();
    console.log(newCalendar);
  };

  const upYear = function() {
    gameDataCtrl.increaseYear(newCalendar);
    newCalendar = gameDataCtrl.getCalendar(newCalendar.year, newCalendar.month);
    gameDataCtrl.getAllDaysInMonth(newCalendar);
    drawCalendar();
    console.log(newCalendar);
  };

  //---------END------------------Calendar Controler-------------------

  return {
    init: function() {
      console.log("APP started!");
      setupEventListeners();
      displayStartCalendar();
      //currentDate(".current-date", "value");
    }
  };
})(dataController, UIController);

APPcontroler.init();
