export const getShuffledArrayIndices = (arrayLength) => {
  const indices = [...Array(arrayLength).keys()];

  for (let i = arrayLength - 1; i > 0; i--) {
    const randIndex = Math.floor(Math.random() * i);
    const temp = indices[randIndex];
    indices[randIndex] = indices[i];
    indices[i] = temp;
  }

  return indices;
};

export default getShuffledArrayIndices;