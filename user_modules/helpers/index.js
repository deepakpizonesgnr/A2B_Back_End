const _ = require('underscore');

const renderUser = function (user) {
  return _.pick(user, [
    'id',
    'email',
    'name',
    'role',
    'status',
    'first_name',
    'last_name'
  ]);
};

module.exports = {
  renderUser
};
