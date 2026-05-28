Production-safe Firestore rules and admin setup
=============================================

This project includes a production-safe Firestore rules file and a helper script to set an admin claim for a user. Follow these steps to enable secure writes for thresholds.

1) Install Firebase CLI (if not installed):

```bash
npm install -g firebase-tools
```

2) Login and select project:

```bash
firebase login
firebase projects:list
firebase use --add <PROJECT_ID>
```

3) Place your service account JSON in the project root as `service-account.json` (download from Firebase Console > Project Settings > Service accounts).

4) Deploy Firestore rules (this uses `firestore.rules` at project root):

```bash
firebase deploy --only firestore:rules
```

5) Create an admin user by setting the `admin` custom claim for an existing user UID. Run:

```bash
node scripts/set-admin-claim.js <USER_UID>
```

This project stores thresholds in `settings/thresholds` (writable by the dashboard without signing in) and allows device writes to `sensor_readings/*` (so ESP32 devices can post readings). The exact permissions are configured in `firestore.rules`. Be careful: allowing public writes is convenient for development but not recommended for public production systems.

Notes
- The `scripts/set-admin-claim.js` script uses the Admin SDK and must be run from a secure environment (your machine or CI) with access to `service-account.json`.
- For development/testing you can enable Anonymous Auth and relax rules temporarily to `request.auth != null`, but do NOT use fully open rules in production.
