# Nook Burgers Platform

This repository contains the Nook Burgers ordering platform, engineered for a frictionless repeat-customer experience with real-time notifications.

## Stack
- **Frontend**: React + Vite + Vanilla CSS
- **Backend**: Firebase Data Connect / Firestore + Cloud Functions
- **Deployment**: Docker (for local hardware) / Firebase Hosting

## Features Implemented
1. **Click & Collect**: Paid (Stripe to-be-integrated) and Unpaid (Pay on Collection) options.
2. **Promotions**: Automatic 50% discount applied to the first Click & Collect order.
3. **Repeat Customers**: Asks for phone and email only, with the intention of saving it to local storage or Firebase Auth for seamless repeat ordering.
4. **Notifications**: Firebase Cloud Functions are configured to trigger on order status changes (`received`, `acknowledged`, `started`, `done`, `ready to collect`) and send emails (via Resend) or push notifications (via FCM).

## Local Development (Hardware deployment)
Since you are deploying this to your own hardware using containers:

1. **Build and Run the Container**
```bash
docker-compose up --build -d
```
2. The application will be available on port `3000`.

## Kubernetes 
In the future, you can convert the `docker-compose.yml` into Kubernetes manifests using `kompose convert` or by writing custom Deployment and Service YAML files to deploy onto your cluster.

## Firebase Setup
Before deploying to production, ensure you fill in the Firebase configuration values inside `src/firebase/config.ts`.
