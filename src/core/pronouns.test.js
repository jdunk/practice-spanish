import getPronouns from "./pronouns.js";

const pronouns = getPronouns();

describe("Pronoun data import sanity checks", () => {
  it("src is a non-empty string", () => {
    expect(typeof pronouns[0]?.src).toBe('string');
    expect(pronouns[0]?.src?.length > 3).toBe(true);
  });
});