import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
 
import { Faqs } from '../api/faqs.js';
 
import './body.html';

const faqs = Meteor.subscribe('faqs.public');
Accounts.config({forbidClientAccountCreation: true});

Template.body.onCreated(function bodyOnCreated() {
    //this.isEditor = new ReactiveVar(false);
    Session.set('isEditor', true);
});

Template.body.helpers({
  unansweredFaqs() {
    return Faqs.find({answer: { $exists: false}});
  },
  answeredFaqs() {
      return Faqs.find({answer: { $exists: true}});
  }
});

Template.body.events({
    'change .editor-mode input'(event, instance) {
        event.preventDefault();
        var isEditor = Session.get('isEditor');
        Session.set('isEditor', !isEditor);
    },
    'submit .new-faq'(event) {
        event.preventDefault();

        const target = event.target;
        const question = target.question.value;

        Meteor.call('faqs.add', {question: question});

        target.question.value = '';
    },
    'submit .new-answer'(event) {
        event.preventDefault();

        const target = event.target;
        const answer = target.answer.value;

        Meteor.call('faqs.answer', {id: this._id, answer: answer});
    },
    'submit .edit-answer'(event) {
        console.log('edit answer');
        event.preventDefault();

        const target = event.target;
        const isVisible = target.isVisible.checked;
        const question = target.question.value;
        const answer = target.answer.value;

        console.log('faq visible:', isVisible);

        Meteor.call('faqs.edit', {id: this._id, visible: isVisible, question: question, answer: answer});
    },
});

Template.body.helpers({
    isEditor() {
        if(Meteor.userId()) {
            return Session.get('isEditor');
        }
        return false;
    },
});

Template.answeredFaq.helpers({
    isEditor() {
        if(Meteor.userId()) {
            return Session.get('isEditor');
        }
        return false;
    },
    isVisible() {
        console.log('isVisible()')
        return 0 === 1;
    }
});

// Template.body.helpers({
//     faqs: [
//       { question: 'This is task 1', answer: 'answer 1' },
//       { question: 'This is task 2', answer: 'answer 2' },
//       { question: 'This is task 3', answer: 'answer 3' },
//     ],
//   });
