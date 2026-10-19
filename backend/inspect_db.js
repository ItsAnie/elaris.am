require('dotenv').config();
const db = require('./src/config/firebase');

async function inspect() {
  console.log('CONNECTED_PROJECT_ID:', db.projectId || process.env.FIREBASE_PROJECT_ID);

  // 1. Check all collections in the Firestore root
  const collections = await db.listCollections();
  console.log('COLLECTIONS_FOUND:', collections.map(c => c.id).join(', '));

  // 2. Inspect collections defined in backend and any additional found
  const targetCollections = Array.from(new Set([
    'invitations',
    'orders',
    'contact_requests',
    ...collections.map(c => c.id)
  ]));

  for (const colName of targetCollections) {
    const colRef = db.collection(colName);
    const snap = await colRef.get();
    console.log(`\n=== COLLECTION: "${colName}" (Total Documents: ${snap.size}) ===`);

    if (snap.empty) {
      console.log('  (No documents currently in this collection)');
    } else {
      snap.docs.forEach((doc, idx) => {
        const data = doc.data();
        let label = 'N/A';
        if (data.title) {
          label = typeof data.title === 'object' ? (data.title.hy || data.title.en || JSON.stringify(data.title)) : data.title;
        } else if (data.name) {
          label = data.name;
        } else if (data.brideName && data.groomName) {
          label = `${data.brideName} & ${data.groomName}`;
        }
        console.log(`  [${idx + 1}] Document ID: "${doc.id}" | Name/Label: "${label}" | Category/Type: "${data.category || data.eventType || 'N/A'}" | CreatedAt: "${data.createdAt || 'N/A'}"`);
      });
    }
  }

  // 3. Test live write capability
  console.log('\n=== TESTING LIVE WRITE & READ ===');
  const testRef = db.collection('_diagnostic_check').doc('write_test');
  const now = new Date().toISOString();
  await testRef.set({ testedAt: now, status: 'operational' });
  const readBack = await testRef.get();
  console.log('WRITE_STATUS:', readBack.exists ? 'SUCCESS (document written and verified)' : 'FAILED');
  await testRef.delete();
  console.log('CLEANUP_STATUS: SUCCESS (temporary diagnostic test document removed)');
}

inspect().catch(err => {
  console.error('INSPECTION_ERROR:', err);
  process.exit(1);
});
