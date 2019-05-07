# DQMSL Search Translation

This project provides a userscript that translates Japanese names in DQMSL
Search (http://dqmsl-search.net) to Chinese.

## Installation

For Google Chrome, an extension is available on
[Chrome Web Store](https://chrome.google.com/webstore/detail/dqmsl-search-translation/bfoalanjlafmpdifnnohngjdlbhkephh?hl=en-GB).
As Google needs to review the extension before publishing, the version on
Chrome Web Store is not always up-to-date.

For Apple Safari, an extension is available
[here](https://drive.google.com/folderview?id=0BwtU1M55iR0ATG9WZ0NoOG1BWTQ&usp=sharing).
Currently, when a new version is available, you need to manually
download and install the update.

You may also install the latest userscript manually.
Assume the project files have been downloaded to a local folder named A.

### Google Chrome

- Visit chrome://extensions/.
- Enable "Developer mode" (at the upper-right corner).
- Click "Load unpacked extension...".
- Select the folder "A".

### Apple Safari

Rename the folder "A" to "A.safariextension" before the following steps
in Safari. 

- Click the menu item "Develop" > "Show Extension Builder".
  If there is no "Develop" menu, enable it in "Preferences..." > "Advanced"
  > "Show Develop menu in menu bar".
- Click the + button (at the lower-left corner) and then "Add Extension...".
- Select the folder "A.safariextension".
- Click "DQMSL Search Translation" in the left panel.
- Click the "Install" button at the upper-right corner.

### Mozilla Firefox (PC / Android)

- Install the extension Tampermonkey.
- Go to Tampermonkey dashboard.
- There are two options in this step.
  - In the Utilities tab, import tampermonkey-import.txt under File.
  - Click the + icon, paste the content of dqmsl.user.js in the editor, and then save it.

## Uninstall

Depending on the browser, perform the following steps to uninstall this
userscript.

### Google Chrome

- Visit chrome://extensions/.
- Click the trash can icon for DQMSL Search Translation.

### Apple Safari

- Click the menu item "Develop" > "Show Extension Builder"
- Click "DQMSL Search Translation" in the left panel.
- Click the "Uninstall" button at the upper-right corner.

### Mozilla Firefox with Tampermonkey

- Visit Tampermonkey dashboard.
- Click the trash can icon after DQMSL Search Translation.

## Update

User can always uninstall and then re-install the userscript to update it.
To avoid uninstallation, store the up-to-date project files in the folder
A same as the folder in Installation.

### Google Chrome

- Visit chrome://extensions/.
- Click the reload icon in the DQMSL Search Translation extension.

### Apple Safari

- Click the menu item "Develop" > "Show Extension Builder"
- Click "DQMSL Search Translation" in the left panel.
- Click the "Reload" button.

### Mozilla Firefox with Tampermonkey

- Do the installation instructions again.
