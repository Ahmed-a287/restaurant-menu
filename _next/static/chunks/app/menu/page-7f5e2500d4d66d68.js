(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[904],{484:(e,a,t)=>{"use strict";t.d(a,{default:()=>m});var l=t(5155),s=t(2115),n=t(7426),r=t.n(n),i=t(6874),c=t.n(i),o=t(6766);let m=()=>{let[e,a]=(0,s.useState)(!1);return(0,l.jsxs)("nav",{className:r().navbar,children:[(0,l.jsx)("div",{className:r().logoContainer,children:(0,l.jsx)(o.default,{src:"/media/logoo.png",alt:"Logo",width:100,height:100,priority:!0})}),(0,l.jsxs)("div",{className:r().titleContainer,children:[(0,l.jsx)("h1",{className:r().title,children:"Flavor Haven"}),(0,l.jsx)("h3",{className:r().subTitle,children:"A welcoming place where every dish is a treat!"})]}),(0,l.jsxs)("div",{className:r().burger,onClick:()=>{a(!0),setTimeout(()=>{a(!1)},5e3)},role:"button","aria-label":"Toggle menu",children:[(0,l.jsx)("div",{className:r().burgerLine}),(0,l.jsx)("div",{className:r().burgerLine}),(0,l.jsx)("div",{className:r().burgerLine})]}),(0,l.jsx)("div",{className:"".concat(r().overlay," ").concat(e?r().showOverlay:""),role:"navigation","data-testid":"menu-overlay",children:(0,l.jsxs)("ul",{className:r().navLinks,children:[(0,l.jsx)("li",{children:(0,l.jsx)(c(),{href:"/",children:"Home"})}),(0,l.jsx)("li",{children:(0,l.jsx)(c(),{href:"/menu",children:"Menu"})}),(0,l.jsx)("li",{children:(0,l.jsx)(c(),{href:"/about",children:"About Us"})})]})})]})}},6209:(e,a,t)=>{Promise.resolve().then(t.bind(t,6685))},6685:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>h});var l=t(5155),s=t(2115);let n="https://www.themealdb.com/api/json/v1/1",r=async()=>{try{let e=await fetch("".concat(n,"/list.php?c=list"));return(await e.json()).meals.map(e=>e.strCategory)}catch(e){return console.error("Error fetching categories:",e),[]}},i=async e=>{try{let a=await fetch("".concat(n,"/filter.php?c=").concat(e));return(await a.json()).meals||[]}catch(a){return console.error("Error fetching meals for category ".concat(e,":"),a),[]}},c=async e=>{try{let a=await fetch("".concat(n,"/lookup.php?i=").concat(e));return(await a.json()).meals[0]||null}catch(a){return console.error("Error fetching details for meal ".concat(e,":"),a),null}};var o=t(9653),m=t.n(o);let u=()=>{let[e,a]=(0,s.useState)([]),[t,n]=(0,s.useState)(null),[o,u]=(0,s.useState)([]),[_,d]=(0,s.useState)(null),[h,g]=(0,s.useState)(!1),v=["Miscellaneous","Goat","Pork","Starter","Vegan"];(0,s.useEffect)(()=>{(async()=>{let e=(await r()).filter(e=>!v.includes(e));a(await Promise.all(e.map(async e=>{let a=(await i(e))[0]||null;return{category:e,image:a?a.strMealThumb:""}})))})()},[]);let j=async e=>{n(e),u([]),d(null),g(!0),u((await i(e)).slice(0,6))},x=async e=>{d(await c(e))};return(0,l.jsxs)("div",{className:m().container,children:[(0,l.jsx)("h1",{className:m().title,children:"MENU"}),(0,l.jsx)("ul",{className:m().categoryList,children:e.map((e,a)=>(0,l.jsx)("div",{className:m().mealContainer,children:(0,l.jsxs)("li",{className:m().categoryItem,onClick:()=>j(e.category),children:[(0,l.jsx)("img",{src:e.image,alt:e.category,className:m().categoryImage}),(0,l.jsx)("span",{children:e.category})]})},"".concat(e.category,"-").concat(a)))}),h&&(0,l.jsxs)("div",{className:m().overlay,children:[(0,l.jsx)("button",{className:m().closeButton,onClick:()=>{g(!1),n(null),d(null)},children:"❌"}),_?(0,l.jsxs)("div",{className:m().mealDetails,children:[(0,l.jsx)("button",{className:m().backToMeals,onClick:()=>d(null),"data-testid":"back-to-meals-button",children:"↩"}),(0,l.jsx)("h2",{className:m().mealTitle,children:_.strMeal}),(0,l.jsx)("img",{src:_.strMealThumb,alt:_.strMeal,className:m().mealDetailImage}),(0,l.jsx)("h4",{children:"Ingredients:"}),(0,l.jsx)("ul",{className:m().ingredientsList,children:[...Array(20)].map((e,a)=>{let t=_["strIngredient".concat(a+1)],s=_["strMeasure".concat(a+1)],n=null==t?void 0:t.replace(/^[0-9]*\.?\s*/g,"").trim(),r=null==s?void 0:s.replace(/^[0-9]*\.?\s*/g,"").trim();return a<6&&t?(0,l.jsxs)("li",{children:[r," ",n]},"".concat(a,"-").concat(n)):null})})]}):(0,l.jsxs)("div",{className:m().mealsSection,children:[(0,l.jsxs)("h2",{className:m().sectionTitle,children:[t," Meals"]}),(0,l.jsx)("ul",{className:m().mealsList,children:o.map((e,a)=>(0,l.jsxs)("li",{className:m().mealItem,onClick:()=>x(e.idMeal),children:[(0,l.jsx)("img",{src:e.strMealThumb,alt:e.strMeal,className:m().mealImage}),(0,l.jsx)("span",{children:e.strMeal})]},"".concat(e.idMeal,"-").concat(a)))})]})]})]})};var _=t(484),d=t(9503);function h(){return(0,l.jsxs)("div",{children:[(0,l.jsx)(_.default,{}),(0,l.jsx)(u,{}),(0,l.jsx)(d.default,{})]})}},7137:e=>{e.exports={footer:"footer_footer__Q4r1P"}},7426:e=>{e.exports={navbar:"navbar_navbar__O5KRa",logoContainer:"navbar_logoContainer__ppVGx",titleContainer:"navbar_titleContainer__R3TQV",title:"navbar_title__Xv6s3",subTitle:"navbar_subTitle__OAKS2",burger:"navbar_burger__yznQQ",burgerLine:"navbar_burgerLine__bJmCf",overlay:"navbar_overlay__Eo4z5",showOverlay:"navbar_showOverlay__53ySE",navLinks:"navbar_navLinks__9iLU_"}},9503:(e,a,t)=>{"use strict";t.d(a,{default:()=>r});var l=t(5155);t(2115);var s=t(7137),n=t.n(s);let r=()=>(0,l.jsx)("footer",{className:n().footer,children:(0,l.jsxs)("p",{children:["\xa9 ",new Date().getFullYear()," Restaurant. All rights reserved."]})})},9653:e=>{e.exports={container:"menu_container__9M427",title:"menu_title__YIWCh",categoryList:"menu_categoryList__s6_83",categoryItem:"menu_categoryItem__GGy9d",categoryImage:"menu_categoryImage__bPBGc",overlay:"menu_overlay__EBvDH",mealsSection:"menu_mealsSection__Vy2TD",fadeIn:"menu_fadeIn__b2jX9",sectionTitle:"menu_sectionTitle__Rw3SM",mealsList:"menu_mealsList___rJm9",mealItem:"menu_mealItem__Hube0",mealImage:"menu_mealImage__khXfo",closeButton:"menu_closeButton__YOd1k",mealDetails:"menu_mealDetails__4eVPJ",mealTitle:"menu_mealTitle__F6HKM",mealDetailImage:"menu_mealDetailImage__Z8p4Q",ingredientsTitle:"menu_ingredientsTitle__CePC_",ingredientsList:"menu_ingredientsList__MgHu7",ingredientItem:"menu_ingredientItem__ubaff",backToMeals:"menu_backToMeals__ph_89"}}},e=>{var a=a=>e(e.s=a);e.O(0,[377,282,259,441,684,358],()=>a(6209)),_N_E=e.O()}]);