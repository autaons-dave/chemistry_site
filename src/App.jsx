import { useState } from 'react';
import { Atom, RotateCcw, FlaskConical, ArrowDown, Info, Waves, Sun, Droplets, ShieldCheck, CircleHelp } from 'lucide-react';

const materials = [
  { id: 'pe', short: 'PE', name: 'Полиэтилен', label: 'Обычный полиэтилен', formula: '(—CH₂—CH₂—)ₙ', color: '#3c8eeb', note: 'Широко распространённый полимер с высокой стойкостью к воде и многим разбавленным кислотам и щелочам.' },
  { id: 'oxo', short: 'OXO', name: 'Оксо-разлагаемый PE', label: 'Полиэтилен с прооксидантами', formula: 'PE + прооксидант', color: '#ef9b48', note: 'Полиэтилен с добавками, ускоряющими окислительное старение при воздействии тепла, кислорода и ультрафиолета.' },
  { id: 'pha', short: 'PHA', name: 'Полигидроксиалканоат', label: 'PHA', formula: '(—O—CHR—CH₂—CO—)ₙ', color: '#43aa91', note: 'Семейство полиэфиров с разными свойствами; биологическое разложение возможно при подходящих условиях среды.' },
  { id: 'tps', short: 'TPS', name: 'Крахмальный термопласт', label: 'Крахмальный термопласт', formula: '(C₆H₁₀O₅)ₙ', color: '#9a79d5', note: 'Материал на основе крахмала. Поглощение воды и механические свойства зависят от рецептуры и пластификаторов.' },
  { id: 'rubber', short: 'NR', name: 'Натуральный каучук', label: 'cis-1,4-полиизопрен · контрольный образец', formula: '(—CH₂—C(CH₃)=CH—CH₂—)ₙ', color: '#c7864a', note: 'Контрольный образец: в цепи есть двойные связи C=C, которые реагируют с озоном.' },
];

const factors = [
  { id: 'acid', name: 'Кислота', formula: 'HCl', icon: Atom, text: 'Водный раствор соляной кислоты' },
  { id: 'alkali', name: 'Щёлочь', formula: 'NaOH', icon: FlaskConical, text: 'Водный раствор гидроксида натрия' },
  { id: 'water', name: 'Вода', formula: 'H₂O', icon: Droplets, text: 'Контакт с водой' },
  { id: 'oxidation', name: 'Окисление', formula: 'O₂', icon: Waves, text: 'Кислород и окислительная среда' },
  { id: 'uv', name: 'Ультрафиолет', formula: 'UV', icon: Sun, text: 'УФ-излучение и фотоокисление' },
  { id: 'ozone', name: 'Озон', formula: 'O₃', icon: Atom, text: 'Сильный окислитель; наглядный пример — каучук' },
];

const results = {
  pe: {
    acid: ['Устойчив', 'Разбавленные кислоты обычно не разрушают PE. Концентрация и температура имеют значение.'],
    alkali: ['Устойчив', 'Многие водные щёлочи почти не воздействуют на PE при обычных условиях.'],
    water: ['Устойчив', 'PE почти не поглощает воду: цепь остаётся целой.'],
    oxidation: ['Зависит от условий', 'Сильные окислители и тепло могут старить PE; обычный кислород не разрушает его мгновенно.'],
    uv: ['Стареет медленно', 'Долгий УФ-контакт повреждает PE постепенно. Стабилизаторы замедляют процесс.'],
    ozone: ['Высокая устойчивость', 'В цепи полиэтилена нет двойной связи C=C, на которую озон быстро атакует каучук. Это не означает абсолютную стойкость к любому окислителю.'],
  },
  oxo: {
    acid: ['Устойчив', 'PE-основа обычно стойкая к разбавленным кислотам.'],
    alkali: ['Устойчив', 'PE-основа обычно стойкая к водным щелочам.'],
    water: ['Устойчив', 'Вода не запускает быстрое разрушение PE-основы.'],
    oxidation: ['Окисляется быстрее', 'Добавки могут ускорить старение при наличии тепла и кислорода.'],
    uv: ['Чувствителен', 'Свет, тепло и кислород ускоряют окисление цепей. Фрагментация не означает полного биоразложения.'],
    ozone: ['Зависит от состава', 'Озон быстро реагирует с ненасыщенными связями, но скорость для этого материала зависит от рецептуры, добавок и условий воздействия.'],
  },
  pha: {
    acid: ['Зависит от состава', 'Стойкость различается у разных видов PHA и условий опыта.'],
    alkali: ['Зависит от состава', 'Щёлочь может влиять на полиэфирные связи; важны тип PHA и условия.'],
    water: ['Умеренная стойкость', 'Вода может влиять на отдельные виды PHA; разложение требует подходящей среды.'],
    oxidation: ['Зависит от состава', 'Результат зависит от структуры PHA и условий.'],
    uv: ['Зависит от состава', 'УФ-старение зависит от типа PHA и стабилизаторов.'],
    ozone: ['Зависит от состава', 'Реакция озона зависит от типа PHA и его химической структуры; универсального вывода для всего семейства нет.'],
  },
  tps: {
    acid: ['Зависит от состава', 'Кислота может менять крахмальную фазу и свойства добавок.'],
    alkali: ['Зависит от состава', 'Влияние щёлочи зависит от рецептуры и модификации крахмала.'],
    water: ['Поглощает воду', 'Крахмал может набухать и терять прочность; важна рецептура.'],
    oxidation: ['Зависит от состава', 'Реакция зависит от рецептуры и добавок.'],
    uv: ['Зависит от состава', 'Старение зависит от добавок и стабилизаторов.'],
    ozone: ['Зависит от состава', 'Поведение крахмального термопласта под действием озона зависит от рецептуры и добавок.'],
  },
  rubber: {
    acid: ['Зависит от условий', 'Кислоты могут влиять на резину и добавки.'],
    alkali: ['Зависит от состава', 'Стойкость каучуковых смесей различается.'],
    water: ['Не растворяется', 'Вода может влиять на добавки и свойства изделия.'],
    oxidation: ['Стареет', 'Кислород и тепло ускоряют старение; добавки его замедляют.'],
    uv: ['Стареет', 'Свет и кислород могут окислять каучук.'],
    ozone: ['Быстро реагирует', 'Озон атакует C=C в полиизопрене: цепь окисляется и может разрываться. Под натяжением возникают трещины.'],
  },
};

const columns = [
  { id: 'acid', name: 'Кислоты' }, { id: 'alkali', name: 'Щёлочи' }, { id: 'water', name: 'Вода' },
  { id: 'oxidation', name: 'Окисление' }, { id: 'uv', name: 'УФ' }, { id: 'ozone', name: 'Озон' }, { id: 'bio', name: 'Биосреда' },
];
const ratings = {
  pe: ['high', 'high', 'high', 'mixed', 'medium', 'high', 'low'],
  oxo: ['high', 'high', 'high', 'medium', 'low', 'mixed', 'mixed'],
  pha: ['mixed', 'mixed', 'medium', 'mixed', 'mixed', 'mixed', 'mixed'],
  tps: ['mixed', 'mixed', 'low', 'mixed', 'mixed', 'mixed', 'mixed'],
  rubber: ['mixed', 'mixed', 'medium', 'low', 'low', 'low', 'mixed'],
};
const ratingLabels = { high: 'Высокая', medium: 'Средняя', low: 'Низкая', mixed: 'Зависит от условий' };
const biodegradationLabels = { high: 'Высокий потенциал', medium: 'Умеренный потенциал', low: 'Низкий потенциал', mixed: 'Зависит от условий' };

function Molecule({ factor, material }) {
  const isOzoneRubber = factor.id === 'ozone' && material.id === 'rubber';
  const isUv = factor.id === 'uv';
  const isOxo = material.id === 'oxo';
  const isWater = factor.id === 'water';
  return <svg className={`molecule-scene ${isUv ? 'scene-uv' : ''}`} viewBox="0 0 700 340" role="img" aria-label={`Схема воздействия: ${factor.name} на материал ${material.label}`}>
    <defs><linearGradient id="chain" x1="0" x2="1"><stop stopColor={material.color}/><stop offset="1" stopColor="#a7c9ef"/></linearGradient><radialGradient id="bubble"><stop stopColor="#fff"/><stop offset="1" stopColor="#b7d8f7"/></radialGradient><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#63ad8c"/></marker></defs>
    <ellipse cx="350" cy="273" rx="275" ry="22" fill="#dbe7f3" opacity=".48" />
    {isUv && <g className="uv-rays" stroke="#efc85a" strokeWidth="5" strokeLinecap="round" opacity=".72"><path d="M170 24l24 59M263 8l12 66M356 22v53M448 7l-10 67M535 28l-23 57" /></g>}
    {isOzoneRubber ? <>
      <g className="rubber-left"><path d="M54 185l48-38 48 38 48-38 48 38 48-38 48 38 23-18" fill="none" stroke={material.color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/><path d="M54 225l48-38 48 38 48-38 48 38 48-38 48 38 23-18" fill="none" stroke={material.color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity=".38"/></g>
      <g className="rubber-right"><path d="M409 167l23-20 48 38 48-38 48 38 48-38 30 24" fill="none" stroke={material.color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/><path d="M409 207l23-20 48 38 48-38 48 38 48-38 30 24" fill="none" stroke={material.color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity=".38"/></g>
      <g className="ozone-double-bond"><path d="M365 166h44M365 174h44" stroke="#a34c2e" strokeWidth="5" strokeLinecap="round"/><text x="387" y="151" textAnchor="middle" fill="#a34c2e" stroke="none" fontSize="16" fontWeight="800">C=C</text></g>
      <g className="ozone-products"><path d="M370 166l-17-9M408 166l17-9" stroke="#d16b54" strokeWidth="4"/><circle cx="348" cy="153" r="14" fill="#e3f2ea" stroke="#49a885" strokeWidth="3"/><circle cx="430" cy="153" r="14" fill="#e3f2ea" stroke="#49a885" strokeWidth="3"/><text x="348" y="158" textAnchor="middle" fill="#397c66" stroke="none" fontSize="12" fontWeight="800">O</text><text x="430" y="158" textAnchor="middle" fill="#397c66" stroke="none" fontSize="12" fontWeight="800">O</text><text x="389" y="211" textAnchor="middle" fill="#c65b4c" stroke="none" fontSize="12" fontWeight="800">ЦЕПЬ РАЗОРВАНА</text></g>
    </> : <g className="polymer-chain" fill="none" stroke="url(#chain)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"><path d="M48 174l48-43 48 43 48-43 48 43 48-43 48 43 48-43 48 43 48-43 48 43 48-43 48 43"/><path d="M48 225l48-43 48 43 48-43 48 43 48-43 48 43 48-43 48 43 48-43 48 43 48-43 48 43" opacity=".42"/>{[96,192,288,384,480,576].map((x,i)=><g key={x} className="chain-bead" style={{animationDelay:`${i*70}ms`}}><circle cx={x} cy={131} r="10" fill="#fff" stroke={material.color} strokeWidth="4"/><circle cx={x} cy={182} r="7" fill={material.color} opacity=".55"/></g>)}</g>}
    {isOxo && <g className="additive"><circle cx="580" cy="105" r="17" fill="#ffe0bc" stroke="#ea9b50" strokeWidth="3"/><text x="580" y="110" textAnchor="middle" fill="#b9651f" fontSize="12" fontWeight="700">O₂</text><circle cx="615" cy="128" r="5" fill="#e99e51"/></g>}
    {isWater ? <g className="water-molecule"><path d="M562 124l-27 34M562 124l27 34" fill="none" stroke="#5998dc" strokeWidth="6" strokeLinecap="round"/><circle cx="562" cy="124" r="22" fill="url(#bubble)" stroke="#5798d9" strokeWidth="3"/><circle cx="535" cy="158" r="17" fill="#fff" stroke="#ea7383" strokeWidth="3"/><circle cx="589" cy="158" r="17" fill="#fff" stroke="#ea7383" strokeWidth="3"/><text x="562" y="130" textAnchor="middle" fill="#316899" fontSize="15" fontWeight="800">O</text><text x="535" y="163" textAnchor="middle" fill="#b95064" fontSize="12" fontWeight="800">H</text><text x="589" y="163" textAnchor="middle" fill="#b95064" fontSize="12" fontWeight="800">H</text></g> : isOzoneRubber ? <><path className="attack-trail" d="M530 145Q474 121 421 163" fill="none" stroke="#63ad8c" strokeWidth="3" strokeDasharray="7 8" markerEnd="url(#arrow)"/><g className="ozone-molecule"><path d="M548 100l32 18M580 118l25 22" fill="none" stroke="#49a885" strokeWidth="5" strokeLinecap="round"/><circle cx="548" cy="100" r="18" fill="#d8eee4" stroke="#49a885" strokeWidth="3"/><circle cx="580" cy="118" r="18" fill="#c5e4d5" stroke="#49a885" strokeWidth="3"/><circle cx="605" cy="140" r="18" fill="#d8eee4" stroke="#49a885" strokeWidth="3"/><text x="548" y="105" textAnchor="middle" fill="#397c66" fontSize="12" fontWeight="800">O</text><text x="580" y="123" textAnchor="middle" fill="#397c66" fontSize="12" fontWeight="800">O</text><text x="605" y="145" textAnchor="middle" fill="#397c66" fontSize="12" fontWeight="800">O</text></g></> : <g className="reagent-molecule"><circle cx="570" cy="117" r="24" fill="url(#bubble)" stroke="#5998dc" strokeWidth="3"/><text x="570" y="122" textAnchor="middle" fill="#316899" fontSize="13" fontWeight="800">{factor.formula}</text></g>}
    <text x="63" y="291" fill="#71829a" fontSize="13" fontWeight="700" letterSpacing="1.1">{isOzoneRubber ? 'НАТУРАЛЬНЫЙ КАУЧУК' : 'ПОЛИМЕРНАЯ ЦЕПЬ'}</text>
    {isOzoneRubber ? <text x="390" y="308" textAnchor="middle" fill="#748399" fontSize="14" fontWeight="700">O₃ атакует двойную связь C=C</text> : <text x="350" y="316" textAnchor="middle" fill="#748399" fontSize="12">{factor.formula} · схема взаимодействия</text>}
    {isUv && isOxo && <g className="chain-spark" fill="#f2b64d"><path d="M490 117l5 11 11 5-11 5-5 11-5-11-11-5 11-5z"/><path d="M523 151l4 8 8 4-8 4-4 8-4-8-8-4 8-4z"/></g>}
    {isOzoneRubber ? <text x="350" y="315" textAnchor="middle" fill="#748399" fontSize="15" fontWeight="700">–C=C– + O₃ → окисленные фрагменты цепи</text> : <text x="350" y="327" textAnchor="middle" fill="#748399" fontSize="12">Схема взаимодействия</text>}
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
      <p className="hero-copy">Проверьте действие реагентов на структуру полимера.</p>
      <div className="hero-meta"><span><i className="meta-pulse"/> ИНТЕРАКТИВНЫЙ СИМУЛЯТОР</span><span>01 / 04 МАТЕРИАЛА</span></div>
    </section>

    <section className="lab-card" aria-label="Интерактивная лаборатория">
      <div className="lab-header"><div><div className="section-kicker">ЭКСПЕРИМЕНТ 01 <span>•</span> ВЫБЕРИТЕ ОБРАЗЕЦ</div><h2>Настройте эксперимент</h2></div><button className="reset-button" onClick={reset}><RotateCcw size={14}/> Сбросить</button></div>
      <div className="lab-controls">
        <div className="control-group"><div className="control-label"><span className="step">01</span> Материал</div><div className="material-options" role="group" aria-label="Выберите материал">
          {materials.map((item) => <button key={item.id} className={`material-option ${materialId === item.id ? 'selected' : ''}`} style={{'--swatch': item.color}} onClick={() => setMaterialId(item.id)} aria-pressed={materialId === item.id}><span className="material-swatch"/><span className="material-option-text"><strong>{item.short}</strong><small>{item.id === 'rubber' ? 'Контроль · C=C' : item.label}</small></span>{materialId === item.id && <span className="selected-check">✓</span>}</button>)}
        </div></div>
        <div className="control-group factor-group"><div className="control-label"><span className="step">02</span> Фактор воздействия</div><div className="factor-options" role="group" aria-label="Выберите фактор воздействия">
          {factors.map((item) => { const Icon = item.icon; return <button key={item.id} className={`factor-option ${factorId === item.id ? 'selected' : ''}`} onClick={() => setFactorId(item.id)} aria-label={`${item.name}: ${item.text}`} aria-pressed={factorId === item.id}><Icon size={17}/><span>{item.name}</span></button>; })}
        </div></div>
      </div>

      <div className="experiment-area" key={`${materialId}-${factorId}`}>
        <div className="experiment-title"><div><span className="live-indicator"/> ТЕКУЩИЙ ОПЫТ</div><span className="experiment-index">{material.short} <b>+</b> {factor.formula}</span></div>
        <div className="visual-stage"><div className="stage-glow"/><div className="stage-chip chip-left"><span style={{background: material.color}}/>{material.short} · {material.name}</div><div className="stage-chip chip-right"><span className="reagent-dot"/>{factor.name} · {factor.formula}</div><Molecule factor={factor} material={material}/></div>
        <article className="result-card" aria-live="polite"><div className="result-icon"><ShieldCheck size={19}/></div><div className="result-content"><div className="result-heading"><div><span className="result-label">РЕЗУЛЬТАТ ВОЗДЕЙСТВИЯ</span><h3>{material.label} <span>+</span> {factor.name}</h3></div><span className={`verdict verdict-${ratings[materialId][columns.findIndex((col) => col.id === factorId)]}`}>{verdict}</span></div><p>{explanation}</p></div></article>
        <div className="science-note"><Info size={15}/><span>Схема упрощена. Результат зависит от состава, температуры и времени контакта.</span></div>
      </div>
    </section>

    <section className="comparison-section" id="comparison"><div className="comparison-heading"><div><div className="section-kicker">СПРАВОЧНЫЕ ДАННЫЕ</div><h2>Сравнение устойчивости</h2></div><span className="table-caption"><CircleHelp size={15}/> Ориентировочно</span></div>
      <div className="table-wrap"><table><thead><tr><th>Материал</th>{columns.map((col) => <th key={col.id}>{col.name}</th>)}</tr></thead><tbody>{materials.map((item) => <tr key={item.id} className={materialId === item.id ? 'active-row' : ''}><td><button className="table-material" onClick={() => { setMaterialId(item.id); document.querySelector('.lab-card')?.scrollIntoView({behavior:'smooth', block:'start'}); }}><span className="table-swatch" style={{background:item.color}}/><span><strong>{item.short}</strong><small>{item.name}</small></span></button></td>{ratings[item.id].map((rating, i) => <td key={columns[i].id}><span className={`rating rating-${rating}`}><i/>{columns[i].id === 'bio' ? biodegradationLabels[rating] : ratingLabels[rating]}</span></td>)}</tr>)}</tbody></table></div>
      <div className="legend"><span><i className="legend-dot high"/> Высокая устойчивость</span><span><i className="legend-dot medium"/> Средняя</span><span><i className="legend-dot low"/> Низкая</span><span><i className="legend-dot mixed"/> Зависит от условий</span></div>
      <p className="table-note"><Info size={14}/> Биоразложение — не растворение; оксо-фрагментация не гарантирует полного разложения. Для PHA и TPS нужны подходящие условия.</p>
    </section>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><Atom size={18}/></span><span>POLYMER<span className="brand-light">LAB</span></span></a><span>Учебная модель • Химические свойства полимеров</span><a href="#top">Наверх ↑</a></footer>
  </main>;
}

export default App;
