import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubsInterests } from '../../api/clubs/ClubsInterests';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

/** Define a publication to publish all interests. */
if (Interests && Interests.userPublicationName && Interests.collection) {
  Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());
} else {
  console.error('Error publishing Interests: missing data');
}

/** Define a publication to publish all profiles. */
if (Profiles && Profiles.userPublicationName && Profiles.collection) {
  Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());
} else {
  console.error('Error publishing Profiles: missing data');
}

/** Define a publication to publish this collection. */
if (ProfilesInterests && ProfilesInterests.userPublicationName && ProfilesInterests.collection) {
  Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());
} else {
  console.error('Error publishing ProfilesInterests: missing data');
}

/** Define a publication to publish this collection. */
if (ProfilesClubs && ProfilesClubs.userPublicationName && ProfilesClubs.collection) {
  Meteor.publish(ProfilesClubs.userPublicationName, () => ProfilesClubs.collection.find());
} else {
  console.error('Error publishing ProfilesClubs: missing data');
}

/** Define a publication to publish all projects. */
if (Clubs && Clubs.userPublicationName && Clubs.collection) {
  Meteor.publish(Clubs.userPublicationName, () => Clubs.collection.find());
} else {
  console.error('Error publishing Clubs: missing data');
}

/** Define a publication to publish this collection. */
if (ClubsInterests && ClubsInterests.userPublicationName && ClubsInterests.collection) {
  Meteor.publish(ClubsInterests.userPublicationName, () => ClubsInterests.collection.find());
} else {
  console.error('Error publishing ProjectsInterests: missing data');
}

