import { useState } from 'react';
import { Atom, RotateCcw, FlaskConical, ArrowDown, Info, Waves, Sun, Droplets, ShieldCheck, CircleHelp } from 'lucide-react';

const materials = [
  { id: 'pe', short: 'PE', name: 'Полиэтилен', label: 'Обычный полиэтилен', formula: '(—CH₂—CH₂—)ₙ', color: '#3c8eeb', note: 'Широко распространённый полимер с высокой стойкостью к воде и многим разбавленным кислотам и щелочам.' },
  { id: 'oxo', short: 'OXO', name: 'Оксо-разлагаемый PE', label: 'Полиэтилен с прооксидантами', formula: 'PE + прооксидант', color: '#ef9b48', note: 'Полиэтилен с добавками, ускоряющими окислительное старение при воздействии тепла, кислорода и ультрафиолета.' },
  { id: 'pha', short: 'PHA', name: 'Полигидроксиалканоат', label: 'PHA', formula: '(—O—CHR—CH₂—CO—)ₙ', color: '#43aa91', note: 'Семейство полиэфиров с разными свойствами; биологическое разложение возможно при подходящих условиях среды.' },
  { id: 'tps', short: 'TPS', name: 'Крахмальный термопласт', label: 'Крахмальный термопласт', formula: '(C₆H₁₀O₅)ₙ', color: '#9a79d5', note: 'Материал на основе крахмала. Поглощение воды и механические свойства зависят от рецептуры и пластификаторов.' },
];

const factors = [
  { id: 'acid', name: 'Кислота', formula: 'HCl', icon: Atom, text: 'Водный раствор соляной кислоты' },
  { id: 'alkali', name: 'Щёлочь', formula: 'NaOH', icon: FlaskConical, text: 'Водный раствор гидроксида натрия' },
  { id: 'water', name: 'Вода', formula: 'H₂O', icon: Droplets, text: 'Контакт с водой' },
  { id: 'oxidation', name: 'Окисление', formula: 'O₂', icon: Waves, text: 'Кислород и окислительная среда' },
  { id: 'uv', name: 'Ультрафиолет', formula: 'UV', icon: Sun, text: 'УФ-излучение и фотоокисление' },
];

const results = {
  pe: {
    acid: ['Высокая устойчивость', 'Полиэтилен обычно устойчив к разбавленным кислотам. Концентрированные реагенты, повышенная температура и длительность контакта могут изменить результат.'],
    alkali: ['Высокая устойчивость', 'Полиэтилен обычно устойчив к водным растворам многих щелочей. Оценка зависит от концентрации, температуры и конкретной марки.'],
    water: ['Высокая устойчивость', 'Полиэтилен практически не поглощает воду. При обычных условиях вода не вызывает заметного разрушения полимерной цепи.'],
    oxidation: ['Зависит от условий', 'Сильные окислители и длительное воздействие тепла могут вызывать окислительное старение полиэтилена. Кислород сам по себе не означает быстрое разрушение.'],
    uv: ['Средняя устойчивость', 'Длительное УФ-воздействие может вызвать медленное старение. Скорость зависит от стабилизаторов, толщины изделия и условий экспозиции.'],
  },
  oxo: {
    acid: ['Высокая устойчивость', 'Основа материала — полиэтилен, поэтому он обычно устойчив к разбавленным кислотам. Прооксидантная добавка не делает кислоту универсальным разрушителем.'],
    alkali: ['Высокая устойчивость', 'Полиэтиленовая основа обычно устойчива к водным растворам многих щелочей; свойства зависят от состава и условий контакта.'],
    water: ['Высокая устойчивость', 'Вода сама по себе обычно не запускает быстрое разрушение полиэтиленовой основы и не равна биологическому разложению.'],
    oxidation: ['Средняя устойчивость', 'Прооксидантные добавки могут ускорять окислительное старение при сочетании кислорода, тепла и других подходящих условий.'],
    uv: ['Низкая устойчивость', 'УФ-излучение способствует фотоокислению. В сочетании с кислородом и теплом прооксидантные добавки могут ускорить снижение молекулярной массы; это не доказывает полного биоразложения.'],
  },
  pha: {
    acid: ['Зависит от состава', 'Устойчивость зависит от конкретного PHA, концентрации кислоты, температуры и времени воздействия. Универсальная оценка для всего семейства невозможна.'],
    alkali: ['Зависит от состава', 'Щелочная среда может влиять на полиэфирные связи; скорость и выраженность изменений зависят от типа PHA и условий.'],
    water: ['Средняя устойчивость', 'Водостойкость и гидролитическая стабильность различаются у разных PHA. Биологическое разложение требует подходящих условий и не тождественно растворению.'],
    oxidation: ['Зависит от состава', 'Устойчивость к окислению определяется структурой конкретного PHA, добавками и условиями воздействия.'],
    uv: ['Зависит от состава', 'УФ-старение зависит от структуры полимера, стабилизаторов и среды; для семейства PHA нельзя задать единую оценку.'],
  },
  tps: {
    acid: ['Зависит от состава', 'Кислота может влиять на крахмальную фазу и добавки. Итоговые свойства сильно зависят от рецептуры, влажности и времени воздействия.'],
    alkali: ['Зависит от состава', 'Влияние щёлочи определяется составом крахмального термопласта, модификацией крахмала и условиями опыта.'],
    water: ['Низкая устойчивость', 'Крахмальная фаза может поглощать воду, набухать и менять механические свойства. Степень изменений зависит от пластификаторов и рецептуры.'],
    oxidation: ['Зависит от состава', 'Изменения зависят от рецептуры и добавок; нельзя приравнивать воздействие окислителя к гарантированному биоразложению.'],
    uv: ['Зависит от состава', 'УФ-воздействие и старение зависят от конкретных компонентов и стабилизаторов материала.'],
  },
};

const columns = [
  { id: 'acid', name: 'Кислоты' }, { id: 'alkali', name: 'Щёлочи' }, { id: 'water', name: 'Вода' },
  { id: 'oxidation', name: 'Окисление' }, { id: 'uv', name: 'УФ' }, { id: 'bio', name: 'Биосреда' },
];
const ratings = {
  pe: ['high', 'high', 'high', 'mixed', 'medium', 'low'],
  oxo: ['high', 'high', 'high', 'medium', 'low', 'mixed'],
  pha: ['mixed', 'mixed', 'medium', 'mixed', 'mixed', 'mixed'],
  tps: ['mixed', 'mixed', 'low', 'mixed', 'mixed', 'mixed'],
};
const ratingLabels = { high: 'Высокая', medium: 'Средняя', low: 'Низкая', mixed: 'Зависит от условий' };
const biodegradationLabels = { high: 'Высокий потенциал', medium: 'Умеренный потенциал', low: 'Низкий потенциал', mixed: 'Зависит от условий' };

function Molecule({ factor, material }) {
  const isUv = factor.id === 'uv';
  const isOxo = material.id === 'oxo';
  const isWater = factor.id === 'water';
  return <svg className={`molecule-scene ${isUv ? 'scene-uv' : ''}`} viewBox="0 0 700 340" role="img" aria-label={`Схема воздействия: ${factor.name} на материал ${material.label}`}>
    <defs><linearGradient id="chain" x1="0" x2="1"><stop stopColor={material.color}/><stop offset="1" stopColor="#a7c9ef"/></linearGradient><radialGradient id="bubble"><stop stopColor="#fff"/><stop offset="1" stopColor="#b7d8f7"/></radialGradient></defs>
    <ellipse cx="350" cy="278" rx="290" ry="28" fill="#dbe7f3" opacity=".48" />
    {isUv && <g className="uv-rays" stroke="#efc85a" strokeWidth="5" strokeLinecap="round" opacity=".72"><path d="M170 24l24 59M263 8l12 66M356 22v53M448 7l-10 67M535 28l-23 57" /></g>}
    <g className="polymer-chain" fill="none" stroke="url(#chain)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M81 174l50-43 50 43 50-43 50 43 50-43 50 43 50-43 50 43 50-43 50 43 50-43 50 43" />
      <path d="M81 225l50-43 50 43 50-43 50 43 50-43 50 43 50-43 50 43 50-43 50 43 50-43 50 43" opacity=".42" />
    </g>
    {[131,231,331,431,531].map((x, i) => <g key={x} className="chain-bead" style={{ animationDelay: `${i * 90}ms` }}><circle cx={x} cy={174} r="10" fill="#fff" stroke={material.color} strokeWidth="4"/><circle cx={x} cy={225} r="7" fill={material.color} opacity=".55"/></g>)}
    {isOxo && <g className="additive"><circle cx="580" cy="105" r="17" fill="#ffe0bc" stroke="#ea9b50" strokeWidth="3"/><text x="580" y="110" textAnchor="middle" fill="#b9651f" fontSize="12" fontWeight="700">O₂</text><circle cx="615" cy="128" r="5" fill="#e99e51"/></g>}
    <g className="reagent-molecule">
      {isWater ? <><line x1="570" y1="113" x2="603" y2="92" stroke="#5998dc" strokeWidth="5"/><line x1="570" y1="113" x2="603" y2="136" stroke="#5998dc" strokeWidth="5"/><circle cx="570" cy="113" r="17" fill="url(#bubble)" stroke="#5798d9" strokeWidth="3"/><circle cx="606" cy="91" r="11" fill="#fff" stroke="#ea7383" strokeWidth="3"/><circle cx="606" cy="138" r="11" fill="#fff" stroke="#ea7383" strokeWidth="3"/></> : <><circle cx="582" cy="112" r="19" fill="url(#bubble)" stroke="#5998dc" strokeWidth="3"/><text x="582" y="117" textAnchor="middle" fill="#316899" fontSize="12" fontWeight="700">{factor.formula}</text></>}
    </g>
    <text x="82" y="302" fill="#71829a" fontSize="12" fontWeight="700" letterSpacing="1.4">ПОЛИМЕРНАЯ ЦЕПЬ</text>
    <text x="540" y="180" fill="#71829a" fontSize="11" fontWeight="700">{factor.id === 'oxidation' ? 'O₂' : factor.formula}</text>
    {isUv && isOxo && <g className="chain-spark" fill="#f2b64d"><path d="M490 117l5 11 11 5-11 5-5 11-5-11-11-5 11-5z"/><path d="M523 151l4 8 8 4-8 4-4 8-4-8-8-4 8-4z"/></g>}
    <text x="350" y="327" textAnchor="middle" fill="#748399" fontSize="12">Схематическое представление взаимодействия</text>
  </svg>;
}

function App() {
  const [materialId, setMaterialId] = useState('pe');
  const [factorId, setFactorId] = useState('water');
  const material = materials.find((item) => item.id === materialId);
  const factor = factors.find((item) => item.id === factorId);
  const [verdict, explanation] = results[materialId][factorId];
  const reset = () => { setMaterialId('pe'); setFactorId('water'); };

  return <main className="page-shell">
    <header className="topbar"><a className="brand" href="#top" aria-label="На главную"><span className="brand-mark"><Atom size={21}/></span><span>POLYMER<span className="brand-light">LAB</span></span></a><a className="top-link" href="#comparison">Сравнение материалов <ArrowDown size={14}/></a></header>
    <section className="hero" id="top">
      <div className="eyebrow"><span className="eyebrow-dot"/> ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ <span className="eyebrow-rule"/></div>
      <h1>Химическая устойчивость<br/><span>пластмасс</span></h1>
      <p className="hero-copy">Исследуйте, как разные полимеры реагируют на химические<br className="desktop-break"/> и природные факторы — шаг за шагом.</p>
      <div className="hero-meta"><span><i className="meta-pulse"/> ИНТЕРАКТИВНЫЙ СИМУЛЯТОР</span><span>01 / 04 МАТЕРИАЛА</span></div>
    </section>

    <section className="lab-card" aria-label="Интерактивная лаборатория">
      <div className="lab-header"><div><div className="section-kicker">ЭКСПЕРИМЕНТ 01 <span>•</span> ВЫБЕРИТЕ ОБРАЗЕЦ</div><h2>Настройте эксперимент</h2></div><button className="reset-button" onClick={reset}><RotateCcw size={14}/> Сбросить</button></div>
      <div className="lab-controls">
        <div className="control-group"><div className="control-label"><span className="step">01</span> Материал</div><div className="material-options" role="group" aria-label="Выберите материал">
          {materials.map((item) => <button key={item.id} className={`material-option ${materialId === item.id ? 'selected' : ''}`} style={{'--swatch': item.color}} onClick={() => setMaterialId(item.id)} aria-pressed={materialId === item.id}><span className="material-swatch"/><span className="material-option-text"><strong>{item.short}</strong><small>{item.label}</small></span>{materialId === item.id && <span className="selected-check">✓</span>}</button>)}
        </div></div>
        <div className="control-group factor-group"><div className="control-label"><span className="step">02</span> Фактор воздействия</div><div className="factor-options" role="group" aria-label="Выберите фактор воздействия">
          {factors.map((item) => { const Icon = item.icon; return <button key={item.id} className={`factor-option ${factorId === item.id ? 'selected' : ''}`} onClick={() => setFactorId(item.id)} aria-pressed={factorId === item.id}><Icon size={17}/><span>{item.name}</span></button>; })}
        </div></div>
      </div>

      <div className="experiment-area" key={`${materialId}-${factorId}`}>
        <div className="experiment-title"><div><span className="live-indicator"/> ТЕКУЩИЙ ОПЫТ</div><span className="experiment-index">{material.short} <b>+</b> {factor.formula}</span></div>
        <div className="visual-stage"><div className="stage-glow"/><div className="stage-chip chip-left"><span style={{background: material.color}}/>{material.short} · {material.name}</div><div className="stage-chip chip-right"><span className="reagent-dot"/>{factor.name} · {factor.formula}</div><Molecule factor={factor} material={material}/></div>
        <article className="result-card" aria-live="polite"><div className="result-icon"><ShieldCheck size={19}/></div><div className="result-content"><div className="result-heading"><div><span className="result-label">РЕЗУЛЬТАТ ВОЗДЕЙСТВИЯ</span><h3>{material.label} <span>+</span> {factor.name}</h3></div><span className={`verdict verdict-${ratings[materialId][columns.findIndex((col) => col.id === factorId)]}`}>{verdict}</span></div><p>{explanation}</p></div></article>
        <div className="science-note"><Info size={15}/><span>Схема условная: результат зависит от марки полимера, концентрации реагента, температуры и длительности воздействия.</span></div>
      </div>
    </section>

    <section className="comparison-section" id="comparison"><div className="comparison-heading"><div><div className="section-kicker">СПРАВОЧНЫЕ ДАННЫЕ <span>•</span> 04 МАТЕРИАЛА</div><h2>Сравнение устойчивости</h2></div><span className="table-caption"><CircleHelp size={15}/> Ориентировочные оценки</span></div>
      <div className="table-wrap"><table><thead><tr><th>Материал</th>{columns.map((col) => <th key={col.id}>{col.name}</th>)}</tr></thead><tbody>{materials.map((item) => <tr key={item.id} className={materialId === item.id ? 'active-row' : ''}><td><button className="table-material" onClick={() => { setMaterialId(item.id); document.querySelector('.lab-card')?.scrollIntoView({behavior:'smooth', block:'start'}); }}><span className="table-swatch" style={{background:item.color}}/><span><strong>{item.short}</strong><small>{item.name}</small></span></button></td>{ratings[item.id].map((rating, i) => <td key={columns[i].id}><span className={`rating rating-${rating}`}><i/>{columns[i].id === 'bio' ? biodegradationLabels[rating] : ratingLabels[rating]}</span></td>)}</tr>)}</tbody></table></div>
      <div className="legend"><span><i className="legend-dot high"/> Высокая устойчивость</span><span><i className="legend-dot medium"/> Средняя</span><span><i className="legend-dot low"/> Низкая</span><span><i className="legend-dot mixed"/> Зависит от условий</span></div>
      <p className="table-note"><Info size={14}/> В столбце «Биоразложение» показан потенциал разложения, а не устойчивость: для PHA и TPS он зависит от состава и подходящих условий среды. Оксо-фрагментация не гарантирует полного биоразложения. Этот процесс не равен растворению в воде.</p>
    </section>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><Atom size={18}/></span><span>POLYMER<span className="brand-light">LAB</span></span></a><span>Учебная модель • Химические свойства полимеров</span><a href="#top">Наверх ↑</a></footer>
  </main>;
}

export default App;
