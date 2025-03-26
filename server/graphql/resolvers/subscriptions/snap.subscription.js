const { withFilter } = require("apollo-server");

module.exports = {
  snapAdded: {
    subscribe: withFilter(
      (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("SNAP_ADDED");
      },
      (payload, variables) => {
        return variables.userId ? String(payload.snapAdded.user_id) === variables.userId : true;
      }
    ),
  },
};
