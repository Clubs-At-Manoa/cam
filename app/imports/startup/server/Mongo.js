import { Meteor } from 'meteor/meteor';
// import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profiles/Profiles.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
/**
 * This is the default addData Method
 * const addData = (data) => {
 *   console.log(`  Adding: ${data.name} (${data.owner})`);
 *   Stuffs.collection.insert(data);
 * };
 */
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Profiles.collection.insert(data);
};
/**
 * This is the default Stuffs.collection
 * if (Stuffs.collection.find().count() === 0) {
 *   if (Meteor.settings.defaultData) {
 *     console.log('Creating default data.');
 *     Meteor.settings.defaultData.forEach(data => addData(data));
 *   }
 * }
 */
// Initialize the StuffsCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
