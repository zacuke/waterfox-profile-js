var WaterfoxProfile,
wd = require('wd');
try {
 WaterfoxProfile = require('../lib/waterfox_profile');
} catch (e) {
  WaterfoxProfile = require('waterfox-profile');
}
// set some userPrefs if needed
// Note: make sure you call encoded() after setting some userPrefs
var fp = new WaterfoxProfile();
// activate and open firebug by default for all sites
// activate the console panel

// show the console panel
fp.setPreference('extensions.firebug.allPagesActivation', 'on');
fp.setPreference('extensions.firebug.allPagesActivation', 'on');
fp.setPreference('extensions.firebug.console.enableSites', true);
fp.setPreference('extensions.firebug.cookies.enableSites', true);
fp.setPreference('extensions.firebug.net.enableSites', true);
fp.setPreference('extensions.firebug.script.enableSites', true);
fp.setPreference('extensions.firebug.currentVersion', '2.0.1');
fp.setPreference('extensions.firebug.defaultPanelName', 'console');
fp.setPreference('saadt.coucou', 'console');
fp.setPreference('browser.startup.homepage', 'http://saadtazi.com');
// fp.setPreference('browser.startup.homepage_welcome_url', 'http://saadtazi.com');
// fp.setPreference('startup.homepage_welcome_url', 'http://saadtazi.com');
fp.setPreference('browser.startup.page', '1');

fp.updatePreferences();
// you can install multiple extensions at the same time
fp.encoded(function(err, zippedProfile) {
  if (err) { 
    console.log('oops, error!', err);
    return;
  }
  browser = wd.remote({
    protocol: 'http:',
    hostname: '127.0.0.1',
    port: '4444',
    // pathname: '/' // if you use geckodriver directly (without selenium server)
  }, 'promiseChain');
  browser.init({
      browserName:'waterfox',
      marionette: true, // waterfox 47+
      'moz:waterfoxOptions': {
          // set waterfox profile capabilities HERE!!!!
          profile: zippedProfile
        }
      })
      // NOTE: for non-geckodriver user with waterfox 46 or older
      // the capability needs to be something like:
      // {
      //   browserName:'waterfox',
      //   waterfox_profile: zippedProfile
      // }

      // woOot!!
      .get('http://en.wikipedia.org')
      .then(() => console.log('here'))
      .catch((err) => console.log('rrrrr::', err))
    });



setTimeout(() => console.log('done'), 15000)