// in-memory storage for demo purposes, with simple file-backed persistence for users and credentials
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

// in-memory maps
const users = new Map(); // userId -> { id, username, displayName, password }
const challenges = new Map(); // userId -> challenge (ephemeral)
const credentials = new Map(); // userId -> [ { id, publicKey, rawId, response } ]

// Load persisted data (users and credentials) from db.json if present
function loadFromDisk() {
  try {
    if (!fs.existsSync(DB_PATH)) return;
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.users)) {
      for (const u of parsed.users) {
        if (u && u.id) users.set(u.id, u);
      }
    }
    if (parsed.credentials && typeof parsed.credentials === 'object') {
      for (const [uid, creds] of Object.entries(parsed.credentials)) {
        if (Array.isArray(creds)) credentials.set(uid, creds);
      }
    }
  } catch (e) {
    console.error('Failed to load DB from disk:', e);
  }
}

function persistToDisk() {
  try {
    const data = {
      users: Array.from(users.values()),
      credentials: {},
    };
    for (const [uid, creds] of credentials.entries()) {
      data.credentials[uid] = creds;
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to persist DB to disk:', e);
  }
}

// initialize from disk on module load
loadFromDisk();

export function saveUser(user) {
  // user may include password in this demo implementation
  users.set(user.id, user);
  // persist users to disk so registrations survive server restarts
  try {
    persistToDisk();
  } catch (e) {
    console.error('persist error in saveUser', e);
  }
}

export function getUser(userId) {
  return users.get(userId) || null;
}

export function getUserByUsername(username) {
  for (const user of users.values()) {
    if (user.username === username) return user;
  }
  return null;
}

export function getUserById(userId) {
  return users.get(userId) || null;
}

export function listAllUsers() {
  return Array.from(users.values());
}

export function saveChallenge(userId, challenge) {
  challenges.set(userId, challenge);
}

export function getChallenge(userId) {
  return challenges.get(userId) || null;
}

export function deleteChallenge(userId) {
  challenges.delete(userId);
}

export function saveCredential(userId, cred) {
  const arr = credentials.get(userId) || [];
  arr.push(cred);
  credentials.set(userId, arr);
  // persist credentials to disk
  try {
    persistToDisk();
  } catch (e) {
    console.error('persist error in saveCredential', e);
  }
}

export function getCredentialsForUser(userId) {
  return credentials.get(userId) || [];
}

const storage = { saveUser, getUser, getUserByUsername, getUserById, listAllUsers, saveChallenge, getChallenge, deleteChallenge, saveCredential, getCredentialsForUser };

export default storage;
