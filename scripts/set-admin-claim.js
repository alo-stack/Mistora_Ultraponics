#!/usr/bin/env node
const admin = require('firebase-admin')

try {
  const serviceAccount = require('../service-account.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
} catch (err) {
  console.error('Missing or invalid service-account.json in project root. Place your service account JSON as service-account.json')
  process.exit(1)
}

const uid = process.argv[2]
if (!uid) {
  console.error('Usage: node scripts/set-admin-claim.js <USER_UID>')
  process.exit(1)
}

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`Admin claim set for ${uid}`)
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error setting admin claim:', err)
    process.exit(1)
  })
