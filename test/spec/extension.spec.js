/*jshint camelcase:false*/
/*global describe:false, it:false, after:false */
'use strict';

var wd = require('wd'),
  request = require('request'),
  browser,
  WaterfoxProfile = require('../../lib/waterfox_profile'),
  testProfiles = require('../test_profiles');

var username = process.env.SAUCE_USERNAME || 'SAUCE_USERNAME',
  accessKey = process.env.SAUCE_ACCESS_KEY || 'SAUCE_ACCESS_KEY';

after(function (done) {
  this.timeout(20000);
  browser ? browser.quit().then(done) : done();
});

function sendStatusToSauceLabs(sessionID, passed, cb) {
  var url =
    'http://' +
    username +
    ':' +
    accessKey +
    '@saucelabs.com/rest/v1/' +
    username +
    '/jobs/' +
    sessionID;
  request.put(
    {
      url: url,
      json: { passed: passed, public: 'public' },
    },
    function (/*err, response, body*/) {
      //console.log('request:: ', body);
      cb();
    }
  );
}

describe.skip('install extension', function () {
  this.timeout(120000);

  it('should be able to install an extension in waterfox and run firebug-specific javascript', function (done) {
    var fp = new WaterfoxProfile(),
      testProfile = testProfiles.profileWithFirebug;
    fp.setPreference('extensions.firebug.allPagesActivation', 'on');
    fp.setPreference('extensions.firebug.console.enableSites', true);
    fp.setPreference('extensions.firebug.cookies.enableSites', true);
    fp.setPreference('extensions.firebug.net.enableSites', true);
    fp.setPreference('extensions.firebug.script.enableSites', true);
    fp.setPreference('extensions.firebug.currentVersion', '2.0.1');
    fp.setPreference('extensions.firebug.defaultPanelName', 'console');
    // calling updatePreferences is now optional
    // no longer works with ff 30+: have to be called explicitly
    fp.updatePreferences();
    fp.addExtensions(testProfile.extensions, function () {
      fp.encoded(function (zippedProfile) {
        browser = wd
          .promiseChainRemote('ondemand.saucelabs.com', 80, username, accessKey)
          .catch(function (e) {
            console.log('eeerrrror:', e);
          });

        // browser.on('status', function(info) {
        //   console.log(info);
        // });
        // browser.on('command', function(meth, path, data) {
        //   console.log(' > ' + meth, path, data || '');
        // });
        browser
          .init({
            browserName: 'waterfox', // latest
            waterfox_profile: zippedProfile,
            name: 'waterfox-profile-js',
            build: process.env.TRAVIS_JOB_ID,
          })
          .get('http://saadtazi.com')
          .sleep(1000)
          // note: console.table used to be exclusive to firebug,
          // but it is now only implemented by most modern browsers
          /*jshint evil:true */
          .eval('1 + 1')
          .then(function (res) {
            expect(res).to.eq(2);
            if (browser.sessionID) {
              sendStatusToSauceLabs(browser.sessionID, true, function () {
                done();
              });
            }
          })
          .fail(function (err) {
            if (browser.sessionID) {
              sendStatusToSauceLabs(browser.sessionID, true, function () {
                done(err);
              });
            }
          })
          .done();
      });
    });
  });
});
