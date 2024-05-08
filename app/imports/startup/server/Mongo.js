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
function addData(data) {
  try {
    console.log(`Adding: ${data.name} (${data.owner})`);
    Stuffs.collection.insert(data);
  } catch (error) {
    console.error(`Error adding stuff ${data.name}:`, error);
  }
}

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
}

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

// For example, ensure a club with the same name doesn't exist before inserting
function addClub(club) {
  console.log(`Attempting to define club ${club.name}`);
  const exists = Clubs.collection.findOne({ name: club.name });
  if (!exists) {
    try {
      Clubs.collection.insert(club);
      club.interests.forEach(interest => {
        ClubsInterests.collection.insert({ club: club.name, interest });
        addInterest(interest);
      });
      console.log(`Club ${club.name} added successfully.`);
    } catch (error) {
      console.error(`Error inserting club ${club.name}:`, error);
    }
  } else {
    console.log(`Club ${club.name} already exists.`);
  }
}

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    console.log('No users found, creating default profiles and users.');
    Meteor.settings.defaultProfiles?.forEach(profile => addProfile(profile));
  }

  if (Clubs.collection.find().count() === 0) {
    console.log('No clubs found, inserting default clubs.');
    Meteor.settings.defaultClubs.forEach(club => addClub(club));
  }

  if (Meteor.settings.loadAssetsFile && Meteor.users.find().count() < 7) {
    const assetsFileName = 'data.json';
    console.log(`Loading additional data from private/${assetsFileName}`);
    const jsonData = JSON.parse(Assets.getText(assetsFileName));
    jsonData.profiles.forEach(profile => addProfile(profile));
    jsonData.clubs.forEach(club => addClub(club));
  }
});
