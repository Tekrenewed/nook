import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Simulate Resend API call
async function sendEmailNotification(email: string, status: string) {
  console.log(`Sending email to ${email}: Order status is now ${status}`);
  // Implementation for Resend would go here
}

// Push notification via FCM
async function sendPushNotification(token: string, status: string) {
  const payload = {
    notification: {
      title: "Order Update from Nook Burgers",
      body: `Your order is now: ${status}`,
    }
  };
  await admin.messaging().sendToDevice(token, payload);
}

// Triggered when an order document is updated
export const onOrderStatusChanged = functions.firestore
  .document("orders/{orderId}")
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    // Check if status changed
    if (newValue.status !== previousValue.status) {
      const status = newValue.status;
      const email = newValue.email;
      const fcmToken = newValue.fcmToken;

      console.log(`Order ${context.params.orderId} status changed to ${status}`);

      // Order status flow: received -> acknowledged -> started -> done -> ready to collect
      if (email) {
        await sendEmailNotification(email, status);
      }
      
      if (fcmToken) {
        await sendPushNotification(fcmToken, status);
      }
    }
  });
