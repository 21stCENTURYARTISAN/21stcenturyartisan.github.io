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
      'title.index': 'GUR - DJ Live Sequencer Workstation · 21st Century Artisan',
      'title.academy': 'אקדמיית GUR - לימודי מוסיקה, הפקה, סינתזה וטכנולוגיה',

      'nav.try':     'נסו עכשיו',
      'nav.inside':  'מה בפנים',
      'nav.fx':      'אפקטים',
      'nav.roadmap': 'מפת דרכים',
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
      'hero.lede': 'כלי שלם להופעה חיה - 12 כלים, 8 ערוצי לייב, ארבעה דקים, אפקטי Insert, LiveFX וסיקוונסר מדויק לרמת הסמפל. עצמאי, או כ-VST3 בתוך ה-DAW שלכם.',
      'hero.try':     'נסו את הדמו',
      'hero.pricing': 'למחיר',
      'hero.buy':       'קנו עכשיו - $69.99',
      'hero.trial':     'נסו קודם - 30 יום חינם',
      'hero.pricenote': '$129.99 החל מ-1 בינואר. קנו בתקופת הניסיון ושלושת הסינתים הקלאסיים שלכם במתנה.',
      'hero.demolink':  'או פשוט תשמעו בדפדפן',

      'cd.eyebrow': 'משיקים ב',
      'cd.date':    '9 בספטמבר 2026',
      'cd.days':    'ימים',
      'cd.hrs':     'שעות',
      'cd.min':     'דקות',
      'cd.sec':     'שניות',
      'cd.done':    'זה קורה - GUR יצא לעולם',

      'shots.h2': 'האפליקציה עצמה',
      'shots.p':  'מבט חטוף. עצמאית ל-Windows / macOS, השהיה נמוכה, ASIO + MIDI.',
      'shots.c0': 'מצב לייב - המיקסר והסיקוונסר',
      'shots.c1': 'LIVEFX ומאסטר - דינמיקה, מנועי אפקטים לערוץ + פאנל ביצוע',
      'shots.c2': 'מיפוי MIDI - לימוד MIDI מבוסס טבלה, פרופיל לכל מכשיר',
      'shots.c3': 'ספריית DJ - אוסף, פלייליסטים + סקירות מנותחות',
      'shots.c4': 'ביצוע - צורות גל של שני דקי טראק, דקים + ספרייה',
      'shots.c5': 'צורות גל - דקי טראק, ביט-גריד + סיקוונסר',

      'try.h2':   'נסו את זה בדפדפן',
      'try.p':    'גרסת ההתייחסות בדפדפן. לחצו LIVE בתוך המסגרת כדי להתחיל, ואז השתמשו במיקסר ובסיקוונסר כדי לבנות ביטים.',
      'try.fs':   'מסך מלא',
      'try.note': 'לחצו PLAY בתוך המסגרת כדי להפעיל את האודיו. מומלץ ב-Chrome / Edge / Firefox במחשב. האפליקציה המלאה מוסיפה השהיה נמוכה, ASIO ו-MIDI.',

      'inside.h2': 'מה בפנים',
      'inside.p': 'כלי אחד לבמה. עצמאי ל-Windows ו-macOS, או כ-VST3 בתוך ה-DAW שלכם.',
      'sb.lead':   'שנים-עשר כלים ברָאק אחד',
      'sb.l0':     'מנועי תופים, כלי הקשה וסמפלר',
      'sb.l1':     'סינתים ייחודיים',
      'sb.l2':     'סינתים קלאסיים',

      'f0.h':  'סיקוונסר פולימטרי',
      'f0.p':  'כל ערוץ מריץ גריד משלו של 32 צעדים עם אורך לופ עצמאי - שכבות של פולימטרים ותבניות שנכנסות ויוצאות מפאזה. מהירות, אקסנט ומודולציה לכל צעד, סווינג גלובלי ותזמון מדויק לרמת הסמפל.',
      'f1.h': 'שמונה ערוצי לייב',
      'f1.p': 'GUR נפתח עם כל שמונת הערוצים מוכנים. כל סלוט יכול לארח כל מנוע, כך שהרָאק מתאים לסט שאתם מנגנים.',
      'f2.h':  'תבניות גלובליות או לערוץ',
      'f2.p':  'שורת התבניות יכולה לפנות לכל הסט או לערוץ נבחר אחד. הביאו את CH1-CH8 לפוקוס, טענו או שמרו תבנית של ערוץ בודד, וחזרו למצב גלובלי לשינויי תבנית מלאים.',
      'f3.h':  'פסנתר-רול של 256 תיבות',
      'f3.p':  'כתבו קטעים מלודיים ארוכים בתוך סיקוונסר הלייב - עד 256 תיבות לערוץ, עם אורכי תווים מצוירים, מהירות לכל פעמה, מצבי אקסנט/פתוח, קטעי אוטומציה מועתקים והקלטה בזמן אמת.',
      'f4.h':  'סינת / סמפלר כלי הקשה',
      'f4.p':  'מנוע כלי הקשה גמיש וחדש לצד Kick, Snare, Hats, Bass, Lead והקלאסיים. טענו אותו לכל סלוט ערוץ לייב, כולל הערוצים השביעי והשמיני.',
      'f5.h':  'ארבעה דקים גמישים',
      'f5.p': 'ארבעה דקים, כל אחד ניתן להקצאה חופשית - טענו תבנית סיקוונסר או טראק אודיו לכל אחד מהם. תהליך העבודה המלא של CDJ, בתוכנה.',
      'f6.h':  'ספריית DJ וייבוא',
      'f6.p':  'אוסף מובנה עם פלייליסטים. ייבוא ישיר מ-Traktor, Rekordbox ו-VirtualDJ - BPM, ביט-גריד, סולמות והוט-קיוז עוברים יחד - או קריאה ישירה ממסד נתונים חי של Rekordbox.',
      'f7.h':  'מיקס הרמוני לפי סולם',
      'f7.p':  'סולם מוזיקלי / Camelot אוטומטי לכל דק, עם טרנספוזיציה אמיתית. מיקסו בסולם בין דקי סיקוונסר וטראק, והזיזו כל דק להתאמה.',
      'f8.h':  'לופים וקיוז ברמת CDJ',
      'f8.p': 'ביט-לופים, לופים ידניים ומצב סליפ, ועוד 8 לופים שמורים ו-8 הוט-קיוז לכל דק - נעולים בפאזה לסיקוונסר עם סנכרון ביט רציף, וניתוב ישיר ל-LiveFX.',
      'f9.h':  'מתיחת זמן עם נעילת פיץ\'',
      'f9.p':  'מתיחה איכותית שומרת על הפיץ\' נעול בזמן שאתם רוכבים על הטמפו - או שחררו אותה לכיפופי פיץ\' בסגנון ויניל.',
      'f10.h': 'הפרדת סטמים',
      'f10.p': 'הפרדה אופליין ל-4 סטמים לכל טראק - ווקאל, תופים, בס ושאר. השתיקו, בודדו, קבעו עוצמה לכל סטם ונתבו כל סטם ל-LiveFX - ישירות מהדק.',
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
      'pc.eyebrow': 'GUR DJ - לייב, DJ ו-VST3',
      'pc.context': '<span class="pc-launch-tag">מחיר השקה</span><br>$129.99 החל מ-1 בינואר',
      'pc.bonus':   'קונים בתקופת הניסיון: שלושת הסינתים הקלאסיים במתנה',
      'pc.f0':      'סטנדאלון מלא כולל מצב DJ',
      'pc.f1':      'ארבעה דקים, דקי טראק וסטמים',
      'pc.f2':      'תוסף VST3 כלול',
      'pc.f3':      'כל עדכוני v1.x בחינם',
      'pc.f4':      'ניסיון מלא ל-30 יום',
      'pc.f5':      'Windows 10 / 11 + macOS',
      'pc.buy':     'קנו את GUR DJ - $69.99',
      'pcl.eyebrow': 'GUR LITE - מצב לייב',
      'pcl.context': '<span class="pc-launch-tag">מחיר השקה</span><br>$69.99 החל מ-1 בינואר',
      'pcl.f0':      'סטנדאלון במצב לייב',
      'pcl.f1':      'תוסף VST3 כלול',
      'pcl.f2':      'סיקוונסר, תופים, סינתים ואפקטים',
      'pcl.f3':      'כל עדכוני v1.x בחינם',
      'pcl.f4':      'ניסיון מלא ל-30 יום',
      'pcl.f5':      'בלי מצב DJ ובלי דקים',
      'pcl.buy':     'קנו את GUR LITE - $39.99',
      'pc.notify':  'עדכנו אותי בהשקה',
      'pc.try':     'נסו את הדמו',
      'pc.status':  'זמין עכשיו · Windows ו-macOS',

      'platforms.h2': 'פלטפורמות',

      'about.statement': 'אנחנו בונים מכונות לבמה. וירטואליות ופיזיות. עצמאיות, בהשהיה נמוכה, מכוונות לשימוש חי. GUR היא הבכורה שלנו.',
      'about.credit':    'נבנה על ידי <strong>נדב הכט דרייסון</strong>',

      'fx.h2': 'אפקטי Insert ו-LiveFX',
      'fx.p': 'שתי מערכות אפקטים עם שני תפקידים: אפקטי Insert מעצבים כל ערוץ, ו-LiveFX הוא מה שמנגנים.',
      'fx.ins.h': 'אפקטי INSERT - 13 אפקטים מובנים, 8 סלוטים לערוץ',
      'fx.ins.p': 'ה-PRO MIXER נותן לכל ערוץ 8 סלוטים של Insert, אקולייזר, פילטרים High-pass ו-Low-pass, Trim ו-Pan. הסוויטה כוללת קומפרסור, לימיטר, פלנג\'ר, פייזר, קראשר, טראנס גייט, כורוס, דיליי, פינג-פונג, אקו, ספרינג, פלייט ורום. לכל אפקט עורך משלו עם פריסטים של היצרן ושל המשתמש, A/B וביטול פעולה. האפקטים נשמרים עם התבניות, מסתדרים מחדש בגרירה, וניתנים לאוטומציה מהפסנתר-רול.',
      'fx.live.h': 'LIVEFX - אפקטי THROW שמנגנים',
      'fx.live.p': 'לחיצה ממושכת על פאד זורקת פלנג\'ר, פייזר, קראשר, טראנס גייט, רול, ביט-לופ, גליץ\', דיליי, ריוורב, פינג-פונג או אקו, ועוד סוויפים של פילטר. LiveFX נשאר נעול לביט ונכנס בדיוק על הגריד. פאנל הביצוע מוסיף משטח XY, בקרי מאקרו ו-HOLD. ערוצי סיקוונסר, דקי טראק וסטמים בודדים יכולים להזין אותו, והוא ממופה ישירות לבקר שלכם.',
      'ctl.h2': 'נבנה לנגינה בידיים',
      'ctl.p': 'GUR ממפה לפי פעולה ולא לפי סוג מכשיר, כך שציוד DJ, קלידים, פאדים וקונסולות פיידרים יכולים כולם לשלוט בו.',
      'ctl.a.h': 'ספינות הדגל',
      'ctl.a.p': 'GUR פותח בעבודה ישירה עם בקרי הדגל של Native Instruments, Pioneer DJ, Akai ו-Novation, כולל ג\'וג, משטחי מגע, גרידים של פאדים ומשוב לדים.',
      'ctl.b.h': 'כל המותגים הגדולים',
      'ctl.b.p': 'הרשימה המובנית כוללת 177 מכשירים ב-8 קטגוריות, מ-Denon DJ, Numark, Rane, Reloop, Hercules, Allen &amp; Heath, Arturia, Roland, Korg, Behringer, Elektron ועוד. כמה מספינות הדגל מגיעות עם מיפוי מוכן, והשאר ממופים עם MIDI Learn. לא ברשימה? הוסיפו בעצמכם.',
      'ctl.c.h': 'כמה בקרים יחד',
      'ctl.c.p': 'כל בקר מחובר שומר על מיפוי משלו, כך שכמה בקרים עובדים יחד בלי להתנגש. לכל מכשיר פרופיל משלו, ו-GUR מתחבר מחדש כשמחברים אותו.',
      'ctl.note': 'שמות המותגים הם סימנים מסחריים של בעליהם ואין בהם משום המלצה או חסות.',
      'open.h2': 'למה GUR מתחבר היום',
      'open.p': 'GUR הוא כלי שלם בפני עצמו, והוא כבר עובד עם שאר הסטאפ שלכם.',
      'open.a.h': 'ה-DAW שלכם',
      'open.a.p': 'GUR רץ כתוסף VST3 בתוך ה-DAW שלכם, עם מצב לייב וסנכרון להוסט. ה-VST3 כלול בכל רישיון.',
      'open.b.h': 'הספרייה שלכם',
      'open.b.p': 'ייבוא מ-Traktor, Rekordbox ו-VirtualDJ, כולל BPM, ביט-גריד, סולמות והוט-קיוז.',
      'open.c.h': 'הקבצים והציוד שלכם',
      'open.c.p': 'ייצוא ל-WAV, AIFF, FLAC, MP3 או AAC. אודיו ASIO, יציאות נפרדות ל-Line ול-Cue, ו-MIDI מכל בקר.',
      'open.not': '<strong>עדיין לא:</strong> GUR לא יכול להריץ היום תוספים של צד שלישי, וגרסת ה-DAW שלו, GUR PRO, עדיין בפיתוח. שניהם במפת הדרכים למטה.',
      'next.h2': 'מגיע בעדכון הבא',
      'next.p': 'כבר בנוי, ובחינם לכל בעלי v1.x כשייצא.',
      'next.a.h': 'סינת תופים PERC',
      'next.a.p': '14 מודלים של תופים בסינתזה טהורה ו-32 ערכות לפי ז\'אנר ב-7 קטגוריות.',
      'next.b.h': 'LEAD, ARP ו-PAD עמוקים יותר',
      'next.b.p': 'LFO, אנבלופ מודולציה, מטריצת מודולציה של 8 סלוטים, מצב ארפג\'יו, סיקוונס PERFORMER ו-STEPPER, ורָאק אפקטים מובנה.',
      'next.c.h': 'מנועי אפקטים לערוץ',
      'next.c.p': 'דיליי, ריוורב וכורוס מחודשים, עם דיליי מסונכרן ופריסטים, ועוד נתיב מודולציה שני בכל ערוץ.',
      'next.d.h': 'משטחי שליטה לבקרי גריד',
      'next.d.p': 'מסכי תבניות, צעדים ו-LiveFX לגרידים של Akai ו-Novation.',
      'road.h2': 'מפת דרכים - יוצא עד 1 בינואר 2027',
      'road.p': 'GUR נפתח. זו רשימת הדברים שנבנים עכשיו. כל מה שכאן, חוץ מהגרסה החדשה GUR PRO, הוא עדכון חינם לבעלי GUR DJ ו-GUR LITE.',
      'road.a.h': '1. GUR PRO - גרסת ה-DAW החדשה',
      'road.a.p': 'גרסה חדשה וגבוהה יותר שמוסיפה לכל מה שיש ב-GUR DJ טיימליין לפוסט-פרודקשן וערוצי אודיו, עם נתיבי טייק, הקפאת ערוצים וייצוא סטמים. בפיתוח עכשיו. בתמחור של תוכנת DAW, המחיר יפורסם בהמשך. בעלי GUR DJ יקבלו 50% הנחה.',
      'road.b.h': '2. אפקטי VST3 של צד שלישי',
      'road.b.p': 'טעינת אפקטי VST3 שלכם לסלוטי ה-Insert של ה-PRO MIXER, לצד הסוויטה המובנית.',
      'road.c.h': '3. MIDI CLOCK',
      'road.c.p': 'שליחה וקבלה של MIDI Clock, כדי ש-GUR יישאר מתואם עם חומרה ותוכנות אחרות.',
      'road.d.h': '4. ייבוא וייצוא קובצי MIDI',
      'road.d.p': 'העברת תבניות וחלקי פסנתר-רול אל GUR וממנו.',
      'road.e.h': '5. עוד מיפויים מוכנים',
      'road.e.p': 'מיפויי ברירת מחדל ליותר בקרי דגל, כך שיותר ציוד יעבוד כבר בחיבור הראשון.',
      'road.after': '<strong>אחרי 1 בינואר:</strong> כלי VST3 של צד שלישי ו-Ableton Link. עדיין ללא תאריך.',
      'val.h2': 'תמורה למחיר',
      'val.p': 'מחיר חד-פעמי אחד עבור כלי סיקוונסר, 12 מנועים, ארבעה דקים, סטמים, מיקסר מקצועי עם Insert, LiveFX ו-VST3.',
      'val.th0': 'תוכנה',
      'val.th1': 'מחיר',
      'val.gur': '$69.99 חד-פעמי, $129.99 החל מ-1 בינואר',
      'val.abl': '349 דולר חד-פעמי',
      'val.ser': '$299 חד-פעמי, או $11.99 לחודש',
      'val.rek': '$15 לחודש, בחיוב שנתי',
      'val.note': 'המחירים מאתר כל יצרן נכון ל-4 בנובמבר 2026. המוצרים שונים בהיקף שלהם, אז השוו מה כל אחד כולל עבור השימוש שלכם.',
      'faq.h2': 'שאלות',
      'faq.a.h': 'מה זה GUR?',
      'faq.a.p': 'GUR הוא DJ Live Sequencer Workstation של 21st Century Artisan: כלי למחשב עם Windows ו-macOS שמשלב סיקוונסר לייב, 12 מנועי כלים, ארבעה דקי DJ והפרדת סטמים.',
      'faq.b.h': 'האם GUR תומך בתוספי VST?',
      'faq.b.p': 'GUR עצמו רץ כ-VST3 בתוך ה-DAW שלכם. כרגע הוא לא יכול לטעון תוספים של צד שלישי. אירוח אפקטי VST3 של צד שלישי נמצא במפת הדרכים ליציאה עד 1 בינואר 2027, כעדכון חינם.',
      'faq.c.h': 'האם GUR היא מערכת סגורה?',
      'faq.c.p': 'היום GUR כולל כלים ואפקטים משלו ולא מריץ תוספים של צד שלישי. הוא כן רץ בכל DAW שתומך ב-VST3, מייבא ספריות Traktor, Rekordbox ו-VirtualDJ, מייצא קובצי אודיו סטנדרטיים ועובד עם בקרי MIDI מכל מותג. מפת הדרכים מפרטת מה יפתח אותו עוד יותר.',
      'faq.d.h': 'האם GUR הוא DAW?',
      'faq.d.p': 'עדיין לא. היום GUR הוא כלי להופעה חיה. גרסת ה-DAW שלו, GUR PRO, בפיתוח ונמצאת במפת הדרכים ליציאה עד 1 בינואר 2027. היא מוסיפה טיימליין לפוסט-פרודקשן וערוצי אודיו, בתמחור של תוכנת DAW, עם 50% הנחה לבעלי GUR DJ.',
      'faq.e.h': 'אילו בקרי MIDI עובדים עם GUR?',
      'faq.e.p': 'GUR ממפה לפי פעולה, כך שכל בקר MIDI אפשר למפות עם MIDI Learn. הוא פותח עם בקרי הדגל של Native Instruments, Pioneer DJ, Akai ו-Novation, והרשימה שלו כוללת 177 מכשירים מהמותגים הגדולים.',
      'faq.f.h': 'כמה GUR עולה?',
      'faq.f.p': 'GUR DJ עולה $69.99 ו-GUR LITE עולה $39.99 במחיר השקה, ומ-1 בינואר $129.99 ו-$69.99. שניהם רכישה חד-פעמית בלי מנוי, עם כל עדכוני v1.x בחינם ותקופת ניסיון מלאה של 30 יום. GUR PRO, גרסת ה-DAW העתידית, תתומחר בנפרד, עם 50% הנחה לבעלי GUR DJ.',

      'beta.eyebrow': 'גישה מוקדמת',
      'beta.title':   'הצטרפו לבטא',
      'beta.lede': 'בדיקות הבטא הן <strong>בחינם</strong>. הגישו בקשה, הורידו את GUR ישירות, וחקרו את הכלי המלא על הסטאפ שלכם.',
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
      'ac.learn.p':  'נתחיל בלהכיר את GUR, תוכנה שעבדתי עליה בשנה האחרונה ויצאה לעולם בספטמבר 2026. היא שילוב בין תוכנת תקלוט, תוכנת הפקה ומערכת לנגינה בלייב, והיא במידה רבה תוצאה של כל התחומים והכלים שאספתי לאורך הדרך. השיעורים יכללו גם למידה על כלי נגינה, הפקה מוסיקלית, סינתזה ותקלוט, תוך כדי שילוב בפיתוח תוכנות, עיצוב בתלת מימד ובניית סינטים וירטואליים, ועד אלקטרוניקה וסינטים דיגיטליים, אקוסטיקה, מכניקה, חשמל ומגנטיות.',
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
