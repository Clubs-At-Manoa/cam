import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubsInterests } from '../../api/clubs/ClubsInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Interests } from '../../api/Interests/Interests';

/* eslint-disable no-console */
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Profiles.collection.insert(data);
};

function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
  return userID;
}

function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ contactEmail, firstName, lastName, bio, title, interests, projects, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ contactEmail, firstName, lastName, bio, title, picture, email });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  projects.map(project => ProfilesClubs.collection.insert({ profile: email, project }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

/** Define a new club. Error if club already exists.
function addClub({ name, approvedDate, expirationDate, clubType, purpose, clubManager, contact, interests }) {
  console.log(`Defining club ${name}`);
  Clubs.collection.insert({ name, approvedDate, expirationDate, clubType, purpose, clubManager, contact, interests });
  interests.forEach(interest => ClubsInterests.collection.insert({ project: name, interest }));
  interests.forEach(interest => addInterest(interest));
} */

/** Define an interest.  Has no effect if interest already exists. */
/**
function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
} */

/** Defines a new user and associated profile. Error if user already exists. */
/**
function addProfile({ firstName, lastName, bio, title, interests, projects, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, title, picture, email });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  projects.map(project => ProfilesClubs.collection.insert({ profile: email, project }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
} */

/** Define a new club. Error if club already exists. */
function addClub({ name, approvedDate, expirationDate, clubType, purpose, clubManager, contact, interests }) {
  console.log(`Defining club ${name}`);
  Clubs.collection.insert({ name, approvedDate, expirationDate, clubType, purpose, clubManager, contact, interests });
  interests.forEach(interest => ClubsInterests.collection.insert({ project: name, interest }));
  interests.forEach(interest => addInterest(interest));
}

// Initialize the StuffsCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

/** Initialize DB if it appears to be empty (i.e., no users defined.) */
if (Meteor.users.find().count() === 0) {
  console.log('meteor default');
  if (Meteor.settings.defaultClubs && Meteor.settings.defaultProfiles) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.forEach(profile => addProfile(profile));
    console.log('Creating the default clubs');
    Meteor.settings.defaultClubs.forEach(club => addClub(club));
  } else {
    console.log('Cannot initialize the database! Please invoke Meteor with a settings file.');
  }
}
