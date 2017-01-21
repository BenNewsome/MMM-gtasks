# MMM_gtasks

This is an extetion for [MagicMirror](https://magicmirror.builders/). It shows your google tasks from your default calendar.

Warning: This is my first attempt at using node.js. I could be passing your google tasks credentials about the network in plaintext, so anyone on your local network could see a read-only copy of your google tasks. If you have your secret plans for world domination on your google to-do list, I would advise against the use of this module.

# Installation

1. Navigate to your MagicMirror directory.

2. Download the module.
      `cd modules && git clone https://github.com/BenNewsome/MMM-gtasks`
      
3. Install the module and its dependencies.
      `cd MMM-gtasks && npm install`
4. Download your client_secret.json file by following the guide linked below.
      Once downloaded make sure it has the name client_secret.json and is in the MMM-gtasks folder.
4. Add the module in your MagicMirror/config/config.js
5. Navigate again to your MagicMirror directory.
6. Run the mirror in server only mode with the command below. You will be presented with a link. Follow the link and google will provide you with a string of text. Copy and paste that into the console. 
      `node serveronly`
7. Everything should be installed and you can run with npm start now.

# Troubleshooting
If you have any problems, consider adding  `debug: true` to the config and seeing what is displayed in the console with `node serveronly`. If it is not obvious raise an issue on github.

# Using the module

To use this module, add this to the modules array in the config/config.js

```javascript
      {
         module: 'MMM-gtasks',
         header: 'To Do',
         position: 'top_left', // This can be any of the regions.
         config: {
            brightness: 13, // Value from 1 - 15
            tasksNumber: 10, // Number of tasks you want to get
            taskMaxLength: 70, // Character length of tasks before it truncates
            taskList: "@default", // Untested way of choosing what task list to use
            debug: false, // Enable this only if you wish lots of logging to consoles.
         },
      },
```


#Configuration options
The following can be configured
<table width="100%">
<thead>
<tr>
      <th>Option</th><th width="100%"> Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>brightness</td><td> Choose the text brightness from 1 - 15 (Hexadecimal with 0 being black). (Default = 13)<\td>
<\tr><\tr>
<td>taskNumber</td><td> Number of tasks to get from google. (Default=10)<\td>
<\tr><\tr>
<td>taskMaxLength</td><td>Number of charicters you want to use before truncating. (Default = 50)<\td>
<\tr><\tr>
<td>updateFrequency</td><td>The number of seconds between checks for updates. (Default = 300)<\td>
<\tr><\tr>
<td>taskList</td><td> Choose the google tasks list you want to get. The default list is called "@default" UNTESTED!<\td>
<\tr><\tr>
<td>debug</td><td> Choose if you want to litter the console with messages. (Default = false)<\td>
<\tr>
<\tbody>
<\table>


