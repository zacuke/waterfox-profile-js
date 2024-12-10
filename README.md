Waterfox conversion steps:
* Case sensitive Search and replace
  * `Firefox` to `Waterfox`
  * `firefox` to `waterfox`
* Rollback the docs
  * `git restore '*.md'`
* Rename folder and files
  * `./doc/firefox_profile.md` to `./doc/waterfox_profile.md`
  * `./firefox-profile.sublime-project` to `./waterfox-profile.sublime-project`
  * `./test/firefox_profile.js` to `./test/waterfox_profile.js`
  * `./lib/firefox_profile.js` to `./lib/waterfox_profile.js`
  * `./lib/firefox_profile.d.ts` to `./lib/waterfox_profile.d.ts`
* Update package.json
  * Line 23 repo url
  * Line 32 author
  * Line 35 bugs
  * Line 79 Add Saad Tazi credit
 * Update README.md
  * Remove original firefox info 

 # waterfox-profile-js

Forked from:
https://github.com/saadtazi/firefox-profile-js