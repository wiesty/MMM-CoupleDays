Module.register("MMM-CoupleDays", {
    defaults: {
      name1: "Partner 1",
      name2: "Partner 2",
      date: "2023-01-01",
      transitionDuration: 7500
    },
  
    start: function () {
      var startDate = new Date(this.config.date);
      var currentDate = new Date();
      var timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
      this.numOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.numOfMonths = Math.ceil(timeDiff / (1000 * 3600 * 24 * 30.436875));
      this.numOfYears = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));
  
      this.currentStyle = 1;
      this.nextStyle = 2;
      this.transitionInterval = null;
      var self = this;
      setInterval(function () {
        self.updateDom();
      }, 1000);

      this.transitionInterval = setInterval(function () {
        self.transitionStyles();
      }, this.config.transitionDuration);
    },
  
    getStyles: function () {
      return ["MMM-CoupleDays.css"];
    },
  
    getHeader: function () {
      return "&hearts; " + this.config.name1 + " und " + this.config.name2 + " &hearts;";
    },
  
    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.className = "couple-days-wrapper show"; 
  
      var title = document.createElement("div");
      title.className = "small bright";
      wrapper.appendChild(title);
  
      var count = document.createElement("div");
      count.className = "medium bright";
      count.innerHTML = this.getCountText();
      wrapper.appendChild(count);
  
      return wrapper;
    },
  
    transitionStyles: function () {
      var self = this;
  
      var wrapper = document.querySelector(".couple-days-wrapper");
      setTimeout(function () {
        self.currentStyle = self.nextStyle;
        self.nextStyle = (self.nextStyle % 5) + 1;
        wrapper.querySelector(".medium").innerHTML = self.getCountText();
      }, this.config.transitionDuration / 2);
    },
  
    getCountText: function () {
      var text = "";
  
      switch (this.currentStyle) {
        case 1: // Nur Tage
          text = this.numOfDays === 1 ? "1 Tag" : this.numOfDays + " Tage";
          break;
        case 2: // Wochen
          text = Math.round(this.numOfDays / 7)  + " Wochen";
          break;
        case 3: // Monate
            text = this.numOfMonths  + " Monate";
            break;
        case 4:
          var daysText = (this.numOfDays % 30) === 1 ? "1 Tag" : (this.numOfDays % 30) + " Tage";
          var weeksText = Math.floor((this.numOfDays % 30) / 7) === 1 ? "1 Woche" : Math.floor((this.numOfDays % 30) / 7) + " Wochen";
          var monthsText = (this.numOfMonths % 12) === 1 ? "1 Monat" : (this.numOfMonths % 12) + " Monate";
          var yearsText = this.numOfYears === 1 ? "1 Jahr" : this.numOfYears + " Jahre";
          if (this.numOfYears < 1 && (this.numOfMonths % 12) < 12) {
            if ((this.numOfMonths % 12) < 1) {
              text = daysText;
            } else if ((this.numOfDays % 30) < 7) {
              text = monthsText;
            } else {
              text = monthsText + ", " + weeksText + " und " + daysText;
            }
          } else if (this.numOfYears === 1) {
            text = yearsText + ", " + monthsText + ", " + weeksText + " und " + daysText;
          } else {
            text = yearsText + ", " + monthsText + ", " + weeksText + " und " + daysText;
          }
          break;
        default:
            var daysText = (this.numOfDays % 30) === 1 ? "1 Tag" : (this.numOfDays % 30) + " Tage";
            var weeksText = Math.floor((this.numOfDays % 30) / 7) === 1 ? "1 Woche" : Math.floor((this.numOfDays % 30) / 7) + " Wochen";
            var monthsText = (this.numOfMonths % 12) === 1 ? "1 Monat" : (this.numOfMonths % 12) + " Monate";
            var yearsText = this.numOfYears === 1 ? "1 Jahr" : this.numOfYears + " Jahre";
            if (this.numOfYears < 1 && (this.numOfMonths % 12) < 12) {
              if ((this.numOfMonths % 12) < 1) {
                text = daysText;
              } else if ((this.numOfDays % 30) < 7) {
                text = monthsText;
              } else {
                text = monthsText + ", " + weeksText + " und " + daysText;
              }
            } else if (this.numOfYears === 1) {
              text = yearsText + ", " + monthsText + ", " + weeksText + " und " + daysText;
            } else {
              text = yearsText + ", " + monthsText + ", " + weeksText + " und " + daysText;
            }
      }
  
      return text;
    }
  });
  