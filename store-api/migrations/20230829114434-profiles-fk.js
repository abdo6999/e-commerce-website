'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.addForeignKey('customers', 'profiles', 'profiles_fk', {
    'profile_id': 'id'
  }, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }, callback);
};

exports.down = function(db, callback) {
  db.removeForeignKey('customers', 'profile_fk', callback);
};

exports._meta = {
  "version": 1
};
