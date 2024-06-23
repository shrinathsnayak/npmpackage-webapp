const Conditional = ({ if: condition, children }: any) => {
  return condition && children;
};

export default Conditional;
