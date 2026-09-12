import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig, COACH_EMAIL } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const LIBRARY_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
const MAX_SOURCE_BYTES = 12 * 1024 * 1024;   // أقصى حجم للصورة الأصلية قبل الضغط
const MAX_STORED_BYTES = 700 * 1024;         // أقصى حجم بعد الضغط (حد Firestore مليون بايت)
const IMAGE_MAX_SIDE = 520;                  // أطول ضلع للصورة بعد التصغير

/* ============================ اللغة ============================ */

const TEXT = {
  ar: {
    tagline: 'منصة التدريب والتأهيل والتغذية',
    login_title: 'تسجيل الدخول',
    login_btn: 'دخول',
    email: 'الإيميل',
    password: 'الباسورد',
    logging_in: 'جاري الدخول...',
    bad_login: 'الإيميل أو الباسورد غلط',
    logout: 'تسجيل الخروج',

    my_clients: 'عملائي',
    client_name: 'اسم العميل',
    client_email: 'إيميله',
    add_client: '+ إضافة عميل',
    loading: 'جاري التحميل...',
    no_clients: 'مفيش عملاء لسه، ضيف عميل تحت',
    need_name_email: 'اكتب الاسم والإيميل',
    adding: 'جاري الإضافة...',
    no_activity: 'مفيش نشاط النهاردة',
    done_count: 'خلّص {n} تمارين النهاردة',

    back_clients: '‹ رجوع لقائمة العملاء',
    back_program: '‹ رجوع للبرنامج',
    program_of: 'برنامج {name}',
    day_title: 'اسم اليوم (صدر وترايسبس)',
    rest_day: 'يوم راحة',
    open_library: '📚 اختر من مكتبة التمارين',
    open_mylib: '⭐ مكتبتي الخاصة',
    or_manual: 'أو اكتب التمرين بنفسك',
    ex_name: 'اسم التمرين',
    ex_sets: 'مجموعات',
    ex_reps: 'تكرار',
    add_ex: '+ إضافة تمرين',
    save_program: 'حفظ البرنامج',
    fill_ex: 'كمّل بيانات التمرين',
    saving: 'جاري الحفظ...',
    saved: 'اتحفظ البرنامج ✅',
    problem: 'حصلت مشكلة: ',

    library_title: 'مكتبة التمارين',
    search_ex: 'ابحث عن تمرين...',
    all_muscles: 'كل العضلات',
    all_equipment: 'كل الأدوات',
    loading_library: 'جاري تحميل المكتبة...',
    library_failed: 'مش قادر أحمّل المكتبة، اتأكد من النت',
    no_matches: 'مفيش تمارين بالمواصفات دي',
    showing: 'بيعرض {a} من {b} — ضيّق البحث',
    count_ex: '{n} تمرين',
    added_ex: 'اتضاف: {name} — عدّل المجموعات والتكرار لو تحب',

    mylib_title: 'مكتبتي الخاصة',
    mylib_hint: 'التمارين اللي بتضيفها هنا بتفضل محفوظة ليك',
    add_new_ex: 'إضافة تمرين جديد',
    ex_notes: 'ملاحظات (اختياري)',
    save_to_mylib: '+ حفظ في مكتبتي',
    mylib_empty: 'مكتبتك فاضية — ضيف أول تمرين تحت',
    need_ex_name: 'اكتب اسم التمرين',
    mylib_saved: 'اتحفظ في مكتبتك ✅',
    confirm_delete: 'تمسح التمرين ده من مكتبتك؟',
    choose_image: '🖼️ اختر صورة (اختياري)',
    image_chosen: '🖼️ تغيير الصورة',
    image_too_big: 'الصورة كبيرة، اختار واحدة أصغر من 3 ميجا',
    preparing_image: 'جاري تجهيز الصورة...',
    image_failed: 'مش قادر أقرا الصورة دي، جرب صورة تانية',

    today_workout: 'تمرين اليوم',
    finish_workout: 'إنهاء التمرين',
    start_over: 'ابدأ من جديد',
    rest_msg: 'يوم راحة 😌',
    no_plan: 'مفيش برنامج لليوم ده',
    day_plan: 'برنامج يوم {day}',
    of_exercises: '{a} من {b} تمارين',
    well_done: 'أحسنت يا بطل 💪',
    remaining: 'لسه باقي {n} تمارين',

    days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    days_short: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
  },

  en: {
    tagline: 'Training, Rehab & Nutrition Platform',
    login_title: 'Sign In',
    login_btn: 'Sign in',
    email: 'Email',
    password: 'Password',
    logging_in: 'Signing in...',
    bad_login: 'Wrong email or password',
    logout: 'Sign out',

    my_clients: 'My Clients',
    client_name: 'Client name',
    client_email: 'Their email',
    add_client: '+ Add client',
    loading: 'Loading...',
    no_clients: 'No clients yet — add one below',
    need_name_email: 'Enter name and email',
    adding: 'Adding...',
    no_activity: 'No activity today',
    done_count: 'Completed {n} exercises today',

    back_clients: '‹ Back to clients',
    back_program: '‹ Back to program',
    program_of: "{name}'s program",
    day_title: 'Day name (Chest & Triceps)',
    rest_day: 'Rest day',
    open_library: '📚 Pick from exercise library',
    open_mylib: '⭐ My own library',
    or_manual: 'Or type the exercise yourself',
    ex_name: 'Exercise name',
    ex_sets: 'Sets',
    ex_reps: 'Reps',
    add_ex: '+ Add exercise',
    save_program: 'Save program',
    fill_ex: 'Fill in the exercise details',
    saving: 'Saving...',
    saved: 'Program saved ✅',
    problem: 'Something went wrong: ',

    library_title: 'Exercise Library',
    search_ex: 'Search exercises...',
    all_muscles: 'All muscles',
    all_equipment: 'All equipment',
    loading_library: 'Loading library...',
    library_failed: "Couldn't load the library — check your connection",
    no_matches: 'No exercises match these filters',
    showing: 'Showing {a} of {b} — narrow your search',
    count_ex: '{n} exercises',
    added_ex: 'Added: {name} — adjust sets and reps if you like',

    mylib_title: 'My Own Library',
    mylib_hint: 'Exercises you add here stay saved for you',
    add_new_ex: 'Add a new exercise',
    ex_notes: 'Notes (optional)',
    save_to_mylib: '+ Save to my library',
    mylib_empty: 'Your library is empty — add your first exercise below',
    need_ex_name: 'Enter the exercise name',
    mylib_saved: 'Saved to your library ✅',
    confirm_delete: 'Delete this exercise from your library?',
    choose_image: '🖼️ Choose an image (optional)',
    image_chosen: '🖼️ Change image',
    image_too_big: 'Image is too large — pick one under 3 MB',
    preparing_image: 'Preparing image...',
    image_failed: "Couldn't read that image — try another one",

    today_workout: "Today's Workout",
    finish_workout: 'Finish workout',
    start_over: 'Start over',
    rest_msg: 'Rest day 😌',
    no_plan: 'No program for this day',
    day_plan: '{day} program',
    of_exercises: '{a} of {b} exercises',
    well_done: 'Well done, champ 💪',
    remaining: '{n} exercises left',

    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    days_short: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  }
};

const MUSCLES = {
  'abdominals':  { ar: 'البطن',          en: 'Abdominals' },
  'abductors':   { ar: 'المبعدة',        en: 'Abductors' },
  'adductors':   { ar: 'المقربة',        en: 'Adductors' },
  'biceps':      { ar: 'البايسبس',       en: 'Biceps' },
  'calves':      { ar: 'السمانة',        en: 'Calves' },
  'chest':       { ar: 'الصدر',          en: 'Chest' },
  'forearms':    { ar: 'الساعد',         en: 'Forearms' },
  'glutes':      { ar: 'الألوية',        en: 'Glutes' },
  'hamstrings':  { ar: 'أوتار الركبة',   en: 'Hamstrings' },
  'lats':        { ar: 'الظهر العريضة',  en: 'Lats' },
  'lower back':  { ar: 'أسفل الظهر',     en: 'Lower back' },
  'middle back': { ar: 'وسط الظهر',      en: 'Middle back' },
  'neck':        { ar: 'الرقبة',         en: 'Neck' },
  'quadriceps':  { ar: 'الفخذ الأمامي',  en: 'Quadriceps' },
  'shoulders':   { ar: 'الكتف',          en: 'Shoulders' },
  'traps':       { ar: 'الترابيس',       en: 'Traps' },
  'triceps':     { ar: 'الترايسبس',      en: 'Triceps' }
};

const EQUIPMENT = {
  'body only':      { ar: 'وزن الجسم',      en: 'Bodyweight' },
  'dumbbell':       { ar: 'دمبل',           en: 'Dumbbell' },
  'barbell':        { ar: 'بار',            en: 'Barbell' },
  'bands':          { ar: 'أستك مقاومة',    en: 'Bands' },
  'machine':        { ar: 'جهاز',           en: 'Machine' },
  'cable':          { ar: 'كابل',           en: 'Cable' },
  'kettlebells':    { ar: 'كيتل بيل',       en: 'Kettlebell' },
  'medicine ball':  { ar: 'كرة طبية',       en: 'Medicine ball' },
  'exercise ball':  { ar: 'كرة سويسرية',    en: 'Exercise ball' },
  'foam roll':      { ar: 'فوم رول',        en: 'Foam roller' },
  'e-z curl bar':   { ar: 'بار متعرج',      en: 'EZ curl bar' },
  'other':          { ar: 'أخرى',           en: 'Other' }
};

let lang = localStorage.getItem('adam-lang') || 'ar';

function t(key) {
  return (TEXT[lang] && TEXT[lang][key]) || key;
}

function fill(key, values) {
  let out = t(key);
  Object.keys(values).forEach(function (name) {
    out = out.replace('{' + name + '}', values[name]);
  });
  return out;
}

function muscleName(key) {
  return (MUSCLES[key] && MUSCLES[key][lang]) || key || '';
}

function equipName(key) {
  return (EQUIPMENT[key] && EQUIPMENT[key][lang]) || key || t('all_equipment');
}

function days() {
  return TEXT[lang].days;
}

function daysShort() {
  return TEXT[lang].days_short;
}

const langButton = document.getElementById('lang-btn');

function applyLanguage() {
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  langButton.textContent = (lang === 'ar') ? 'EN' : 'ع';

  document.querySelectorAll('[data-t]').forEach(function (node) {
    node.textContent = t(node.getAttribute('data-t'));
  });

  document.querySelectorAll('[data-t-ph]').forEach(function (node) {
    node.placeholder = t(node.getAttribute('data-t-ph'));
  });

  refreshAll();
}

langButton.addEventListener('click', function () {
  lang = (lang === 'ar') ? 'en' : 'ar';
  localStorage.setItem('adam-lang', lang);
  applyLanguage();
});

function refreshAll() {
  if (!coachScreen.classList.contains('hidden')) showCoachDay();
  if (!clientScreen.classList.contains('hidden')) showClientDay();
  if (!clientsScreen.classList.contains('hidden')) loadClients();
  if (!libraryScreen.classList.contains('hidden')) {
    rebuildLibraryFilters();
    renderLibrary();
  }
  if (!mylibScreen.classList.contains('hidden')) {
    fillMyLibSelects();
    renderMyLib();
  }
}

/* ============================ عام ============================ */

const today = new Date().toDateString();
const todayIndex = (new Date().getDay() + 1) % 7;

const loginScreen = document.getElementById('login-screen');
const clientsScreen = document.getElementById('clients-screen');
const coachScreen = document.getElementById('coach-screen');
const libraryScreen = document.getElementById('library-screen');
const mylibScreen = document.getElementById('mylib-screen');
const clientScreen = document.getElementById('client-screen');
const logoutButton = document.getElementById('logout-btn');

function showScreen(screen) {
  [loginScreen, clientsScreen, coachScreen, libraryScreen, mylibScreen, clientScreen].forEach(function (s) {
    s.classList.add('hidden');
  });
  screen.classList.remove('hidden');
  logoutButton.classList.toggle('hidden', screen === loginScreen);
  window.scrollTo(0, 0);
}

function emptyWeek() {
  return [0, 1, 2, 3, 4, 5, 6].map(function () {
    return { title: '', rest: false, exercises: [] };
  });
}

showScreen(loginScreen);

/* ============================ الدخول ============================ */

const loginMessage = document.getElementById('login-message');

document.getElementById('login-btn').addEventListener('click', async function () {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  loginMessage.textContent = t('logging_in');
  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginMessage.textContent = '';
  } catch (error) {
    loginMessage.textContent = t('bad_login');
  }
});

logoutButton.addEventListener('click', function () {
  signOut(auth);
});

onAuthStateChanged(auth, function (user) {
  if (!user) {
    showScreen(loginScreen);
  } else if (user.email.toLowerCase() === COACH_EMAIL.toLowerCase()) {
    showScreen(clientsScreen);
    loadClients();
  } else {
    showScreen(clientScreen);
    loadClient(user.email.toLowerCase());
  }
});

/* ============================ العملاء ============================ */

const clientsList = document.getElementById('clients-list');
const clientsMessage = document.getElementById('clients-message');

async function loadClients() {
  clientsList.innerHTML = '';
  clientsMessage.textContent = t('loading');
  try {
    const snapshot = await getDocs(collection(db, 'clients'));
    if (snapshot.empty) {
      clientsMessage.textContent = t('no_clients');
      return;
    }
    clientsMessage.textContent = '';
    for (const clientDoc of snapshot.docs) {
      await showClientRow(clientDoc.id, clientDoc.data().name);
    }
  } catch (error) {
    clientsMessage.textContent = t('problem') + error.message;
  }
}

async function showClientRow(email, name) {
  const item = document.createElement('li');

  const nameLine = document.createElement('div');
  nameLine.className = 'client-name';
  nameLine.textContent = name;

  const emailLine = document.createElement('div');
  emailLine.className = 'client-email';
  emailLine.textContent = email;

  const status = document.createElement('div');
  status.className = 'client-status none';
  status.textContent = t('no_activity');

  item.appendChild(nameLine);
  item.appendChild(emailLine);
  item.appendChild(status);

  item.addEventListener('click', function () {
    openCoachScreen(email, name);
  });

  clientsList.appendChild(item);

  try {
    const progressDoc = await getDoc(doc(db, 'progress', email));
    if (progressDoc.exists() && progressDoc.data().date === today) {
      status.textContent = fill('done_count', { n: progressDoc.data().done.length });
      status.classList.remove('none');
    }
  } catch (error) {
    // مش مشكلة
  }
}

document.getElementById('add-client-btn').addEventListener('click', async function () {
  const nameInput = document.getElementById('new-name');
  const emailInput = document.getElementById('new-email');
  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();

  if (!name || !email) {
    clientsMessage.textContent = t('need_name_email');
    return;
  }

  clientsMessage.textContent = t('adding');
  try {
    await setDoc(doc(db, 'clients', email), { name: name });
    nameInput.value = '';
    emailInput.value = '';
    await loadClients();
  } catch (error) {
    clientsMessage.textContent = t('problem') + error.message;
  }
});

/* ============================ شاشة المدرب ============================ */

let coachWeek = emptyWeek();
let coachDay = todayIndex;
let currentClient = '';
let currentClientName = '';

const coachTitle = document.getElementById('coach-title');
const coachList = document.getElementById('coach-list');
const coachMessage = document.getElementById('coach-message');
const dayTitle = document.getElementById('day-title');
const restCheckbox = document.getElementById('rest-day');

document.getElementById('back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

async function openCoachScreen(email, name) {
  currentClient = email;
  currentClientName = name;
  coachTitle.textContent = fill('program_of', { name: name });
  coachMessage.textContent = t('loading');
  showScreen(coachScreen);
  try {
    const snapshot = await getDoc(doc(db, 'workouts', email));
    coachWeek = (snapshot.exists() && snapshot.data().week) ? snapshot.data().week : emptyWeek();
    coachDay = todayIndex;
    showCoachDay();
    coachMessage.textContent = '';
  } catch (error) {
    coachMessage.textContent = t('problem') + error.message;
  }
}

/* ---------- circular day dial ---------- */

const DIAL_RADIUS = 98;
const DIAL_RADIUS_SMALL = 88;

function dialRadius() {
  return window.innerWidth <= 380 ? DIAL_RADIUS_SMALL : DIAL_RADIUS;
}

/*
 * Lays out 7 day buttons evenly around a circle and rotates the whole
 * ring so the selected day swings up to the top. Each label counter-
 * rotates by the same total amount so the text always reads upright.
 */
function renderDial(ringId, dayNameId, subId, week, selected, onPick) {
  const ring = document.getElementById(ringId);
  const step = 360 / 7;
  const ringRotation = -selected * step;
  const radius = dialRadius();

  ring.innerHTML = '';
  ring.style.transform = 'rotate(' + ringRotation + 'deg)';

  daysShort().forEach(function (name, index) {
    const angle = index * step;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'dial-day';
    if (index === selected) button.classList.add('active');
    if (week[index].exercises.length || week[index].rest) {
      button.classList.add('has-plan');
    }

    button.style.transform =
      'rotate(' + angle + 'deg) translateY(-' + radius + 'px)';

    const label = document.createElement('span');
    label.textContent = name;
    // undo the ring rotation and this day's own rotation
    label.style.transform = 'rotate(' + (-(angle + ringRotation)) + 'deg)';
    button.appendChild(label);

    button.addEventListener('click', function () {
      onPick(index);
    });

    ring.appendChild(button);
  });

  const day = week[selected];
  document.getElementById(dayNameId).textContent = day.title || days()[selected];

  const sub = document.getElementById(subId);
  if (day.rest) {
    sub.textContent = t('rest_msg');
    sub.classList.add('rest');
  } else {
    sub.classList.remove('rest');
    sub.textContent = day.exercises.length
      ? fill('count_ex', { n: day.exercises.length })
      : t('no_plan');
  }
}

function showCoachDays() {
  renderDial('coach-ring', 'coach-dc-day', 'coach-dc-sub', coachWeek, coachDay, function (index) {
    saveCurrentDay();
    coachDay = index;
    showCoachDay();
  });
}

function saveCurrentDay() {
  coachWeek[coachDay].title = dayTitle.value.trim();
  coachWeek[coachDay].rest = restCheckbox.checked;
}

function thumbSrc(exercise) {
  if (exercise.imageUrl) return exercise.imageUrl;
  if (exercise.image) return IMAGE_BASE + exercise.image;
  return '';
}

function exerciseRow(exercise) {
  const left = document.createElement('div');
  left.className = 'lib-item';

  const src = thumbSrc(exercise);
  if (src) {
    const thumb = document.createElement('img');
    thumb.className = 'lib-thumb';
    thumb.src = src;
    thumb.alt = '';
    thumb.addEventListener('error', function () {
      thumb.remove();
    });
    left.appendChild(thumb);
  }

  const label = document.createElement('div');
  label.textContent = exercise.name;
  left.appendChild(label);

  return left;
}

function showCoachDay() {
  if (coachTitle && currentClientName) {
    coachTitle.textContent = fill('program_of', { name: currentClientName });
  }

  const day = coachWeek[coachDay];
  dayTitle.value = day.title;
  restCheckbox.checked = day.rest;

  coachList.innerHTML = '';
  day.exercises.forEach(function (exercise, index) {
    const item = document.createElement('li');
    item.appendChild(exerciseRow(exercise));

    const details = document.createElement('span');
    details.textContent = exercise.sets + ' × ' + exercise.reps + ' ';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✕';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function () {
      day.exercises.splice(index, 1);
      showCoachDay();
    });

    details.appendChild(deleteButton);
    item.appendChild(details);
    coachList.appendChild(item);
  });

  showCoachDays();
}

document.getElementById('add-btn').addEventListener('click', function () {
  const nameInput = document.getElementById('ex-name');
  const setsInput = document.getElementById('ex-sets');
  const repsInput = document.getElementById('ex-reps');

  if (!nameInput.value.trim() || !setsInput.value || !repsInput.value.trim()) {
    coachMessage.textContent = t('fill_ex');
    return;
  }

  coachWeek[coachDay].exercises.push({
    name: nameInput.value.trim(),
    sets: Number(setsInput.value),
    reps: repsInput.value.trim(),
    image: '',
    imageUrl: ''
  });

  nameInput.value = '';
  setsInput.value = '';
  repsInput.value = '';
  coachMessage.textContent = '';
  showCoachDay();
});

document.getElementById('save-btn').addEventListener('click', async function () {
  saveCurrentDay();
  coachMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'workouts', currentClient), { week: coachWeek });
    coachMessage.textContent = t('saved');
  } catch (error) {
    coachMessage.textContent = t('problem') + error.message;
  }
});

/* ============================ المكتبة الجاهزة ============================ */

let libraryData = null;

const libSearch = document.getElementById('lib-search');
const libMuscle = document.getElementById('lib-muscle');
const libEquip = document.getElementById('lib-equip');
const libGrid = document.getElementById('lib-grid');
const libMessage = document.getElementById('lib-message');

document.getElementById('open-library-btn').addEventListener('click', function () {
  saveCurrentDay();
  showScreen(libraryScreen);
  loadLibrary();
});

document.getElementById('lib-back-btn').addEventListener('click', function () {
  showScreen(coachScreen);
  showCoachDay();
});

async function loadLibrary() {
  if (libraryData) {
    rebuildLibraryFilters();
    renderLibrary();
    return;
  }
  libMessage.textContent = t('loading_library');
  libGrid.innerHTML = '';
  try {
    const response = await fetch(LIBRARY_URL);
    libraryData = await response.json();
    rebuildLibraryFilters();
    libMessage.textContent = '';
    renderLibrary();
  } catch (error) {
    libMessage.textContent = t('library_failed');
  }
}

function rebuildLibraryFilters() {
  if (!libraryData) return;

  const keepMuscle = libMuscle.value;
  const keepEquip = libEquip.value;

  const muscles = [];
  const equipment = [];

  libraryData.forEach(function (exercise) {
    exercise.primaryMuscles.forEach(function (muscle) {
      if (muscles.indexOf(muscle) === -1) muscles.push(muscle);
    });
    if (exercise.equipment && equipment.indexOf(exercise.equipment) === -1) {
      equipment.push(exercise.equipment);
    }
  });

  libMuscle.innerHTML = '';
  libEquip.innerHTML = '';

  const anyMuscle = document.createElement('option');
  anyMuscle.value = '';
  anyMuscle.textContent = t('all_muscles');
  libMuscle.appendChild(anyMuscle);

  const anyEquip = document.createElement('option');
  anyEquip.value = '';
  anyEquip.textContent = t('all_equipment');
  libEquip.appendChild(anyEquip);

  muscles.sort().forEach(function (muscle) {
    const option = document.createElement('option');
    option.value = muscle;
    option.textContent = muscleName(muscle);
    libMuscle.appendChild(option);
  });

  equipment.sort().forEach(function (item) {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = equipName(item);
    libEquip.appendChild(option);
  });

  libMuscle.value = keepMuscle;
  libEquip.value = keepEquip;
}

function renderLibrary() {
  if (!libraryData) return;

  const term = libSearch.value.trim().toLowerCase();
  const muscle = libMuscle.value;
  const equip = libEquip.value;

  const matches = libraryData.filter(function (exercise) {
    if (muscle && exercise.primaryMuscles.indexOf(muscle) === -1) return false;
    if (equip && exercise.equipment !== equip) return false;
    if (term && exercise.name.toLowerCase().indexOf(term) === -1) return false;
    return true;
  });

  libGrid.innerHTML = '';
  const shown = matches.slice(0, 60);

  shown.forEach(function (exercise) {
    const card = document.createElement('div');
    card.className = 'ex-card';

    if (exercise.images && exercise.images.length) {
      const image = document.createElement('img');
      image.src = IMAGE_BASE + exercise.images[0];
      image.alt = '';
      image.loading = 'lazy';
      card.appendChild(image);
    }

    const body = document.createElement('div');
    body.className = 'ex-body';

    const name = document.createElement('div');
    name.className = 'ex-name';
    name.textContent = exercise.name;

    const meta = document.createElement('div');
    meta.className = 'ex-meta';
    meta.textContent = exercise.primaryMuscles.map(muscleName).join('، ') + ' · ' + equipName(exercise.equipment);

    body.appendChild(name);
    body.appendChild(meta);
    card.appendChild(body);

    card.addEventListener('click', function () {
      addToDay({
        name: exercise.name,
        sets: 3,
        reps: '12',
        image: (exercise.images && exercise.images.length) ? exercise.images[0] : '',
        imageUrl: ''
      });
    });

    libGrid.appendChild(card);
  });

  if (matches.length === 0) {
    libMessage.textContent = t('no_matches');
  } else if (matches.length > shown.length) {
    libMessage.textContent = fill('showing', { a: shown.length, b: matches.length });
  } else {
    libMessage.textContent = fill('count_ex', { n: matches.length });
  }
}

libSearch.addEventListener('input', renderLibrary);
libMuscle.addEventListener('change', renderLibrary);
libEquip.addEventListener('change', renderLibrary);

function addToDay(exercise) {
  coachWeek[coachDay].exercises.push(exercise);
  showScreen(coachScreen);
  showCoachDay();
  coachMessage.textContent = fill('added_ex', { name: exercise.name });
}

/* ---------- ضغط الصور داخل المتصفح ----------
 * Firebase Storage بقت محتاجة خطة مدفوعة، فبدل ما نرفع الصورة لسيرفر
 * منفصل، بنصغّرها ونضغطها هنا وبنخزّنها كنص داخل Firestore مباشرة.
 * الصورة بتطلع حوالي 30-60 كيلوبايت، والحد الأقصى للمستند مليون بايت.
 */
function compressImage(file, maxSide, quality) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    reader.onerror = function () {
      reject(new Error('read failed'));
    };

    reader.onload = function () {
      const image = new Image();

      image.onerror = function () {
        reject(new Error('decode failed'));
      };

      image.onload = function () {
        let width = image.width;
        let height = image.height;

        if (width >= height && width > maxSide) {
          height = Math.round(height * maxSide / width);
          width = maxSide;
        } else if (height > maxSide) {
          width = Math.round(width * maxSide / height);
          height = maxSide;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        context.fillStyle = '#0e1729';
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        let result = canvas.toDataURL('image/jpeg', quality);

        // لو لسه كبيرة، نقلل الجودة تدريجيًا
        let attempt = quality;
        while (result.length > MAX_STORED_BYTES && attempt > 0.3) {
          attempt = attempt - 0.12;
          result = canvas.toDataURL('image/jpeg', attempt);
        }

        resolve(result);
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

/* ============================ مكتبتي الخاصة ============================ */

let myLibData = [];
let pickedImage = '';

const myLibList = document.getElementById('mylib-list');
const myLibMessage = document.getElementById('mylib-message');
const myName = document.getElementById('my-name');
const myMuscle = document.getElementById('my-muscle');
const myEquip = document.getElementById('my-equip');
const myNotes = document.getElementById('my-notes');
const myFile = document.getElementById('my-file');
const myFileLabel = document.querySelector('#my-file-label span');
const myPreviewBox = document.getElementById('my-preview-box');
const myPreview = document.getElementById('my-preview');

document.getElementById('open-mylib-btn').addEventListener('click', function () {
  saveCurrentDay();
  showScreen(mylibScreen);
  fillMyLibSelects();
  loadMyLib();
});

document.getElementById('mylib-back-btn').addEventListener('click', function () {
  showScreen(coachScreen);
  showCoachDay();
});

myFile.addEventListener('change', async function () {
  const file = myFile.files[0];
  if (!file) return;

  if (file.size > MAX_SOURCE_BYTES) {
    myLibMessage.textContent = t('image_too_big');
    myFile.value = '';
    return;
  }

  myLibMessage.textContent = t('preparing_image');
  try {
    pickedImage = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
    myPreview.src = pickedImage;
    myPreviewBox.classList.remove('hidden');
    myFileLabel.textContent = t('image_chosen');
    myLibMessage.textContent = '';
  } catch (error) {
    myLibMessage.textContent = t('image_failed');
    clearPickedImage();
  }
});

document.getElementById('my-remove-image').addEventListener('click', function () {
  clearPickedImage();
});

function clearPickedImage() {
  pickedImage = '';
  myFile.value = '';
  myPreview.removeAttribute('src');
  myPreviewBox.classList.add('hidden');
  myFileLabel.textContent = t('choose_image');
}

function fillMyLibSelects() {
  const keepMuscle = myMuscle.value;
  const keepEquip = myEquip.value;

  myMuscle.innerHTML = '';
  myEquip.innerHTML = '';

  Object.keys(MUSCLES).forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = muscleName(key);
    myMuscle.appendChild(option);
  });

  Object.keys(EQUIPMENT).forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = equipName(key);
    myEquip.appendChild(option);
  });

  if (keepMuscle) myMuscle.value = keepMuscle;
  if (keepEquip) myEquip.value = keepEquip;
}

async function loadMyLib() {
  myLibList.innerHTML = '';
  myLibMessage.textContent = t('loading');
  try {
    const snapshot = await getDocs(collection(db, 'myExercises'));
    myLibData = snapshot.docs.map(function (item) {
      const data = item.data();
      data.id = item.id;
      return data;
    });
    myLibMessage.textContent = '';
    renderMyLib();
  } catch (error) {
    myLibMessage.textContent = t('problem') + error.message;
  }
}

function renderMyLib() {
  myLibList.innerHTML = '';

  if (myLibData.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('mylib_empty');
    myLibList.appendChild(empty);
    return;
  }

  myLibData.forEach(function (exercise) {
    const item = document.createElement('li');

    const left = document.createElement('div');
    left.className = 'lib-item';

    if (exercise.imageUrl) {
      const thumb = document.createElement('img');
      thumb.className = 'lib-thumb';
      thumb.src = exercise.imageUrl;
      thumb.alt = '';
      thumb.addEventListener('error', function () {
        thumb.remove();
      });
      left.appendChild(thumb);
    }

    const info = document.createElement('div');

    const name = document.createElement('div');
    name.className = 'my-ex-name';
    name.textContent = exercise.name;
    info.appendChild(name);

    const meta = document.createElement('div');
    meta.className = 'my-ex-meta';
    meta.textContent = muscleName(exercise.muscle) + ' · ' + equipName(exercise.equipment);
    info.appendChild(meta);

    if (exercise.notes) {
      const notes = document.createElement('div');
      notes.className = 'my-ex-notes';
      notes.textContent = exercise.notes;
      info.appendChild(notes);
    }

    left.appendChild(info);
    item.appendChild(left);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✕';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', async function (event) {
      event.stopPropagation();
      if (!confirm(t('confirm_delete'))) return;
      try {
        await deleteDoc(doc(db, 'myExercises', exercise.id));
        await loadMyLib();
      } catch (error) {
        myLibMessage.textContent = t('problem') + error.message;
      }
    });
    item.appendChild(deleteButton);

    item.addEventListener('click', function () {
      addToDay({
        name: exercise.name,
        sets: 3,
        reps: '12',
        image: '',
        imageUrl: exercise.imageUrl || ''
      });
    });

    myLibList.appendChild(item);
  });
}

document.getElementById('my-add-btn').addEventListener('click', async function () {
  const name = myName.value.trim();
  if (!name) {
    myLibMessage.textContent = t('need_ex_name');
    return;
  }

  const id = 'ex_' + Date.now();

  try {
    myLibMessage.textContent = t('saving');
    await setDoc(doc(db, 'myExercises', id), {
      name: name,
      muscle: myMuscle.value,
      equipment: myEquip.value,
      notes: myNotes.value.trim(),
      imageUrl: pickedImage
    });

    myName.value = '';
    myNotes.value = '';
    clearPickedImage();
    await loadMyLib();
    myLibMessage.textContent = t('mylib_saved');
  } catch (error) {
    myLibMessage.textContent = t('problem') + error.message;
  }
});

/* ============================ شاشة العميل ============================ */

let clientWeek = emptyWeek();
let clientDay = todayIndex;
let clientEmail = '';
let doneToday = [];

const dayName = document.getElementById('day-name');
const list = document.getElementById('list');
const progress = document.getElementById('progress');
const finishButton = document.getElementById('finish');
const resetButton = document.getElementById('reset');

async function loadClient(email) {
  clientEmail = email;
  progress.textContent = t('loading');
  try {
    const workoutDoc = await getDoc(doc(db, 'workouts', email));
    const progressDoc = await getDoc(doc(db, 'progress', email));
    clientWeek = (workoutDoc.exists() && workoutDoc.data().week) ? workoutDoc.data().week : emptyWeek();
    doneToday = (progressDoc.exists() && progressDoc.data().date === today) ? progressDoc.data().done : [];
    showClientDay();
  } catch (error) {
    progress.textContent = t('problem') + error.message;
  }
}

function showClientDays() {
  renderDial('client-ring', 'client-dc-day', 'client-dc-sub', clientWeek, clientDay, function (index) {
    clientDay = index;
    showClientDay();
  });
}

function countDone() {
  return document.querySelectorAll('#list li.done').length;
}

function updateProgress() {
  const day = clientWeek[clientDay];
  if (clientDay !== todayIndex) {
    progress.textContent = fill('day_plan', { day: days()[clientDay] });
  } else if (day.exercises.length === 0) {
    progress.textContent = '';
  } else {
    progress.textContent = fill('of_exercises', { a: countDone(), b: day.exercises.length });
  }
}

function saveProgress() {
  const done = [];
  document.querySelectorAll('#list li').forEach(function (item, index) {
    if (item.classList.contains('done')) done.push(index);
  });
  setDoc(doc(db, 'progress', clientEmail), { date: today, day: clientDay, done: done });
}

function showClientDay() {
  const day = clientWeek[clientDay];
  const isToday = clientDay === todayIndex;

  dayName.textContent = day.title || (isToday ? t('today_workout') : days()[clientDay]);
  list.innerHTML = '';
  finishButton.textContent = t('finish_workout');
  finishButton.classList.toggle('hidden', !isToday || day.rest || day.exercises.length === 0);
  resetButton.classList.toggle('hidden', !isToday || day.rest || day.exercises.length === 0);

  if (day.rest) {
    const rest = document.createElement('p');
    rest.className = 'empty';
    rest.textContent = t('rest_msg');
    list.appendChild(rest);
  } else if (day.exercises.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('no_plan');
    list.appendChild(empty);
  } else {
    day.exercises.forEach(function (exercise, index) {
      const item = document.createElement('li');
      item.appendChild(exerciseRow(exercise));

      const details = document.createElement('span');
      details.textContent = exercise.sets + ' × ' + exercise.reps;
      item.appendChild(details);

      if (isToday && doneToday.includes(index)) {
        item.classList.add('done');
      }

      if (isToday) {
        item.addEventListener('click', function () {
          item.classList.toggle('done');
          updateProgress();
          saveProgress();
          finishButton.textContent = t('finish_workout');
        });
      }

      list.appendChild(item);
    });
  }

  showClientDays();
  updateProgress();
}

finishButton.addEventListener('click', function () {
  const left = clientWeek[clientDay].exercises.length - countDone();
  if (left === 0) {
    finishButton.textContent = t('well_done');
  } else {
    finishButton.textContent = fill('remaining', { n: left });
  }
});

resetButton.addEventListener('click', function () {
  document.querySelectorAll('#list li').forEach(function (item) {
    item.classList.remove('done');
  });
  updateProgress();
  saveProgress();
  finishButton.textContent = t('finish_workout');
});

applyLanguage();