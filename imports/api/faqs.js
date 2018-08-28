import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Faqs = new Mongo.Collection('faqs');

Meteor.methods({
    'faqs.add'({question}) {
        check(question, String);
        Faqs.insert({
            question: question,
            createdAt: new Date(),
        });
    },
    'faqs.answer'({id, answer}) {
        check(id, String);
        check(answer, String);
        if(! this.userId) {
            throw new Meteor.Error('answer question unauthorized');
        }
        Faqs.update(id, {
            $set: { 
                visible: true,
                answer: answer,
                createdAt: new Date(),
            },
        });
    },
    'faqs.edit'({id, visible, question, answer}) {
        check(id, String);
        check(visible, Boolean);
        check(question, String);
        check(answer, String);
        if(! this.userId) {
            throw new Meteor.Error('edit question unauthorized');
        }
        if(visible === "") {
            visible = null;
        }
        console.log('visible', visible);
        Faqs.update(id, {
            $set: { 
                visible: visible,
                question: question,
                answer: answer,
                createdAt: new Date(),
            },
        });
    }
});
