import { PROTOCOL, validHello, readyPacket } from './protocol.mjs';

const $ = id => document.getElementById(id);
const STORAGE_KEY = 'reading-room:synthetic-iframe-probe-v1';
const DATABASE_NAME = 'reading-room:synthetic-iframe-probe-v1';
let knownParent = null;

$('context').textContent = window.top === window.self
  ? 'Opened directly (not embedded)'
  : 'Embedded as an iframe';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DATABASE_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains('synthetic')) {
        req.result.createObjectStore('synthetic');
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'));
  });
}

async function storeSynthetic(action, note) {
  const db = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction('synthetic', action === 'read' ? 'readonly' : 'readwrite');
      const store = tx.objectStore('synthetic');
      const request = action === 'read'
        ? store.get(STORAGE_KEY)
        : store.put({ note, synthetic: true }, STORAGE_KEY);
      if (action === 'read') request.onsuccess = () => resolve(request.result);
      if (action === 'write') tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error ?? new Error('Storage transaction failed'));
      tx.onabort = () => reject(tx.error ?? new Error('Storage transaction aborted'));
    });
  } finally { db.close(); }
}

function storageText(err) {
  return err?.name ? `${err.name}: ${err.message}` : String(err);
}

async function readNote() {
  try {
    const saved = await storeSynthetic('read');
    if (saved?.synthetic === true && typeof saved.note === 'string') {
      $('fakeNote').value = saved.note;
      $('noteStatus').textContent = 'Previous invented note loaded.';
    } else {
      $('noteStatus').textContent = 'No previous invented note yet.';
    }
    $('storageStatus').textContent = 'IndexedDB accessible in this context.';
    return true;
  } catch (err) {
    $('storageStatus').textContent = `IndexedDB unavailable: ${storageText(err)}`;
    $('noteStatus').textContent = 'The browser could not read its storage.';
    return false;
  }
}

$('saveSynthetic').addEventListener('click', async () => {
  const button = $('saveSynthetic');
  const invented = $('fakeNote').value; // capture before any UI repaint
  button.disabled = true;
  try {
    await storeSynthetic('write', invented);
    $('noteStatus').textContent = 'Saved in this iframe’s storage. Close and reopen the bookmarklet to test persistence.';
    $('storageStatus').textContent = 'Read/write succeeded.';
  } catch (err) {
    $('noteStatus').textContent = `Save failed: ${storageText(err)}`;
  } finally { button.disabled = false; }
});
$('reloadSynthetic').addEventListener('click', readNote);

// Cross-origin protocol: no sensitive data flows to the embedding Instagram page.
window.addEventListener('message', async (event) => {
  if (!validHello(event, window.parent)) return;
  knownParent = event.origin;
  $('handshake').textContent = 'Validated bookmarklet handshake; origin checked.';
  const storageOk = await readNote();
  window.parent.postMessage(readyPacket(event.data.challenge, {
    localSyntheticStorage: storageOk,
  }), knownParent);
});

readNote();
