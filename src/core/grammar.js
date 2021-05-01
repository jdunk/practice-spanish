export const verbConjugationGroups = [
  '1ps', // 1st person singular
  '2ps', // 2nd person singular
  '3ps', // 3rd person singular
  '1pp', // 1st person plural
  '3pp', // 3rd person plural
];

export const verbConjugationGroupDefinitions = {
  // Based on a given Pronoun's properties, as defined in data/pronouns.js
  '1ps': props => props.nthPerson === 1 && !props.plural,
  '1pp': props => props.nthPerson === 1 && props.plural,
  '2ps': props => props.nthPerson === 2 && !props.plural && !props.formal,
  '3ps': props =>
    (props.nthPerson === 3 && !props.plural) ||
    (props.nthPerson === 2 && !props.plural && props.formal)
  ,
  '3pp': props =>
    (props.nthPerson === 3 && props.plural) ||
    (props.nthPerson === 2 && props.plural)
};

export function conjugate(verb, pronoun, tense = 'present simple') {
  switch (pronoun.conjugationGroup) {
    case '1ps':
      return `${verb.stem}o`;

    case '2ps':
      switch (verb.suffix) {
        case 'ar':
          return `${verb.stem}as`
        default:
          return `${verb.stem}es`
      }

    case '3ps':
      switch (verb.suffix) {
        case 'ar':
          return `${verb.stem}a`
        default:
          return `${verb.stem}e`
      }

    case '1pp':
      switch (verb.suffix) {
        case 'ar':
          return `${verb.stem}amos`
        case 'er':
          return `${verb.stem}emos`
        case 'ir':
          return `${verb.stem}imos`
        default:
          return '???';
      }

    case '3pp':
      switch (verb.suffix) {
        case 'ar':
          return `${verb.stem}an`
        default:
          return `${verb.stem}en`
      }
  }

  return '?';
}