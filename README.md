# firefox-profile-js

[![Build Status](https://travis-ci.org/saadtazi/firefox-profile-js.png)](https://travis-ci.org/saadtazi/firefox-profile-js)

[![Coverage Status](https://coveralls.io/repos/saadtazi/firefox-profile-js/badge.png)](https://coveralls.io/r/saadtazi/firefox-profile-js)

Firefox Profile for [Selenium WebdriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs),
[admc/wd](https://github.com/admc/wd) or any other library that allows you to set capabilities.

This class allows you to:

* create a firefox profile
* use an existing profile (by specifying path)
* add extensions to your profile,
* specify proxy settings, 
* set the user preferences... 

More info on user preferences [here](http://kb.mozillazine.org/User.js_file).

## Installation

~~"real" npm support is on its way... soon... maybe... Open an issue if you need it...~~ Use npm:

    npm install firefox-profile


## Usage

Make sur you have selenium server running... or use 'selenium-webdriver/remote' class.

### Steps

* create a profile
* modify the profile:
    * setPreference(key, value)
    * addExtension(path/To/Extenstion.xpi) or addExtension(path/To/Unpacked/Extension/)
* create firefox capabilities and set the 'firefox_profile' capability to profile.encoded()
* attach the capabilitites to your webdriver (using withCapabilities)

### I wanna see it!

    ///////////////////////////////////////////////////////////////////
    // with selenium webdriverJs
    // installs firebug 
    // and make http://saadtazi.com the url that is opened on new tabs
    ///////////////////////////////////////////////////////////////////

    var webdriver = require('selenium-webdriver');

    // create profile
    var FirefoxProfile = require('firefox-profile');
    var myProfile = new FirefoxProfile();
    
    // you can add an extension by specifying the path to the xpi file 
    // or to the unzipped extension directory
    myProfile.addExtension('test/extensions/firebug-1.12.4-fx.xpi', function() {
    	
        var capabilities = webdriver.Capabilities.firefox();
        
        // attach your newly created profile
        myProfile.encoded(function(prof) {
            myProfile.encoded(function(encodedProfile) {
                capabilities.set('firefox_profile', encodedProfile);

                // you can set firefox preferences
                myProfile.setPreference('browser.newtab.url', 'http://saadtazi.com');

                // it is required to create or update user.js
                // only needed if you set some preferences
                myProfile.updatePreferences();
                
                // start the browser
                var wd = new webdriver.Builder().
                          withCapabilities(capabilities).
                          build();
                
                // woot!
                wd.get('http://en.wikipedia.org');
            });
            
        });
    });

    ///////////////////////////////////////////////////
    // with admc/wd
    // installs firebug, and make it active by default
    ///////////////////////////////////////////////////
    
    var FirefoxProfile = require('./lib/firefox_profile'),
        wd = require('wd');

    var fp = new FirefoxProfile();
    fp.setPreference('extensions.firebug.allPagesActivation', 'on');
    fp.setPreference('extensions.firebug.console.enableSites', true);
    fp.setPreference('extensions.firebug.defaultPanelName', 'console');
    fp.updatePreferences();
    // you can install multiple extensions at the same time
    fp.addExtensions(['test/extensions/firebug-1.12.4-fx.xpi'], function() {
        fp.encoded(function(zippedProfile) {
            browser = wd.promiseChainRemote();
            browser.init({
              browserName:'firefox',
              // set firefox capabilities
              firefox_profile: zippedProfile
            }).
            // woOot!!
            get('http://en.wikipedia.org');
        });
    });


## API Documentation

The API documentation can be found in [doc/](./doc/).

It can be regenerated using ``grunt docs``.
Requires [apidox](https://github.com/codeactual/apidox) - listed in devDependencies.

## Tests

    mocha
    # or
    grunt mochaTest:test

## Coverage
    
    grunt mochacov

Generates doc/coverage.html

## TODO

* ~~add documentation and comments~~
* ~~write tests~~
* ~~fix bugs~~
* write more tests
* fix more bugs
* clean tmp directory on process 'exit' and 'SIGINT'

## Disclaimer

This class is actually a port of the [python class](https://code.google.com/p/selenium/source/browse/py/selenium/webdriver/firefox/firefox_profile.py).

## Found a bug?

Open a [github issue](https://github.com/saadtazi/firefox-profile-js/issues).