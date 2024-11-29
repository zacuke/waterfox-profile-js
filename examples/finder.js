var WaterfoxProfile;
try {
  WaterfoxProfile = require('../lib/waterfox_profile');
} catch(e) {
  WaterfoxProfile = require('waterfox-profile');
}

// var t = new WaterfoxProfile.Finder();
// t.readProfiles(function() {
//   console.log(t.profiles);
//   console.log('>> ', t.getPath('default'));
//   console.log('>> ', t.getPath('test-ext-user'));
// });

WaterfoxProfile.copyFromUserProfile({name: 'test-ext-user'}, function(err, profile) {
  console.log(profile.profileDir);
  // profile.shouldDeleteOnExit(false);
});
