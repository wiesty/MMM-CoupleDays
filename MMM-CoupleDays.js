Module.register("MMM-CoupleDays", {
  defaults: {
    name1: "Partner 1",
    name2: "Partner 2",
    date: "2023-01-01",
    transitionDuration: 7500,
    language: "en"
  },

  start: function () {
    this.currentIndex = 0;
    this.views = [
      { key: "days", label: this.translate("days") },
      { key: "weeks", label: this.translate("weeks") },
      { key: "months", label: this.translate("months") },
      { key: "years", label: this.translate("years") },
      { key: "total", label: this.translate("total") }
    ];5
    this.currentView = this.views[this.currentIndex];
    this.startDate = moment(this.config.date);
    this.endDate = moment();
    this.headerWrapper = document.createElement("div");
    this.headerWrapper.className = "couple-days-header";
    this.wrapper = document.createElement("div");
    this.wrapper.className = "couple-days-wrapper";
    this.wrapper.appendChild(this.headerWrapper);
    this.contentWrapper = document.createElement("div");
    this.contentWrapper.className = "couple-days-content";
    this.wrapper.appendChild(this.contentWrapper);
    this.updateContent();
    this.updateDom();
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.views.length;
      this.currentView = this.views[this.currentIndex];
      this.updateContent();
    }, this.config.transitionDuration);
  },

  getStyles: function () {
    return ["MMM-CoupleDays.css"];
  },

  getScripts: function () {
    return ["moment.js"];
  },

  getTranslations: function () {
    if (this.config.language === "de") {
      return {
        de: "translations/de.json"
      };
    } else {
      return {
        en: "translations/en.json"
      };
    }
  },

  getHeader: function () {
    return this.config.name1 + " " + this.translate("and") + " " + this.config.name2;
  },

  getDuration: function (unit) {
    return this.endDate.diff(this.startDate, unit);
  },

  formatDuration: function (duration, unit) {
    var translationKey = unit + (duration === 1 ? "" : "_plural");
    return duration + " " + this.translate(translationKey);
  },

  updateContent: function () {
    this.contentWrapper.innerHTML = this.getFormattedDuration();
  },

  getFormattedDuration: function () {
    switch (this.currentView.key) {
      case "days":
        return this.formatDuration(this.getDuration("days"), this.currentView.label);
      case "weeks":
        return this.formatDuration(this.getDuration("weeks"), this.currentView.label);
      case "months":
        return this.formatDuration(this.getDuration("months"), this.currentView.label);
      case "years":
        return this.formatYears();
      case "total":
        return this.formatTotal();
    }
  },

  formatYears: function () {
    var years = Math.floor(this.getDuration("years"));
    var months = Math.floor(this.getDuration("months") % 12);
    var days = Math.floor(this.getDuration("days") % 30);
    if (years === 0) {
      return this.formatDuration(months, this.translate("months")) + " " + this.formatDuration(days, this.translate("days"));
    } else {
      var formattedYears = this.formatDuration(years, this.currentView.label);
      var formattedMonths = this.formatDuration(months, this.translate("months"));
      var formattedDays = this.formatDuration(days, this.translate("days"));
      if (years === 1) {
        formattedYears = years + " " + this.translate("years");
      } else {
        formattedYears = years + " " + this.translate("years_plural");
      }
      return formattedYears
    }
  },

  formatTotal: function () {
    var years = Math.floor(this.getDuration("years"));
    var months = Math.floor(this.getDuration("months") % 12);
    var days = Math.floor(this.getDuration("days") % 30);
    var formattedYears = this.formatDuration(years, this.translate("years"));
    var formattedMonths = this.formatDuration(months, this.translate("months"));
    var formattedDays = this.formatDuration(days, this.translate("days"));
    var andTranslation = this.translate("and");
      if (years === 0) {
        return formattedMonths + " " + andTranslation + " " + formattedDays;
      } else {
        return formattedYears + " " + " " + formattedMonths + " " + andTranslation + " " + formattedDays;
      }
  },

  getDom: function () {
    return this.wrapper;
  }
});
