# MMM_gtasks

This is an extetion for [MagicMirror](https://magicmirror.builders/). It shows your google tasks from your default calendar.

Warning: This is my first attempt at using node.js. I could be passing your google tasks credentials about the network in plaintext, so anyone on your local network could see a read-only copy of your google tasks. If you have your secret plans for world domination on your google to-do list, I would advise against the use of this module.

# Installation

1. Install it
2. Create proper documentation


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

1. What list[s] to display

2. Only display uncopmpleted tasks

3. Update frequency 
   default = 300 seconds

4. fade: false
