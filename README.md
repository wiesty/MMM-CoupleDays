# MMM-CoupleDays  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wiesty/MMM-CoupleDays/raw/master/LICENSE)
MagicMirror² Module that displays the number of days, weeks, months, and years since a specified date, serving as a romantic reminder for couples.

![image](https://i.imgur.com/BeR7bQg.jpg)


## Dependencies
* instance of [MagicMirror²](https://github.com/MichMich/MagicMirror)

## Installation
1. Clone this repository in your MagicMirror installation into the folder modules.
```git clone https://github.com/wiesty/MMM-CoupleDays.git```
2. Modify the config template below
4. Add configuration to your config.js

## Example Config


```
{
	module: "MMM-CoupleDays",
	position: "bottom_right",
	config: {
		name1: "Partner 1",
		name2: "Partner 2",
		date: "2023-01-01", // year-month-day
		transitionDuration: 5000 // in ms
	}
},
```

The module allows you to customize the names of the partners, the starting date, and the transition duration for smooth animations. It automatically calculates the elapsed time and updates the display every second.

The module supports different styles of displaying the time, which transition in a loop with a configurable duration. The styles include showing only the number of days, the number of weeks, the number of months, or a combination of years, months, weeks, and days.
