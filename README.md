<div align="center">

# Dev Quiz Platform : Coding Quiz App

</div>

## 🛠️ Tech Stack

**ភាសាសរសេរកូដ និង ឧបករណ៍**

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=reactrouter&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)
![License](https://img.shields.io/badge/License-Free%20to%20Learn-blue.svg?style=flat)

---

## ✨ Features

- **សំណួរ ៤១**: មាន ៥ ប្រធានបទ HTML, CSS, JavaScript, React, Git និង ៣ កម្រិត Easy, Medium, Hard
- **សំណួរកូដ (Code Snippet)**: បង្ហាញកូដមានលេខបន្ទាត់ ស្លាកភាសា និងប៊ូតុង **Copy** ហើយសួរថា Output គឺអ្វី
- **ពិនិត្យចម្លើយភ្លាមៗ**: ពណ៌បៃតង ✓ ពេលត្រូវ ពណ៌ក្រហម ✗ ពេលខុស ព្រមទាំងបង្ហាញចម្លើយត្រូវ និងការពន្យល់
- **Progress Bar**: បង្ហាញ Question X of Y ភាគរយ និងចំណុចពណ៌តាមលទ្ធផលសំណួរនីមួយៗ
- **Timer និង Shuffle**: កំណត់ពេល 15s, 30s ឬ 60s ក្នុងមួយសំណួរ (អស់ពេលរាប់ជាខុស) និងលាយលំដាប់សំណួរ និងជម្រើស
- **ទំព័រលទ្ធផល**: រង្វង់ភាគរយប្តូរពណ៌តាមពិន្ទុ កម្រិត (Excellent, Great job, Good effort, Keep practicing) ចំនួនត្រូវ ខុស រយៈពេល និង **Review** មាន tab Wrong / All
- **History**: រក្សាទុកលទ្ធផល ៥០ ចុងក្រោយ ត្រងតាមប្រធានបទ ចុច **Retake** ឬលុបម្តងមួយ
- **Best Score**: ពិន្ទុខ្ពស់បំផុតតាមប្រធានបទ បង្ហាញលើកាត Home និងសារ **New personal best!**
- **Review Mistakes**: រក្សាទុកសំណួរដែលឆ្លើយខុស ហើយធ្វើ quiz ឡើងវិញពីសំណួរទាំងនោះ ឆ្លើយត្រូវវិញនឹងដកចេញដោយស្វ័យប្រវត្តិ
- **Stats Dashboard**: Accuracy, Time spent, ប្រធានបទខ្លាំង និងខ្សោយ Bar Chart ពិន្ទុ ១០ ចុងក្រោយ Topic Breakdown និងប៊ូតុង **Reset data**
- **Theme**: ប្តូរ Light, Dark ឬ System បាន ហើយមិនភ្លឺភ្លែតពេល Refresh
- **Keyboard Shortcuts**: ចុច 1 ដល់ 4 ឬ A ដល់ D ដើម្បីឆ្លើយ និង Enter ដើម្បីទៅសំណួរបន្ទាប់
- **Responsive**: ដំណើរការលើ Laptop, Tablet និងទូរស័ព្ទ
- **Accessibility**: ARIA Labels, Focus States, `aria-keyshortcuts` និងគោរព Reduced Motion
- **ចាំការកំណត់**: ប្រវត្តិ ពិន្ទុខ្ពស់បំផុត សំណួរខុស Settings និង Theme ត្រូវបានរក្សាទុកក្នុង Browser (`localStorage`)
- **គ្មាន Backend**: ដំណើរការ Offline ទាំងស្រុង មិនបាច់ Hosting ទិន្នន័យស្ថិតនៅលើឧបករណ៍របស់អ្នក

---

## 📁 Project Structure

```
dev-quiz-platform/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx / .css             → Navbar ជាប់ខាងលើ
│   │   ├── Footer.jsx / .css
│   │   ├── Layout.jsx / .css             → ស៊ុមទំព័រទាំងអស់
│   │   ├── ThemeToggle.jsx / .css        → ប៊ូតុង Light, Dark, System
│   │   ├── CategoryCard.jsx / .css       → កាតប្រធានបទលើទំព័រ Home
│   │   ├── DifficultySelector.jsx / .css → ជ្រើសកម្រិត Easy, Medium, Hard
│   │   ├── QuizSettings.jsx / .css       → Shuffle និង Timer
│   │   ├── MistakesBanner.jsx / .css     → Banner សំណួរខុសលើ Home
│   │   ├── ProgressBar.jsx / .css        → Question X of Y
│   │   ├── QuestionTimer.jsx / .css      → រាប់ថយក្រោយក្នុងមួយសំណួរ
│   │   ├── QuestionCard.jsx / .css       → បង្ហាញសំណួរ និងជម្រើស
│   │   ├── OptionButton.jsx / .css       → ជម្រើស A, B, C, D
│   │   ├── CodeBlock.jsx / .css          → បង្ហាញកូដ និងប៊ូតុង Copy
│   │   ├── AnswerFeedback.jsx / .css     → ត្រូវ, ខុស ឬ Time's up
│   │   ├── KeyboardHint.jsx / .css
│   │   ├── ResultSummary.jsx / .css      → រង្វង់ភាគរយ និង Best Score
│   │   ├── AnswerReview.jsx / .css       → Review ចម្លើយក្រោយ quiz
│   │   ├── HistoryItem.jsx / .css
│   │   ├── StatCard.jsx / .css
│   │   ├── RecentScores.jsx / .css       → Bar Chart ពិន្ទុចុងក្រោយ
│   │   └── TopicBreakdown.jsx / .css
│   ├── pages/
│   │   ├── Home.jsx / .css
│   │   ├── Quiz.jsx / .css
│   │   ├── History.jsx / .css
│   │   └── Stats.jsx / .css
│   ├── context/
│   │   ├── QuizContext.js
│   │   ├── QuizProvider.jsx              → គ្រប់គ្រង state របស់ quiz
│   │   └── quizReducer.js                → start, answer, next, finish, reset
│   ├── data/
│   │   ├── questions.json                → សំណួរធម្មតា ៣០
│   │   ├── codeQuestions.json            → សំណួរកូដ ១១
│   │   └── categories.js                 → ប្រធានបទ និងកម្រិត
│   ├── hooks/
│   │   ├── useQuiz.js
│   │   ├── useLocalStorage.js            → useState ដែលរក្សាទុកស្វ័យប្រវត្តិ
│   │   ├── useQuizHistory.js
│   │   ├── useBestScores.js
│   │   ├── useMistakes.js
│   │   ├── useSettings.js
│   │   ├── useTheme.js
│   │   └── useQuizShortcuts.js           → Keyboard Shortcuts
│   ├── utils/
│   │   ├── storage.js                    → អាន និងសរសេរ localStorage
│   │   ├── storageKeys.js
│   │   ├── questionUtils.js              → Filter និងរាប់សំណួរ
│   │   ├── shuffle.js                    → Fisher-Yates
│   │   ├── resultUtils.js                → ភាគរយ, កម្រិត, រយៈពេល
│   │   ├── historyUtils.js
│   │   ├── bestScoreUtils.js
│   │   ├── mistakeUtils.js
│   │   ├── statsUtils.js
│   │   ├── settingsUtils.js
│   │   ├── themeUtils.js
│   │   └── keyboardUtils.js
│   ├── App.jsx                           → Routes
│   ├── index.css                         → Theme tokens និង Global styles
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## ⌨️ Keyboard

| គ្រាប់ចុច | មុខងារ |
|---|---|
| `1` ដល់ `4` | ជ្រើសចម្លើយ |
| `A` ដល់ `D` | ជ្រើសចម្លើយ |
| `Enter` | ទៅសំណួរបន្ទាប់ ឬ Finish (ក្រោយឆ្លើយរួច) |
| `Tab` / `Shift + Tab` | ផ្លាស់ទីរវាងប៊ូតុង និងជម្រើស |

---

## 📱 Mobile Mode

- Header ចុះជាពីរជួរ: Logo និងប៊ូតុង Theme នៅខាងលើ ហើយ Menu Home / History / Stats ពេញទទឹងនៅខាងក្រោម
- កាតប្រធានបទរៀប ២ ជួរឈរ ហើយ Difficulty ជាប្រអប់ 2×2 លើទូរស័ព្ទតូច
- ប៊ូតុង **Start Quiz** ពេញទទឹង ហើយជាប់នៅខាងក្រោមអេក្រង់ពេល Scroll
- ប៊ូតុងក្នុងទំព័រលទ្ធផលចុះជាជួរឈរ ងាយចុចដោយមេដៃ
- Code Block រំកិលផ្តេកបាន ដោយទំព័រមិនរីកធំ
- ប៊ូតុងទាំងអស់មានកម្ពស់យ៉ាងតិច 44px

---

## 🚀 How to Run

1. Clone Repository ដោយដាក់ឈ្មោះ folder ឲ្យច្បាស់:

   ```bash
   git clone <url-repo> dev-quiz-platform
   cd dev-quiz-platform
   ```

   ឬបើ Download ZIP ពី GitHub (Code → Download ZIP) សូម Extract រួចចូល folder ដែលបានមក ដែលជាធម្មតាមានឈ្មោះ `dev-quiz-platform-main`:

   ```bash
   cd dev-quiz-platform-main
   ```

2. ដំឡើង Dependencies:

   ```bash
   npm install
   ```

3. Run Development Server:

   ```bash
   npm run dev
   ```

4. បើក Browser ចូល `http://localhost:5173` ហើយសាកល្បងជ្រើសប្រធានបទ ធ្វើ quiz បើក Timer ប្តូរ Theme និងចូលទំព័រ History និង Stats។
5. ដើម្បីពិនិត្យកូដ (Lint):

   ```bash
   npm run lint
   ```

6. ដើម្បី Build សម្រាប់ Production:

   ```bash
   npm run build
   ```

---

## 📄 License

**Free to Learn:** អ្នកអាចប្រើដើម្បីរៀន ចម្លង កែប្រែសម្រាប់ Project ផ្ទាល់ខ្លួន និងចែករំលែកកូដនេះ ឲ្យតែរក្សាទុកសេចក្តីជូនដំណឹង Copyright និង License ព្រមទាំងផ្តល់ក្រេឌីតដល់អ្នកនិពន្ធ។ មើលព័ត៌មានលម្អិតក្នុងឯកសារ [LICENSE](LICENSE)។

---

## 👤 Author

**Built with ❤️ and code by Mr. Siev E**
