import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubsInterests } from '../../api/clubs/ClubsInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Interests } from '../../api/interests/Interests';

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

function addProfile(profile) {
  try {
    console.log(`Defining profile ${profile.email}`);
    const userID = createUser(profile.email, profile.role);
    Profiles.collection.insert({ ...profile, userId: userID });
    profile.interests.forEach(interest => ProfilesInterests.collection.insert({ profile: profile.email, interest }));
    profile.projects.forEach(project => ProfilesClubs.collection.insert({ profile: profile.email, project }));
  } catch (error) {
    console.error(`Error defining profile for ${profile.email}:`, error);
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

  if (Stuffs.collection.find().count() === 0) {
    console.log('No stuffs found, creating default data for stuffs.');
    Meteor.settings.defaultData?.forEach(data => addData(data));
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
