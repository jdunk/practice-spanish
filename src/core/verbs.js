import { verbs } from '../data/verbs';

let verbObjs;

export default function getVerbs() {
  if (verbObjs)
    return verbObjs;

  return verbObjs =
    Object.entries(verbs).map(([k, v]) => ({
      infinitive: k,
      english: v,
      suffix: k.substr(-2),
      stem: k.substring(0, k.length - 2),
    }))
  ;
}