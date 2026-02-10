# Organic Shop Repo Project Structure

```
project-root/
├─ pages/
│  ├─ auth/
│  │  ├─ login.html
│  │  └─ signup.html
│  ├─ dashboard/
│  │  └─ index.html
│  ├─ product/
│  │  └─ view.html
│  └─ cart/
│     └─ index.html
│
├─ assets/
│  ├─ images/
│  ├─ icons/
│  └─ fonts/
│
├─ css/
│  ├─ base/
│  │  ├─ reset.css
│  │  ├─ variables.css          (optional; remove if not allowed)
│  │  └─ typography.css
│  ├─ layout/
│  │  ├─ grid.css
│  │  └─ shell.css              (page frame: sidebar + navbar area)
│  ├─ components/
│  │  ├─ navbar.css
│  │  ├─ sidebar.css
│  │  ├─ pagination.css
│  │  ├─ forms.css
│  │  ├─ cards.css              (product cards, item rows)
│  │  └─ buttons.css
│  ├─ pages/
│  │  ├─ auth.css               (login + signup styling)
│  │  ├─ dashboard.css          (search/filter + table/list)
│  │  ├─ product-view.css
│  │  └─ cart.css
│  └─ main.css                  (imports/links everything)
│
├─ js/
│  ├─ core/
│  │  ├─ dom.js                 (DOM helpers)
│  │  ├─ storage.js             (localStorage/sessionStorage)
│  │  ├─ api.js                 (if you have fetch; otherwise mock)
│  │  └─ validate.js            (form validation)
│  ├─ components/
│  │  ├─ navbar.js
│  │  ├─ sidebar.js
│  │  ├─ pagination.js
│  │  ├─ searchFilter.js
│  │  └─ cartControls.js        (+/- quantity, remove item)
│  ├─ pages/
│  │  ├─ login.page.js
│  │  ├─ signup.page.js
│  │  ├─ dashboard.page.js
│  │  ├─ product-view.page.js
│  │  └─ cart.page.js
│  └─ main.js                   (shared bootstrapping)
│
└─ index.html                   (optional: redirect/landing)
```