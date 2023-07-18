type RandomFunction = () => number;

export const getNumber: RandomFunction = () => {
  return Math.random();
}