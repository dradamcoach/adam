import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig, COACH_EMAIL } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const today = new Date().toDateString();

// ===== الشاشات =====
const loginScreen = document.getElementById('login-screen');
const coachScreen = document.getElementById('coach-screen');
const clientScreen = document.getElementById('client-screen');
const logoutButton = document.getElementById('logout-btn');

function showScreen(screen) {
  [loginScreen, coachScreen, clientScreen].forEach(function (s) {
    s.classList.add('hidden');
  });
  screen.classList.remove('hidden');
  logoutButton.classList.toggle('hidden', screen === loginScreen);
}

// ===== تسجيل الدخول =====
const loginMessage = document.getElementById('login-message');

document.getElementById('login-btn').addEventListener('click', async function () {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  loginMessage.textContent = 'جاري الدخول...';
  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginMessage.textContent = '';
  } catch (error) {
    loginMessage.textContent = 'الإيميل أو الباسورد غلط';
  }
});

logoutButton.addEventListener('click', function () {
  signOut(auth);
});

onAuthStateChanged(auth, function (user) {
  if (!user) {
    showScreen(loginScreen);
  } else if (user.email.toLowerCase() === COACH_EMAIL.toLowerCase()) {
    showScreen(coachScreen);
  } else {
    showScreen(clientScreen);
    loadClientWorkout(user.email.toLowerCase());
  }
});

// ===== شاشة المدرب =====
let coachWorkout = [];
let coachDone = [];
const coachList = document.getElementById('coach-list');
const coachMessage = document.getElementById('coach-message');
const clientEmailInput = document.getElementById('client-email');

function getClientEmail() {
  return clientEmailInput.value.trim().toLowerCase();
}

function showCoachList() {
  coachList.innerHTML = '';
  coachWorkout.forEach(function (exercise, index) {
    const item = document.createElement('li');
    item.textContent = exercise.name + (coachDone.includes(index) ? ' ✓' : '');

    const details = document.createElement('span');
    details.textContent = exercise.sets + ' × ' + exercise.reps + ' ';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✕';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function () {
      coachWorkout.splice(index, 1);
      coachDone = [];
      showCoachList();
    });

    details.appendChild(deleteButton);
    item.appendChild(details);
    coachList.appendChild(item);
  });
}

document.getElementById('load-btn').addEventListener('click', async function () {
  const email = getClientEmail();
  if (!email) {
    coachMessage.textContent = 'اكتب إيميل العميل الأول';
    return;
  }
  coachMessage.textContent = 'جاري التحميل...';
  try {
    const workoutDoc = await getDoc(doc(db, 'workouts', email));
    const progressDoc = await getDoc(doc(db, 'progress', email));
    coachWorkout = workoutDoc.exists() ? workoutDoc.data().exercises : [];
    coachDone = (progressDoc.exists() && progressDoc.data().date === today) ? progressDoc.data().done : [];
    showCoachList();
    coachMessage.textContent = coachWorkout.length ? 'علامة ✓ = خلّصه النهارده' : 'مفيش برنامج للعميل ده لسه، ضيف تمارين';
  } catch (error) {
    coachMessage.textContent = 'حصلت مشكلة: ' + error.message;
  }
});

document.getElementById('add-btn').addEventListener('click', function () {
  const nameInput = document.getElementById('ex-name');
  const setsInput = document.getElementById('ex-sets');
  const repsInput = document.getElementById('ex-reps');

  if (!nameInput.value.trim() || !setsInput.value || !repsInput.value.trim()) {
    coachMessage.textContent = 'كمّل بيانات التمرين';
    return;
  }

  coachWorkout.push({
    name: nameInput.value.trim(),
    sets: Number(setsInput.value),
    reps: repsInput.value.trim()
  });

  nameInput.value = '';
  setsInput.value = '';
  repsInput.value = '';
  coachMessage.textContent = '';
  showCoachList();
});

document.getElementById('save-btn').addEventListener('click', async function () {
  const email = getClientEmail();
  if (!email) {
    coachMessage.textContent = 'اكتب إيميل العميل الأول';
    return;
  }
  coachMessage.textContent = 'جاري الحفظ...';
  try {
    await setDoc(doc(db, 'workouts', email), { exercises: coachWorkout });
    coachMessage.textContent = 'اتحفظ البرنامج ✅';
  } catch (error) {
    coachMessage.textContent = 'حصلت مشكلة: ' + error.message;
  }
});

// ===== شاشة العميل =====
let workout = [];
let clientEmail = '';
const list = document.getElementById('list');
const progress = document.getElementById('progress');
const finishButton = document.getElementById('finish');
const resetButton = document.getElementById('reset');

async function loadClientWorkout(email) {
  clientEmail = email;
  list.innerHTML = '';
  progress.textContent = 'جاري التحميل...';
  try {
    const workoutDoc = await getDoc(doc(db, 'workouts', email));
    const progressDoc = await getDoc(doc(db, 'progress', email));
    workout = workoutDoc.exists() ? workoutDoc.data().exercises : [];
    const saved = (progressDoc.exists() && progressDoc.data().date === today) ? progressDoc.data().done : [];
    showWorkout(saved);
  } catch (error) {
    progress.textContent = 'حصلت مشكلة: ' + error.message;
  }
}

function countDone() {
  return document.querySelectorAll('#list li.done').length;
}

function updateProgress() {
  if (workout.length === 0) {
    progress.textContent = 'المدرب لسه ما حطش برنامجك';
    return;
  }
  progress.textContent = countDone() + ' من ' + workout.length + ' تمارين';
}

function saveProgress() {
  const done = [];
  document.querySelectorAll('#list li').forEach(function (item, index) {
    if (item.classList.contains('done')) {
      done.push(index);
    }
  });
  setDoc(doc(db, 'progress', clientEmail), { date: today, done: done });
}

function showWorkout(saved) {
  workout.forEach(function (exercise, index) {
    const item = document.createElement('li');
    item.textContent = exercise.name;

    const details = document.createElement('span');
    details.textContent = exercise.sets + ' × ' + exercise.reps;
    item.appendChild(details);

    if (saved.includes(index)) {
      item.classList.add('done');
    }

    item.addEventListener('click', function () {
      item.classList.toggle('done');
      updateProgress();
      saveProgress();
      finishButton.textContent = 'إنهاء التمرين';
    });

    list.appendChild(item);
  });

  updateProgress();
}

finishButton.addEventListener('click', function () {
  const left = workout.length - countDone();
  if (left === 0) {
    finishButton.textContent = 'أحسنت يا بطل 💪';
  } else {
    finishButton.textContent = 'لسه باقي ' + left + ' تمارين';
  }
});

resetButton.addEventListener('click', function () {
  document.querySelectorAll('#list li').forEach(function (item) {
    item.classList.remove('done');
  });
  updateProgress();
  saveProgress();
  finishButton.textContent = 'إنهاء التمرين';
});