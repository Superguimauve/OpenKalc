(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const views = ['calculator', 'converter', 'bmi', 'time'];
  const labels = {calculator:'Calculatrice',converter:'Convertisseur',bmi:'Calcul IMC',time:'Fuseaux horaires'};
  const titles = {
    calculator:['Les bons calculs,<br><em>simplement.</em>','Une calculatrice claire et quelques outils pratiques, toujours à portée de main.'],
    converter:['Convertir,<br><em>sans y penser.</em>','Des unités qui changent, un résultat qui tombe juste.'],
    bmi:['Prendre un repère,<br><em>avec douceur.</em>','Un indicateur simple pour mieux comprendre le rapport poids et taille.'],
    time:['Le monde à l’heure,<br><em>la vôtre aussi.</em>','Comparez les heures locales et gardez le contact, partout.']
  };
  const englishTitles = {
    calculator:['Good calculations,<br><em>made simple.</em>','A clear calculator and practical tools, always within reach.'],
    converter:['Convert units,<br><em>without a fuss.</em>','Change units and get a clear result right away.'],
    bmi:['Find a reference point,<br><em>with care.</em>','A simple indicator to understand the relationship between weight and height.'],
    time:['The world on time,<br><em>your time too.</em>','Compare local times and stay in touch, wherever you are.']
  };
  const en = {
    'ESPACE DE TRAVAIL':'WORKSPACE','Calculatrice':'Calculator','Convertisseur':'Converter','Calcul IMC':'BMI calculator','Fuseaux horaires':'World clock','Paramètres':'Settings','Mon espace':'My workspace','VOTRE BOÎTE À OUTILS':'YOUR TOOLBOX','CALCULATRICE':'CALCULATOR','Calcul rapide':'Quick calculation','Historique':'History','PRÊT À CALCULER':'READY TO CALCULATE','RÉSULTAT EN DIRECT':'LIVE RESULT','CALCUL EN COURS':'CALCULATING','EXPRESSION À VÉRIFIER':'CHECK YOUR EXPRESSION','Vérifiez votre calcul':'Check your calculation','Astuce : utilisez votre clavier':'Tip: use your keyboard','À portée de main':'At your fingertips','Calculer mon IMC':'Calculate my BMI','Repère santé personnel':'A personal health reference','Convertir une mesure':'Convert a measurement','Longueur, masse, température':'Length, mass, temperature','Quelle heure ailleurs ?':'What time is it elsewhere?','Comparer des fuseaux':'Compare time zones','Les mathématiques sont la poésie des idées.':'Mathematics is the poetry of ideas.','CONVERSION':'CONVERSION','Changer d’échelle':'Change the scale','18 familles · plus de 100 unités':'18 categories · 100+ units','Type de conversion':'Conversion type','Longueur':'Length','Masse':'Mass','Température':'Temperature','Volume':'Volume','Durée':'Time','Surface':'Area','Vitesse':'Speed','Pression':'Pressure','Énergie':'Energy','Puissance':'Power','Stockage numérique':'Digital storage','Débit de données':'Data rate','Fréquence':'Frequency','Angle':'Angle','Consommation':'Fuel economy','Force':'Force','Couple':'Torque','Masse volumique':'Density','Valeur':'Value','De':'From','Vers':'To','RÉSULTAT':'RESULT','Les conversions s’actualisent automatiquement. Les unités numériques utilisent les préfixes décimaux (base 10) et binaires (base 2).':'Conversions update automatically. Digital units use decimal (base 10) and binary (base 2) prefixes.','BIEN-ÊTRE':'WELLBEING','Votre indice de masse corporelle':'Your body mass index','Un repère, pas un diagnostic':'A reference, not a diagnosis','Taille':'Height','Poids':'Weight','VOTRE IMC':'YOUR BMI','Insuffisance':'Underweight','Corpulence normale':'Healthy range','Surpoids':'Overweight','Obésité':'Obesity','Insuffisance pondérale':'Underweight','L’IMC est un indicateur général. Il ne tient pas compte de la morphologie, de l’âge ou de la composition corporelle.':'BMI is a general indicator. It does not account for body shape, age, or body composition.','Un chiffre parmi d’autres':'One number among many','L’IMC aide à situer un rapport poids/taille chez l’adulte. Il ne remplace jamais l’avis d’un professionnel de santé.':'BMI helps describe the relationship between weight and height in adults. It never replaces advice from a health professional.','poids':'weight','HORLOGE MONDIALE':'WORLD CLOCK','Le monde, à l’heure juste':'The world, right on time','Ajouter une ville':'Add a city','Heure locale':'Local time','Les heures utilisent la base de fuseaux horaires de votre navigateur et suivent les changements saisonniers.':'Times use your browser’s time zone database and adjust for daylight saving changes.','même heure':'same time','Toutes les villes proposées sont déjà affichées.':'All available cities are already shown.','Ajouter une ville :':'Add a city:','Saisissez son numéro.':'Enter its number.','Numéro de ville non reconnu.':'City number not recognized.','Fait pour rendre les choses plus simples':'Made to make things simpler','À propos':'About','Apparence':'Appearance','Choisissez le thème de l’application':'Choose the app theme','Clair':'Light','Sombre':'Dark','Couleur d’accent':'Accent color','La couleur principale des boutons et détails':'The main color for buttons and details','Vert':'Green','Bleu':'Blue','Violet':'Purple','Corail':'Coral','Langue':'Language','Langue de l’interface':'Interface language','Animations':'Animations','Effets de mouvement et de survol':'Motion and hover effects','Vos préférences sont enregistrées sur cet appareil.':'Your preferences are saved on this device.','Fermer les paramètres':'Close settings','Thème':'Theme','Inverser les unités':'Swap units','Changer de thème':'Change theme','Un outil, mille idées.':'One tool, a thousand ideas.','OpenKalc rassemble les petits calculs qui facilitent le quotidien.':'OpenKalc brings everyday calculations together.','Calculs récents':'Recent calculations','Vos calculs apparaîtront ici':'Your calculations will appear here','OpenKalc — une boîte à outils pensée pour le quotidien.':'OpenKalc — a toolbox for everyday life.'
  };
  const originalForEnglish = Object.fromEntries(Object.entries(en).map(([fr,english])=>[english,fr]));
  let language = localStorage.getItem('openkalc-language') || 'fr';
  const locale = () => language === 'en' ? 'en-GB' : 'fr-FR';
  const dateFmt = new Intl.DateTimeFormat(locale(),{weekday:'long',day:'numeric',month:'long'});
  function applyLanguage(){
    const toEnglish=language==='en';
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;while((node=walker.nextNode())){const raw=node.nodeValue,trim=raw.trim();if(!trim)continue;const translated=toEnglish?en[trim]:originalForEnglish[trim];if(translated)node.nodeValue=raw.replace(trim,translated)}
    $$('[aria-label]').forEach(el=>{const label=el.getAttribute('aria-label');const translated=toEnglish?en[label]:originalForEnglish[label];if(translated)el.setAttribute('aria-label',translated)});
    document.documentElement.lang=language;document.title=language==='en'?'OpenKalc — calculations made simple':'OpenKalc — les bons calculs, simplement';
    $('#today').textContent=new Intl.DateTimeFormat(locale(),{weekday:'long',day:'numeric',month:'long'}).format(new Date());
    const current=$('.nav-item.active')?.dataset.view;if(current){$('#crumb').textContent=(toEnglish?englishTitles:titles)[current] ? (toEnglish?{calculator:'Calculator',converter:'Converter',bmi:'BMI calculator',time:'World clock'}:labels)[current] : labels[current];$('#pageTitle').innerHTML=(toEnglish?englishTitles:titles)[current][0];$('#pageDesc').textContent=(toEnglish?englishTitles:titles)[current][1]}
    syncNavIndicator();
  }
  function setLanguage(value){language=value;localStorage.setItem('openkalc-language',value);applyLanguage();if($('#convertType'))populateUnits(true);drawClocks()}
  $('#today').textContent = dateFmt.format(new Date());
  $('#timeDate').textContent = dateFmt.format(new Date());
  let screenAnimationTimer,headingAnimationTimer;
  function navigate(view) {
    if (!views.includes(view)) return;
    const oldView=$('.nav-item.active')?.dataset.view;
    if(oldView===view)return;
    window.clearTimeout(screenAnimationTimer);
    $$('.tool-panel').forEach(p=>p.classList.remove('is-leaving','slide-out-forward','slide-out-back','slide-in-forward','slide-in-back'));
    const oldPanel=oldView?$('#view-'+oldView):null;
    const oldIndex=views.indexOf(oldView),newIndex=views.indexOf(view);
    const direction=newIndex>oldIndex?'forward':'back';
    if(oldPanel){oldPanel.classList.add('is-leaving',`slide-out-${direction}`);oldPanel.classList.remove('active-view')}
    $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === view));
    const nextPanel=$('#view-'+view);nextPanel.classList.add('active-view',`slide-in-${direction}`);
    screenAnimationTimer=window.setTimeout(()=>{oldPanel?.classList.remove('is-leaving','slide-out-forward','slide-out-back');nextPanel.classList.remove('slide-in-forward','slide-in-back')},520);
    const currentTitles=language==='en'?englishTitles:titles;const currentLabels=language==='en'?{calculator:'Calculator',converter:'Converter',bmi:'BMI calculator',time:'World clock'}:labels;
    window.clearTimeout(headingAnimationTimer);
    const copyParts=[$('#pageTitle'),$('#pageDesc'),$('#crumb')];copyParts.forEach(el=>{el.classList.remove('menu-text-in','menu-text-out');el.classList.add('menu-text-out')});
    headingAnimationTimer=window.setTimeout(()=>{ $('#crumb').textContent=currentLabels[view];$('#pageTitle').innerHTML=currentTitles[view][0];$('#pageDesc').textContent=currentTitles[view][1];copyParts.forEach(el=>el.classList.remove('menu-text-out'));applyLanguage();copyParts.forEach(el=>el.classList.add('menu-text-in'));window.setTimeout(()=>copyParts.forEach(el=>el.classList.remove('menu-text-in')),360)},145);
    syncNavIndicator();
  }
  $$('.nav-item').forEach(b => b.addEventListener('click', () => navigate(b.dataset.view)));
  $$('[data-shortcut]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.shortcut)));
  const nav=$('.nav');
  const navIndicator=document.createElement('span');navIndicator.className='nav-indicator';navIndicator.setAttribute('aria-hidden','true');nav.prepend(navIndicator);
  function syncNavIndicator(){const active=$('.nav-item.active');if(!active)return;navIndicator.style.width=`${active.offsetWidth}px`;navIndicator.style.height=`${active.offsetHeight}px`;navIndicator.style.transform=`translate(${active.offsetLeft}px,${active.offsetTop}px)`}
  window.addEventListener('resize',syncNavIndicator);requestAnimationFrame(syncNavIndicator);
  document.addEventListener('click',e=>{const button=e.target.closest('button');if(!button||document.body.classList.contains('motion-off'))return;button.classList.remove('click-bounce');void button.offsetWidth;button.classList.add('click-bounce');button.addEventListener('animationend',()=>button.classList.remove('click-bounce'),{once:true})});

  let expr = '', memory = 0, last = null, history = [];
  const expressionEl = $('#expression'), answerEl = $('#answer');
  const format = n => Number.isFinite(n) ? Number(n.toPrecision(12)).toLocaleString(locale(),{maximumFractionDigits:10}) : 'Error';
  function evaluate(raw) {
    if (!raw.trim()) return null;
    const clean = raw.replace(/,/g,'.').replace(/×/g,'*').replace(/[÷]/g,'/').replace(/−/g,'-').replace(/%/g,'/100');
    if (!/^[\d+*/().\s-]+$/.test(clean)) throw new Error('Expression invalide');
    const result = Function(`"use strict"; return (${clean})`)();
    if (!Number.isFinite(result)) throw new Error('Calcul impossible');
    return result;
  }
  function renderCalc() {
    expressionEl.textContent = expr ? expr.replace(/\./g,',') : '0';
    $('#memoryTag').textContent = memory ? 'M' : '';
    try { const value = evaluate(expr); answerEl.textContent = value === null ? '\u00a0' : `= ${format(value)}`; $('#calcStatus').textContent = value === null ? 'PRÊT À CALCULER' : 'RÉSULTAT EN DIRECT'; }
    catch { answerEl.textContent = '\u00a0'; $('#calcStatus').textContent = 'CALCUL EN COURS'; }
    applyLanguage();
  }
  function pushValue(value) {
    if (/^[+×÷−]$/.test(value)) {
      if (!expr && value !== '−') return;
      if (/[+×÷−]$/.test(expr)) expr = expr.slice(0,-1);
    }
    if (value === '.') {
      const chunk = expr.split(/[+×÷−]/).pop(); if (chunk.includes('.')) return;
      if (!chunk) value = '0.';
    }
    expr += value; renderCalc();
  }
  function calculate() {
    try { const value = evaluate(expr); if (value === null) return; history.unshift({input:expr,output:format(value)}); history = history.slice(0,8); expr = String(Number(value.toPrecision(12))); last = value; renderCalc(); }
    catch { $('#calcStatus').textContent = 'EXPRESSION À VÉRIFIER'; answerEl.textContent = 'Vérifiez votre calcul'; }
  }
  $('#keypad').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.value !== undefined) pushValue(b.dataset.insert || b.dataset.value);
    if (b.dataset.action === 'clear') {expr='';renderCalc()}
    if (b.dataset.action === 'delete') {expr=expr.slice(0,-1);renderCalc()}
    if (b.dataset.action === 'equals') calculate();
    if (b.dataset.action === 'sign') { if (!expr) expr='−'; else if (/\d$/.test(expr)) { const m=expr.match(/(?:^|[+×÷−])(-?\d*\.?\d+)$/); if(m){const start=expr.length-m[1].length;expr=expr.slice(0,start)+(m[1].startsWith('-')?m[1].slice(1):'-'+m[1])} } renderCalc(); }
  });
  $$('.memory-row button').forEach(b => b.addEventListener('click', () => {const value=evaluate(expr);if(b.dataset.action==='mc')memory=0;if(b.dataset.action==='mr')pushValue(String(memory));if(b.dataset.action==='mplus'&&value!==null)memory+=value;if(b.dataset.action==='mminus'&&value!==null)memory-=value;renderCalc()}));
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^[0-9]$/.test(e.key)) pushValue(e.key);
    else if (e.key === '.') pushValue('.'); else if (e.key === ',') pushValue('.');
    else if (e.key === '+') pushValue('+'); else if (e.key === '-') pushValue('−'); else if (e.key === '*') pushValue('×'); else if (e.key === '/') {e.preventDefault();pushValue('÷')}
    else if (e.key === 'Enter' || e.key === '=') {e.preventDefault();calculate()}
    else if (e.key === 'Backspace') {expr=expr.slice(0,-1);renderCalc()} else if (e.key === 'Escape') {expr='';renderCalc()}
    else if (/^[1-4]$/.test(e.key) && !['INPUT','SELECT'].includes(document.activeElement.tagName)) navigate(views[Number(e.key)-1]);
  });
  let historyOpen = false;
  $('#historyToggle').addEventListener('click', () => {
    const old = $('.history-pop'); if(old){old.remove();historyOpen=false;return} historyOpen=true;
    const pop=document.createElement('div');pop.className='history-pop';pop.innerHTML='<h3>Calculs récents</h3>'+(history.length?history.map(h=>`<div class="history-item"><span>${h.input.replace(/</g,'&lt;')}</span><b>${h.output}</b></div>`).join(''):'<div class="history-item">Vos calculs apparaîtront ici</div>');$('.panel-top').append(pop);applyLanguage();
  });

  const units = {
    length:{'Millimètre (mm)':.001,'Centimètre (cm)':.01,'Mètre (m)':1,'Kilomètre (km)':1000,'Pouce (in)':.0254,'Pied (ft)':.3048,'Mile (mi)':1609.344},
    weight:{'Milligramme (mg)':.000001,'Gramme (g)':.001,'Kilogramme (kg)':1,'Tonne (t)':1000,'Livre (lb)':.45359237,'Once (oz)':.0283495},
    volume:{'Millilitre (ml)':.001,'Litre (L)':1,'Mètre cube (m³)':1000,'Cuillère à café':.00492892,'Tasse (US)':.236588,'Gallon (US)':3.78541},
    time:{'Seconde':1,'Minute':60,'Heure':3600,'Jour':86400,'Semaine':604800},
    temperature:{'Celsius (°C)':'C','Fahrenheit (°F)':'F','Kelvin (K)':'K'},
    area:{'Millimètre carré (mm²)':1e-6,'Centimètre carré (cm²)':1e-4,'Mètre carré (m²)':1,'Kilomètre carré (km²)':1e6,'Hectare (ha)':10000,'Are (a)':100,'Pouce carré (in²)':.00064516,'Pied carré (ft²)':.092903,'Acre':4046.856422},
    speed:{'Mètre par seconde (m/s)':1,'Kilomètre par heure (km/h)':1/3.6,'Mile par heure (mph)':.44704,'Nœud (kn)':.514444,'Pied par seconde (ft/s)':.3048},
    pressure:{'Pascal (Pa)':1,'Kilopascal (kPa)':1000,'Bar (bar)':100000,'Millibar (mbar)':100,'Atmosphère (atm)':101325,'Millimètre de mercure (mmHg)':133.322387,'PSI (lb/in²)':6894.757},
    energy:{'Joule (J)':1,'Kilojoule (kJ)':1000,'Calorie (cal)':4.184,'Kilocalorie (kcal)':4184,'Watt-heure (Wh)':3600,'Kilowatt-heure (kWh)':3600000,'Électronvolt (eV)':1.602176634e-19,'BTU':1055.056},
    power:{'Watt (W)':1,'Kilowatt (kW)':1000,'Cheval-vapeur (ch)':735.49875,'Horsepower (hp)':745.699872,'Mégawatt (MW)':1e6},
    data:{'Bit (b)':1,'Octet (B)':8,'Kilobit (kb)':1e3,'Kilooctet (kB)':8e3,'Kibioctet (KiB)':8*1024,'Mégaoctet (MB)':8e6,'Mebioctet (MiB)':8*1024**2,'Gigaoctet (GB)':8e9,'Gibioctet (GiB)':8*1024**3,'Téraoctet (TB)':8e12,'Tébioctet (TiB)':8*1024**4},
    dataRate:{'Bit par seconde (bit/s)':1,'Kilobit par seconde (kbit/s)':1e3,'Mégabit par seconde (Mbit/s)':1e6,'Gigabit par seconde (Gbit/s)':1e9,'Octet par seconde (B/s)':8,'Kilooctet par seconde (kB/s)':8e3,'Mégaoctet par seconde (MB/s)':8e6,'Gibioctet par seconde (MiB/s)':8*1024**2},
    frequency:{'Hertz (Hz)':1,'Kilohertz (kHz)':1e3,'Mégahertz (MHz)':1e6,'Gigahertz (GHz)':1e9,'Tour par minute (tr/min)':1/60},
    angle:{'Degré (°)':Math.PI/180,'Radian (rad)':1,'Grade (gon)':Math.PI/200,'Tour complet (tr)':2*Math.PI,'Minute d’arc (′)':Math.PI/10800},
    fuel:{'Litre aux 100 km (L/100 km)':1,'Kilomètre par litre (km/L)':2,'Mile par gallon US (mpg US)':3,'Mile par gallon impérial (mpg UK)':4},
    force:{'Newton (N)':1,'Kilonewton (kN)':1000,'Kilogramme-force (kgf)':9.80665,'Livre-force (lbf)':4.448221615,'Dyne (dyn)':1e-5},
    torque:{'Newton-mètre (N·m)':1,'Kilonewton-mètre (kN·m)':1000,'Livre-pied (lb·ft)':1.355817948,'Livre-pouce (lb·in)':.112984829},
    density:{'Kilogramme par mètre cube (kg/m³)':1,'Gramme par centimètre cube (g/cm³)':1000,'Gramme par millilitre (g/ml)':1000,'Livre par pied cube (lb/ft³)':16.018463,'Livre par gallon US (lb/gal US)':119.826}
  };
  function unitLabel(name){if(language==='fr')return name;const words=[['Mètre cube','Cubic meter'],['Millimètre carré','Square millimeter'],['Centimètre carré','Square centimeter'],['Kilomètre carré','Square kilometer'],['Mètre carré','Square meter'],['Pouce carré','Square inch'],['Pied carré','Square foot'],['Millimètre','Millimeter'],['Centimètre','Centimeter'],['Kilomètre','Kilometer'],['Mètre','Meter'],['Pouce','Inch'],['Pied','Foot'],['Gramme','Gram'],['Kilogramme','Kilogram'],['Milligramme','Milligram'],['Livre','Pound'],['Once','Ounce'],['Tonne','Metric ton'],['Millilitre','Milliliter'],['Litre','Liter'],['Cuillère à café','Teaspoon'],['par','per'],['de mercure','of mercury'],['Atmosphère','Atmosphere'],['Calorie','Calorie'],['Joule','Joule'],['Électronvolt','Electronvolt'],['Watt-heure','Watt-hour'],['Cheval-vapeur','Metric horsepower'],['Tour par minute','Revolutions per minute'],['Degré','Degree'],['Radian','Radian'],['Grade','Gradian'],['Tour complet','Full turn'],['Minute d’arc','Arcminute'],['Newton-mètre','Newton-meter'],['Kilonewton-mètre','Kilonewton-meter'],['Livre-pied','Pound-foot'],['Livre-pouce','Pound-inch'],['Gramme par','Gram per'],['Kilogramme par','Kilogram per'],['Seconde','Second'],['Heure','Hour'],['Jour','Day'],['Semaine','Week']];let result=name;for(const [fr,enName] of words)result=result.replaceAll(fr,enName);return result}
  function populateUnits(keep=true){const type=$('#convertType').value, a=$('#fromUnit'), b=$('#toUnit'), prevA=a.value,prevB=b.value;const opts=Object.keys(units[type]);a.innerHTML=b.innerHTML=opts.map(x=>`<option value="${x}">${unitLabel(x)}</option>`).join('');if(keep&&opts.includes(prevA))a.value=prevA;if(keep&&opts.includes(prevB))b.value=prevB;else b.selectedIndex=Math.min(1,opts.length-1);convert()}
  function tempConvert(v,from,to){const f=units.temperature[from],t=units.temperature[to];let c=f==='C'?v:f==='F'?(v-32)*5/9:v-273.15;return t==='C'?c:t==='F'?c*9/5+32:c+273.15}
  function fuelToKmPerL(v,unit){if(unit===Object.keys(units.fuel)[0])return v===0?Infinity:100/v;if(unit===Object.keys(units.fuel)[1])return v;if(unit===Object.keys(units.fuel)[2])return v*1.609344/3.785411784;return v*1.609344/4.54609}
  function kmPerLToFuel(kmPerL,unit){if(unit===Object.keys(units.fuel)[0])return kmPerL===0?Infinity:100/kmPerL;if(unit===Object.keys(units.fuel)[1])return kmPerL;if(unit===Object.keys(units.fuel)[2])return kmPerL*3.785411784/1.609344;return kmPerL*4.54609/1.609344}
  function convert(){const v=Number($('#fromValue').value),type=$('#convertType').value,from=$('#fromUnit').value,to=$('#toUnit').value;if(!Number.isFinite(v)){ $('#convertResult').textContent='—';return }const out=type==='temperature'?tempConvert(v,from,to):type==='fuel'?kmPerLToFuel(fuelToKmPerL(v,from),to):v*units[type][from]/units[type][to];const displayed=$('#toUnit').selectedOptions[0]?.textContent||to;$('#convertResult').textContent=`${Number(out.toPrecision(9)).toLocaleString(locale(),{maximumFractionDigits:8})} ${displayed.match(/\(([^)]+)\)/)?.[1]||displayed}`}
  $('#convertType').addEventListener('change',()=>populateUnits(false));$('#fromValue').addEventListener('input',convert);$('#fromUnit').addEventListener('change',convert);$('#toUnit').addEventListener('change',convert);$('#swapUnits').addEventListener('click',()=>{const a=$('#fromUnit'),b=$('#toUnit'),v=a.value;a.value=b.value;b.value=v;convert()});populateUnits(false);

  function bmi(){const h=Number($('#height').value)/100,w=Number($('#weight').value);if(h<=0||w<=0)return;const n=w/(h*h);$('#bmiValue').textContent=n.toLocaleString(locale(),{minimumFractionDigits:1,maximumFractionDigits:1});const label=n<18.5?'Insuffisance pondérale':n<25?'Corpulence normale':n<30?'Surpoids':'Obésité';$('#bmiLabel').textContent=label;$('#scaleMarker').style.left=`${Math.max(2,Math.min(96,(n-14)*4.4))}%`;applyLanguage()}
  $('#height').addEventListener('input',bmi);$('#weight').addEventListener('input',bmi);bmi();

  const cityList=[{city:'Paris',zone:'Europe/Paris'},{city:'New York',zone:'America/New_York'},{city:'Tokyo',zone:'Asia/Tokyo'},{city:'Londres',zone:'Europe/London'},{city:'Montréal',zone:'America/Montreal'},{city:'Sydney',zone:'Australia/Sydney'},{city:'Dubaï',zone:'Asia/Dubai'},{city:'Los Angeles',zone:'America/Los_Angeles'},{city:'Singapour',zone:'Asia/Singapore'}];let chosen=[cityList[0],cityList[1],cityList[2]];
  function drawClocks(){const now=new Date(),localZone=Intl.DateTimeFormat().resolvedOptions().timeZone;$('#localTime').textContent=new Intl.DateTimeFormat(locale(),{hour:'2-digit',minute:'2-digit'}).format(now);$('#timeDate').textContent=new Intl.DateTimeFormat(locale(),{weekday:'long',day:'numeric',month:'long'}).format(now);$('#clocks').innerHTML=chosen.map(item=>{const time=new Intl.DateTimeFormat(locale(),{timeZone:item.zone,hour:'2-digit',minute:'2-digit'}).format(now);const date=new Intl.DateTimeFormat(locale(),{timeZone:item.zone,weekday:'long',day:'numeric',month:'short'}).format(now);const localOffset=new Intl.DateTimeFormat('en-US',{timeZone:localZone,timeZoneName:'shortOffset'}).formatToParts(now).find(x=>x.type==='timeZoneName')?.value||'';const otherOffset=new Intl.DateTimeFormat('en-US',{timeZone:item.zone,timeZoneName:'shortOffset'}).formatToParts(now).find(x=>x.type==='timeZoneName')?.value||'';return `<article class="clock-card ${item.zone===localZone?'local':''}"><div class="clock-city">${item.city}</div><div class="clock-zone">${item.zone.replaceAll('_',' ')}</div><div class="clock-time">${time}</div><div class="clock-day">${date}</div><span class="clock-offset">${otherOffset===localOffset?(language==='en'?'same time':'même heure'):otherOffset}</span></article>`}).join('')}
  drawClocks();setInterval(drawClocks,15000);
  $('#addCity').addEventListener('click',()=>{const available=cityList.filter(c=>!chosen.some(x=>x.city===c.city));if(!available.length){toast('Toutes les villes proposées sont déjà affichées.');return}const promptTitle=language==='en'?'Add a city:':'Ajouter une ville :';const promptEnd=language==='en'?'Enter its number.':'Saisissez son numéro.';const choice=prompt(`${promptTitle}\n${available.map((c,i)=>`${i+1}. ${c.city}`).join('\n')}\n\n${promptEnd}`);if(choice===null)return;const city=available[Number(choice)-1];if(city){chosen.push(city);drawClocks()}else toast('Numéro de ville non reconnu.')});

  function toast(message){const t=$('#toast');t.textContent=language==='en'?(en[message]||message):message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2300)}
  $('#aboutLink').addEventListener('click',e=>{e.preventDefault();toast('OpenKalc — une boîte à outils pensée pour le quotidien.')});
  function setTheme(value){document.body.classList.toggle('dark',value==='dark');localStorage.setItem('openkalc-theme',value);$('#themeSelect').value=value}
  $('#themeToggle').addEventListener('click',()=>setTheme(document.body.classList.contains('dark')?'light':'dark'));
  const savedTheme=localStorage.getItem('openkalc-theme')||'light';document.body.classList.toggle('dark',savedTheme==='dark');
  const backdrop=$('#settingsBackdrop');
  let settingsReturnFocus=$('#settingsOpenTop')||$('#settingsOpen');
  function openSettings(e){settingsReturnFocus=e?.currentTarget||$('#settingsOpenTop')||$('#settingsOpen');backdrop.hidden=false;$('#settingsClose').focus()}
  function closeSettings(){backdrop.hidden=true;settingsReturnFocus?.focus()}
  $('#settingsOpen')?.addEventListener('click',openSettings);$('#settingsOpenTop')?.addEventListener('click',openSettings);$('#settingsClose')?.addEventListener('click',closeSettings);backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeSettings()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!backdrop.hidden)closeSettings()});
  $('#themeSelect').value=savedTheme;$('#themeSelect').addEventListener('change',e=>setTheme(e.target.value));
  const savedAccent=localStorage.getItem('openkalc-accent')||'green';
  function setAccent(name){document.body.dataset.accent=name;localStorage.setItem('openkalc-accent',name);$$('[data-accent-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.accentChoice===name)))}
  $$('[data-accent-choice]').forEach(b=>b.addEventListener('click',()=>setAccent(b.dataset.accentChoice)));setAccent(savedAccent);
  $('#languageSelect').value=language;$('#languageSelect').addEventListener('change',e=>setLanguage(e.target.value));
  const motionOn=localStorage.getItem('openkalc-motion')!=='off';$('#motionToggle').checked=motionOn;document.body.classList.toggle('motion-off',!motionOn);
  $('#motionToggle').addEventListener('change',e=>{document.body.classList.toggle('motion-off',!e.target.checked);localStorage.setItem('openkalc-motion',e.target.checked?'on':'off')});
  applyLanguage();
  renderCalc();
})();
