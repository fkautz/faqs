import { Meteor } from 'meteor/meteor';

import {Faqs} from '../imports/api/faqs.js';

Accounts.config({forbidClientAccountCreation: true});

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('faqs.public', function() {
    if (! this.userId) {
        return Faqs.find({visible: true});
    }
    return Faqs.find();
});
