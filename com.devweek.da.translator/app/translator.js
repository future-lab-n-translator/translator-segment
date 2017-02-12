


da.segment.onpreprocess = function (trigger, args) {
  // Evaluate the launch trigger and args and decide whether to generate a notification.
  console.log('onpreprocess', { trigger: trigger, args: args });
  if (notify) {
    // Collect resources and then start the notification.
    da.startSegment(null, null);
  } else {
    // Cancel the notification.
    da.cancelSegment();
  }
};

da.segment.onstart = function (trigger, args) {
    // Implement the onstart process to generate the notification.

   // Signal that the notification is complete.
    da.stopSegment();
};