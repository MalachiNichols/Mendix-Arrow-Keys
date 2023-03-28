# Mendix-Arrow-Keys
Short script to enable arrow key movement on mendix timesheets *ONLY WORKS ON MENDIX TIMESHEETS*

Tested on firefox, chrome and edge

# Usage 
hold Ctrl + arrowKey while focused on a timesheet enter field to change focused field to the field matching the direction of the arrowKey.
You can change "e.ctrlKey" in the if statements to use a different hotkey arrangement. See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent for more information on available event properties. I recommend a plugin such as tampermonkey or greasemonkey to run this script for your time sheet domain.
