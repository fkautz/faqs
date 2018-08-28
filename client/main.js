import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import '../imports/ui/body.js'

// Initial code from:
// https://stackoverflow.com/a/42308842 by https://stackoverflow.com/users/3300480/sudhir
// Adapted for Faqs
// https://creativecommons.org/licenses/by-sa/3.0/

window.addEventListener('message', function (event) {
    // Need to check for safty as we are going to process only our messages
    // So Check whether event with data(which contains any object) contains our message here its "FrameHeight"
    if (event.data == "FrameHeight") {

        //event.source contains parent page window object 
        //which we are going to use to send message back to main page here "abc.com/page"

        //parentSourceWindow = event.source;

        //Calculate the maximum height of the page
        var body = document.body, html = document.documentElement;
        var height = Math.max(body.scrollHeight, body.offsetHeight,
                              html.clientHeight, html.scrollHeight, html.offsetHeight);

        // Send height back to parent page "abc.com/page"
        event.source.postMessage({ "FrameHeight": height }, "*");
        Meteor.setInterval(() =>{
            var body = document.body, html = document.documentElement;
            var height = Math.max(body.scrollHeight, body.offsetHeight,
                                  html.clientHeight, html.scrollHeight, html.offsetHeight);

            // Send height back to parent page "abc.com/page"
            event.source.postMessage({ "FrameHeight": height }, "*");

        }, 100);
    }
});


// Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  // this.counter = new ReactiveVar(0);
// });
// 
// Template.hello.helpers({
  // counter() {
    // return Template.instance().counter.get();
  // },
// });
// 
// Template.hello.events({
  // 'click button'(event, instance) {
    // increment the counter when button is clicked
    // instance.counter.set(instance.counter.get() + 1);
  // },
// });
// 
