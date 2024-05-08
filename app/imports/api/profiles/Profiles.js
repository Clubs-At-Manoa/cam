import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/* Encapsulates state and variable values for this collection. */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      contactEmail: String,
      firstName: String,
      lastName: String,
      bio: String,
      title: String,
      // picture: { type: String, optional: true },
      owner: String,
      interest: {
        type: String,
        allowedValues: ['Academic/Professional', 'Ethnic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'],
        defaultValue: 'Academic/Professional',
      },
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesCollection.
 *   @type {ProfilesCollection}
 */
export const Profiles = new ProfilesCollection();
