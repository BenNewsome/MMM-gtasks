# MMM_gtasks

This is an extetion fro MagicMirror. It shows your google tasks from your default calendar.

# Installation

1. Install it
2. Create proper documentation


# Using the module

To use this module, add this to the modules array in the config/config.js

'''javascript
      {
         module: 'gtasks',
         header: 'To Do',
         position: 'top_left', // This can be any of the regions.
         config: {
            // See 'Configuration options' for more information. 
            text: 'To do not loaded yet'
         }
'''


#Configuration options
The following can be configured

1. What list[s] to display

2. Only display uncopmpleted tasks

3. Update frequency 
   default = 300 seconds

4. fade: false
