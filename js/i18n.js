// 21st Century Artisan - site language switch (English / Hebrew).
//
// HOW IT WORKS
//   * The HTML is written in English and is the source of truth. Any element
//     that has a Hebrew counterpart carries data-i18n="<key>".
//   * On first run every such element's innerHTML is captured as its English
//     text, so switching back to EN never needs a second dictionary.
//   * The Hebrew dictionary below is keyed by page ("index" / "academy") plus a
//     "common" block shared by header, footer and the mail chooser.
//   * Attribute translations use data-i18n-attr="attr:key[,attr:key]".
//   * The choice persists in localStorage ("gur_lang"); the default is EN.
//   * Hebrew flips <html dir="rtl"> and CSS in style.css picks up [dir="rtl"]
//     to swap the display font (Bebas Neue has no Hebrew glyphs) and mirror the
//     few physical-side rules.
//
// Plain ASCII "-" only in copy - no em dashes (site rule).

(function () {
  'use strict';

  const STORAGE_KEY = 'gur_lang';
  const SUPPORTED   = ['en', 'he'];

  /* ─── Hebrew dictionary ─────────────────────────────────────────────── */
  const HE = {
    common: {
      'title.index':   'GUR - סיקוונסר DJ לייב · 21st Century Artisan',
      'title.academy': 'אקדמיית GUR - לימודי מוסיקה, הפקה, סינתזה וטכנולוגיה',

      'nav.try':     'נסו עכשיו',
      'nav.inside':  'מה בפנים',
      'nav.pricing': 'מחיר',
      'nav.academy': 'אקדמיה',
      'nav.about':   'אודות',

      'footer.copy': '&copy; 2026 21st Century Artisan &middot; <a href="privacy.html">פרטיות</a>',

      'mc.title':   'לפתוח אימייל עם...',
      'mc.gmail':   'Gmail',
      'mc.outlook': 'Outlook',
      'mc.default': 'אפליקציית המייל שלי',
      'mc.copy':    'העתקת כתובת המייל',
      'mc.copied':  'הועתק!',
      'mc.close':   'סגירה',
    },

    index: {
      'hero.lede':    'כלי נגינה עצמאי להופעה חיה - ערוצי לייב מתרחבים, מנועי תופים וכלי הקשה, ארבעה דקים, אפקטי Throw חיים וסיקוונסר מדויק לרמת הסמפל - הכל באפליקציה אחת.',
      'hero.try':     'נסו את הדמו',
      'hero.pricing': 'למחיר',

      'cd.eyebrow': 'משיקים ב',
      'cd.date':    '9 בספטמבר 2026',
      'cd.days':    'ימים',
      'cd.hrs':     'שעות',
      'cd.min':     'דקות',
      'cd.sec':     'שניות',
      'cd.done':    'זה קורה - GUR יצא לעולם',

      'shots.h2': 'האפליקציה עצמה',
      'shots.p':  'מבט חטוף. עצמאית ל-Windows / macOS, השהיה נמוכה, ASIO + MIDI.',
      'shots.c0': 'מצב לייב - 6 ערוצים כברירת מחדל, מתרחב ל-8',
      'shots.c1': 'מאסטר FX - דינמיקה, מנועי אפקטים לערוץ + פאנל ביצוע',
      'shots.c2': 'מיפוי MIDI - לימוד MIDI מבוסס טבלה, פרופיל לכל מכשיר',
      'shots.c3': 'ספריית DJ - אוסף, פלייליסטים + סקירות מנותחות',
      'shots.c4': 'ביצוע - צורות גל של שני דקי טראק, דקים + ספרייה',
      'shots.c5': 'צורות גל - דקי טראק, ביט-גריד + סיקוונסר',

      'try.h2':   'נסו את זה בדפדפן',
      'try.p':    'גרסת ההתייחסות בדפדפן. לחצו LIVE בתוך המסגרת כדי להתחיל, ואז השתמשו במיקסר ובסיקוונסר כדי לבנות ביטים.',
      'try.fs':   'מסך מלא',
      'try.note': 'לחצו PLAY בתוך המסגרת כדי להפעיל את האודיו. מומלץ ב-Chrome / Edge / Firefox במחשב. האפליקציה המלאה (השהיה נמוכה, ASIO, MIDI) מגיעה בהשקה.',

      'inside.h2': 'מה בפנים',
      'inside.p':  'אפליקציה אחת. בלי DAW. בלי הוסט. בלי פלאגינים.',
      'sb.lead':   'שנים-עשר כלים ברָאק אחד',
      'sb.l0':     'מנועי תופים, כלי הקשה וסמפלר',
      'sb.l1':     'סינתים ייחודיים',
      'sb.l2':     'סינתים קלאסיים',

      'f0.h':  'סיקוונסר פולימטרי',
      'f0.p':  'כל ערוץ מריץ גריד משלו של 32 צעדים עם אורך לופ עצמאי - שכבות של פולימטרים ותבניות שנכנסות ויוצאות מפאזה. מהירות, אקסנט ומודולציה לכל צעד, סווינג גלובלי ותזמון מדויק לרמת הסמפל.',
      'f1.h':  'מצב לייב של 8 ערוצים (אופציונלי)',
      'f1.p':  'GUR עדיין נפתח כברירת מחדל במצב לייב נקי של 6 ערוצים. הוסיפו את CH7 ו-CH8 רק כשצריך, והרָאק מסתדר מחדש באותו אזור ביצוע במקום לפתוח עמוד נפרד.',
      'f2.h':  'תבניות גלובליות או לערוץ',
      'f2.p':  'שורת התבניות יכולה לפנות לכל הסט או לערוץ נבחר אחד. הביאו את CH1-CH8 לפוקוס, טענו או שמרו תבנית של ערוץ בודד, וחזרו למצב גלובלי לשינויי תבנית מלאים.',
      'f3.h':  'פסנתר-רול של 256 תיבות',
      'f3.p':  'כתבו קטעים מלודיים ארוכים בתוך סיקוונסר הלייב - עד 256 תיבות לערוץ, עם אורכי תווים מצוירים, מהירות לכל פעמה, מצבי אקסנט/פתוח, קטעי אוטומציה מועתקים והקלטה בזמן אמת.',
      'f4.h':  'סינת / סמפלר כלי הקשה',
      'f4.p':  'מנוע כלי הקשה גמיש וחדש לצד Kick, Snare, Hats, Bass, Lead והקלאסיים. טענו אותו לכל סלוט ערוץ לייב, כולל הערוצים השביעי והשמיני.',
      'f5.h':  'ארבעה דקים גמישים',
      'f5.p':  'ארבעה דקים, כל אחד ניתן להקצאה חופשית - טענו תבנית סיקוונסר או טראק אודיו לכל אחד מהם. תהליך העבודה המלא של CDJ, בתוכנה - בלי DAW, בלי הוסט.',
      'f6.h':  'ספריית DJ וייבוא',
      'f6.p':  'אוסף מובנה עם פלייליסטים. ייבוא ישיר מ-Traktor, Rekordbox ו-VirtualDJ - BPM, ביט-גריד, סולמות והוט-קיוז עוברים יחד - או קריאה ישירה ממסד נתונים חי של Rekordbox.',
      'f7.h':  'מיקס הרמוני לפי סולם',
      'f7.p':  'סולם מוזיקלי / Camelot אוטומטי לכל דק, עם טרנספוזיציה אמיתית. מיקסו בסולם בין דקי סיקוונסר וטראק, והזיזו כל דק להתאמה.',
      'f8.h':  'לופים וקיוז ברמת CDJ',
      'f8.p':  'ביט-לופים, לופים ידניים ומצב סליפ, ועוד 8 לופים שמורים ו-8 הוט-קיוז לכל דק - נעולים בפאזה לסיקוונסר עם סנכרון ביט רציף, וניתוב ישיר לרָאק האפקטים של המאסטר.',
      'f9.h':  'מתיחת זמן עם נעילת פיץ\'',
      'f9.p':  'מתיחה איכותית שומרת על הפיץ\' נעול בזמן שאתם רוכבים על הטמפו - או שחררו אותה לכיפופי פיץ\' בסגנון ויניל.',
      'f10.h': 'הפרדת סטמים',
      'f10.p': 'הפרדה אופליין ל-4 סטמים לכל טראק - ווקאל, תופים, בס ושאר. השתיקו, בודדו, קבעו עוצמה לכל סטם ונתבו כל סטם לרָאק האפקטים של המאסטר - ישירות מהדק.',
      'f11.h': 'אפקטי Throw חיים',
      'f11.p': 'רָאק פאדים שמופעל בלחיצה ממושכת עם אחד-עשר אפקטים - flanger, crusher, transient, reverb, delay, glitch, beat-loop, phaser, roll, ping-pong ו-echo - ועוד סוויפים של פילטר, הכל מסונכרן לביט ומקוונטז לדרופ.',
      'f12.h': 'רָאק אפקטים למאסטר',
      'f12.p': 'ריוורב FDN עשיר, דיליי מסונכרן לטמפו ושכבת מוזיקליות על ערוץ המאסטר - עם פאנל ביצוע חי לשלוט בהם.',
      'f13.h': 'ייצוא באיכות אולפן',
      'f13.p': 'רנדרו את הסט ל-WAV, AIFF, FLAC, MP3 או AAC - בטמפו ובסולם הנכונים, עם מטא-דאטה מלא. הקלטה נאמנה של בדיוק מה ששמעתם.',
      'f14.h': 'מיפוי בקרי MIDI',
      'f14.p': 'לימוד MIDI מבוסס טבלה עם פרופיל לכל מכשיר. עובד מהקופסה עם Traktor Kontrol S2; מפו כל בקר - Traktor S4, Pioneer DDJ-FLX ועוד.',

      'pricing.h2': 'מחיר',
      'pricing.p':  'רכישה חד-פעמית. בלי מנוי. כל עדכוני v1.x בחינם.',
      'pc.context': '<span class="pc-launch-tag">מחיר השקה</span><br>מחיר רגיל $129 אחרי החודש הראשון',
      'pc.f0':      'רכישה חד-פעמית',
      'pc.f1':      'בלי מנוי',
      'pc.f2':      'כל עדכוני v1.x בחינם',
      'pc.f3':      'ניסיון מלא ל-30 יום',
      'pc.f4':      'Windows 10 / 11 + macOS',
      'pc.f5':      'מיפוי בקרי MIDI',
      'pc.notify':  'עדכנו אותי בהשקה',
      'pc.try':     'נסו את הדמו',
      'pc.status':  'משיקים ב-9 בספטמבר 2026 · Windows ו-macOS',

      'platforms.h2': 'פלטפורמות',

      'about.statement': 'אנחנו בונים מכונות לבמה. וירטואליות ופיזיות. עצמאיות, בהשהיה נמוכה, מכוונות לשימוש חי. GUR היא הבכורה שלנו.',
      'about.credit':    'נבנה על ידי <strong>נדב הכט דרייסון</strong>',

      'beta.eyebrow': 'גישה מוקדמת · לפני 9 בספטמבר',
      'beta.title':   'הצטרפו לבטא',
      'beta.lede':    'בדיקות הבטא הן <strong>בחינם</strong>. הגישו בקשה לפני ההשקה ב-9 בספטמבר, הורידו את GUR ישירות, וחקרו את הכלי המלא על הסטאפ שלכם.',
      'beta.cta':     'בקשת גישה לבטא',
      'beta.trial':   '<strong>מתחילים מיד</strong> - אחרי הטופס הקצר, הורידו את גרסת Windows או macOS הנוכחית ישירות מהאתר. תקופת הניסיון המלאה של 30 יום מתחילה אוטומטית בפתיחה הראשונה של GUR. בלי קופון, בלי תשלום, בלי מפתח.',
      'beta.note':    'הורדה ישירה ל-Windows 10 / 11 ו-macOS · ניסיון ל-30 יום',
    },

    academy: {
      'ac.eyebrow': 'אקדמיית GUR',
      'ac.title':   'לימודי מוסיקה, הפקה, סינתזה וטכנולוגיה',
      'ac.lede':    'קורס מעמיק ומעשי מאת יוצר GUR - מהפקה מוזיקלית וסינתזה ועד תכנון ובנייה של כלים אלקטרוניים משלכם.',
      'ac.cta.waitlist': 'הרשמה לרשימת ההמתנה',
      'ac.cta.whatsapp': 'דברו איתי בוואטסאפ',

      'ac.who.h2': 'מי אני',
      'ac.who.p':  'אהלן, שמי נדב הכט דרייסון, מוזיקאי, מפיק, מעצב תעשייתי, טכנאי אלקטרוניקה ויצרן סינתיסייזרים. עשרות שנים שאני חי מוסיקה וטכנולוגיה. השקעתי את כל השנים ביצירה, למידה ואיסוף כלים על מנת שאוכל להפיק כל דבר שרק יעלה בדעתי - החל ממוסיקה מקורית והכרת כלי הנגינה, המלודיות והמקצבים שמאפיינים כל ז\'אנר, ועד יצירה של כלים וירטואליים, אלקטרוניים ומכניים שאפיינו את הפרופיל הייחודי של כל פרויקט שעשיתי.',

      'ac.how.h2': 'איך הכל התחיל',
      'ac.how.p':  'המסע שלי התחיל מאהבה ליצירה אומנותית ופרקטית כאחד, והמשיך דרך יצירה עצמאית, ניסויים בלתי פוסקים ולמידה ממושכת. הסקרנות הבלתי פוסקת שלי הביאה איתה מגוון מאוד רחב של כלים, החל מנגינה על כלי נשיפה, פריטה והקשה, ובהמשך סינתזה והפקה מוסיקלית, ועד עיצוב תעשייתי, מכניקה, רובוטיקה ואלקטרוניקה. מה שאני רוצה להעביר הלאה הוא לא רק ידע טכני, אלא את דרך החשיבה והטעם הייחודי שהתפתחו אצלי מתוך החיבור בין כל התחומים האלה.',

      'ac.learn.h2': 'מה נלמד',
      'ac.learn.p':  'נתחיל בלהכיר את GUR, תוכנה שעבדתי עליה בשנה האחרונה ויצאה לעולם בספטמבר 2026. היא שילוב בין תוכנת תקליט, תוכנת הפקה ומערכת לנגינה בלייב, והיא במידה רבה תוצאה של כל התחומים והכלים שאספתי לאורך הדרך. השיעורים יכללו גם למידה על כלי נגינה, הפקה מוסיקלית, סינתזה ותקליט, תוך כדי שילוב בפיתוח תוכנות, עיצוב בתלת מימד ובניית סינטים וירטואליים, ועד אלקטרוניקה וסינטים דיגיטליים, אקוסטיקה, מכניקה, חשמל ומגנטיות.',
      'ac.topic0': 'הפקה מוזיקלית',
      'ac.topic1': 'סינתזה',
      'ac.topic2': 'תכנון ובניית כלים',
      'ac.topic3': 'אלקטרוניקה',
      'ac.topic4': 'אקוסטיקה',
      'ac.topic5': 'מכניקה',
      'ac.topic6': 'אלקטרוניקה דיגיטלית',
      'ac.topic7': 'חשיבה ומושגים',

      'ac.approach.h2': 'הגישה',
      'ac.approach.p1': 'אני לא מגיע מעולם אחד, ולכן גם לא מלמד מתוך מסלול אחד. אצלי מוסיקה, סאונד, תוכנה, אלקטרוניקה, מכניקה ועיצוב הם לא תחומים נפרדים, אלא חלקים של אותה שפה יצירתית. המטרה שלי היא לא ללמד אתכם לחקות Workflow קיים או לעבוד "כמו שצריך", אלא לעזור לכם להבין לעומק כדי שתוכלו לפתח דרך עבודה משלכם. להבין למה משהו עובד, לפרק אותו לגורמים, לשנות אותו כשצריך, ולפתח את הכלים שמתאימים לרעיון שלכם.',
      'ac.approach.p2': 'הלימוד הוא אחד על אחד ומותאם לאדם שמולי. אנחנו יכולים להתחיל מיצירת ביט, סינתזה והפקה או סט DJ, ולהגיע משם לקוד, אלקטרוניקה או בניית כלי חדש לגמרי. מבחינתי כל אלה הם פשוט דרכים שונות להגיע לאותה מטרה: להפוך רעיון למשהו שאפשר לשמוע, לגעת בו ולהשתמש בו.',
      'ac.approach.p3': 'השיעורים מתאימים למתחילים ומתקדמים, מפיקים, דיג\'יים ומוסיקאים. אנגלית ברמה טובה היא יתרון משמעותי לחלק מהתוכן שנלמד.',

      'ac.contact.eyebrow': 'רוצים להתחיל להתנסות?',
      'ac.contact.h2':      'בואו נדבר',
      'ac.contact.p':       'הירשמו לרשימת ההמתנה של הקורס, או פשוט השאירו לי הודעה - אשמח לענות על כל שאלה על הקורס, מוסיקה, הפקה וסינתיסייזרים. בינתיים, התחילו לנגן בגרסת הדמו האינטרנטית של GUR.',
      'ac.contact.waitlist': 'הרשמה לרשימת ההמתנה',
      'ac.contact.whatsapp': 'WhatsApp',
      'ac.contact.telegram': 'Telegram',
      'ac.contact.demo':     'לדמו של GUR בדפדפן',
      'ac.contact.phone':    'טלפון / WhatsApp / Telegram:',
      'ac.contact.flyer':    'הפלייר להורדה:',
      'ac.contact.flyer.en': 'אנגלית',
      'ac.contact.flyer.he': 'עברית',
    },
  };

  /* ─── Font for Hebrew ───────────────────────────────────────────────── */
  // Bebas Neue and Inter carry no Hebrew glyphs. Heebo (body) + Secular One
  // (display) are loaded lazily the first time Hebrew is selected so English
  // visitors don't pay for them.
  let hebrewFontsLoaded = false;
  function ensureHebrewFonts() {
    if (hebrewFontsLoaded) return;
    hebrewFontsLoaded = true;
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;800&family=Secular+One&display=swap';
    document.head.appendChild(link);
  }

  /* ─── Core ──────────────────────────────────────────────────────────── */
  const page = document.body.getAttribute('data-page') || 'index';
  const dict = Object.assign({}, HE.common, HE[page] || {});

  function readStored() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.includes(v) ? v : null;
    } catch (e) { return null; }
  }
  function store(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
  }

  // Capture the English originals once so we can restore them.
  function captureOriginals() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (el.dataset.i18nOrig === undefined) el.dataset.i18nOrig = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      // Attribute names may contain "-" (aria-label), which dataset keys can't,
      // so the originals live in a plain object on the element.
      if (!el.__i18nOrigAttrs) el.__i18nOrigAttrs = {};
      el.dataset.i18nAttr.split(',').forEach(pair => {
        const attr = pair.split(':')[0].trim();
        if (el.__i18nOrigAttrs[attr] === undefined) el.__i18nOrigAttrs[attr] = el.getAttribute(attr) || '';
      });
    });
    const t = document.querySelector('title');
    if (t && t.dataset.i18nOrig === undefined) t.dataset.i18nOrig = t.textContent;
  }

  function apply(lang) {
    const he = lang === 'he';
    if (he) ensureHebrewFonts();

    document.documentElement.lang = he ? 'he' : 'en';
    document.documentElement.dir  = he ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('lang-he', he);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (he && dict[key] !== undefined) el.innerHTML = dict[key];
      else if (el.dataset.i18nOrig !== undefined) el.innerHTML = el.dataset.i18nOrig;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        const orig = el.__i18nOrigAttrs ? el.__i18nOrigAttrs[attr] : undefined;
        if (he && dict[key] !== undefined) el.setAttribute(attr, dict[key]);
        else if (orig !== undefined) el.setAttribute(attr, orig);
      });
    });

    const t = document.querySelector('title');
    if (t) {
      const key = t.dataset.i18n || ('title.' + page);
      if (he && dict[key]) t.textContent = dict[key];
      else if (t.dataset.i18nOrig !== undefined) t.textContent = t.dataset.i18nOrig;
    }

    document.querySelectorAll('.lang-switch [data-lang]').forEach(btn => {
      const on = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    document.dispatchEvent(new CustomEvent('gur:langchange', { detail: { lang } }));
  }

  function init() {
    captureOriginals();

    // URL override (?lang=he) beats storage, so a shared Hebrew link opens in Hebrew.
    let lang = readStored() || 'en';
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (SUPPORTED.includes(q)) { lang = q; store(q); }
    } catch (e) { /* ignore */ }

    apply(lang);

    document.querySelectorAll('.lang-switch [data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.lang;
        if (!SUPPORTED.includes(next)) return;
        store(next);
        apply(next);
      });
    });
  }

  window.GUR_I18N = {
    get lang() { return document.documentElement.classList.contains('lang-he') ? 'he' : 'en'; },
    t(key) { return this.lang === 'he' && dict[key] !== undefined ? dict[key] : null; },
    set(lang) { if (SUPPORTED.includes(lang)) { store(lang); apply(lang); } },
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
