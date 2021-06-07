/**
 * Execute:
 * $ npm run generate-data-pronoun-images
 *
 * Due to Jest's lack of support for require.context, and in order to avoid a
 * dependency on a proprietary webpack feature that lacks broad support, it is
 * necessary to import static string paths only (no variables allowed).
 *
 * The purpose of this script is to generate the js code necessary for said
 * import statements, specifically the contents of `src/data/pronoun-images.js`.
 */
function generateImportPronounImagesJs() {

  const piRoot = '../assets/img/pronouns/';
  const filenames = [
    'he.png',
    'i-female.png',
    'i-male.jfif',
    'she.png',
    'they-female.png',
    'they-mixed.png',
    'we-female.png',
    'we-mixed.png',
    'you-female.png',
    'you-formal-female.png',
    'you-formal-male.png',
    'you-male.png',
    'you-plural-female.png',
    'you-plural-mixed.jpg',
  ];

  let output = `${filenames.map(
    (filename, i) => `import img${(i + 1)} from '${piRoot}${filename}';`
  ).join('\n')}

const pronounImgData = [${filenames.map(
  (filename, i) => `
  {
    filename: \`${filename}\`,
    src: img${(i + 1)},
  }`).join(`,`)}
];

export default pronounImgData;
`;

  console.log(output)
}

generateImportPronounImagesJs();