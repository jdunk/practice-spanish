import { verbConjugationGroupDefinitions } from './grammar';

const defaultPronounProperties = {
  nthPerson: null,
  plural: false,
  formal: false,
  allFemale: false,
};

const firstPersonIndicators = [
  'i',
  'me',
  'we',
  'us',
  '1st',
];

const secondPersonIndicators = [
  'you',
  '2nd',
];

const thirdPersonIndicators = [
  'he',
  'she',
  'they',
  'them',
  '3rd',
];

const allFemaleIndicators = [
  'she',
  'female',
];

const pluralityIndicators = [
  'plural',
  'they',
  'them',
  'we',
];

const formalityIndicators = [
  'formal',
  'usted',
  'sir',
  'm\'am',
  'ma\'am',
  'mam',
];

const pronounNameDefinitions = {
  'yo': pronoun => pronoun.conjugationGroup === '1ps',
  'tú': pronoun => pronoun.conjugationGroup === '2ps',
  'usted': pronoun => pronoun.conjugationGroup === '3ps' && pronoun.formal,
  'él': pronoun => pronoun.nthPerson === 3 && !pronoun.plural && !pronoun.allFemale,
  'ella': pronoun => pronoun.nthPerson === 3 && !pronoun.plural && pronoun.allFemale,
  'nosotros': pronoun => pronoun.conjugationGroup === '1pp' && !pronoun.allFemale,
  'nosotras': pronoun => pronoun.conjugationGroup === '1pp' && pronoun.allFemale,
  'ustedes': pronoun => pronoun.conjugationGroup === '3pp' && pronoun.nthPerson === 2,
  'ellos': pronoun => pronoun.nthPerson === 3 && pronoun.plural && !pronoun.allFemale,
  'ellas': pronoun => pronoun.nthPerson === 3 && pronoun.plural && pronoun.allFemale,
};

function importPronounImages() {
  const r = require.context('../assets/img/pronouns', false, /\.(png|jpe?g|svg|jfif)$/);

  return r.keys().map(
    filename => ({
      // Orig filename only:
      filename: filename.split('/').slice(-1)[0], // 'some/path/file-name.jpg' -> 'file-name.jpg'
      // Compiled public src filename:
      src: r(filename).default,
    })
  );
}

function getPronounsFromFilenames(objsWithFilenames) {
  return objsWithFilenames.map(obj => {
    // Parse filename, e.g. 'you-female-formal.jpg' -> ['you', 'female', 'formal']
    const pieces = obj.filename.split('.')[0].split('-');

    return {
      ...obj,
      ...defaultPronounProperties,
      ...(pieces.some(piece => firstPersonIndicators.includes(piece)) && {nthPerson: 1}),
      ...(pieces.some(piece => secondPersonIndicators.includes(piece)) && {nthPerson: 2}),
      ...(pieces.some(piece => thirdPersonIndicators.includes(piece)) && {nthPerson: 3}),
      ...(pieces.some(piece => allFemaleIndicators.includes(piece)) && {allFemale: true}),
      ...(pieces.some(piece => pluralityIndicators.includes(piece)) && {plural: true}),
      ...(pieces.some(piece => formalityIndicators.includes(piece)) && {formal: true}),
    };
  })
  .map(pronounObj => {
    let conjugationGroup;

    for (const [group, matchFn] of Object.entries(verbConjugationGroupDefinitions)) {
      if (matchFn(pronounObj)) {
        conjugationGroup = group;
        break;
      }
    }

    return {
      ...pronounObj,
      conjugationGroup,
    };
  })
  .map(pronounObj => {
    let pronounName;

    for (const [name, matchFn] of Object.entries(pronounNameDefinitions)) {
      if (matchFn(pronounObj)) {
        pronounName = name;
        break;
      }
    }

    return {
      ...pronounObj,
      pronounName,
    };
  });
}

let pronouns;

export default function getPronouns() {
  if (pronouns)
    return pronouns;

  return pronouns = getPronounsFromFilenames(importPronounImages());
}