export function createActionSet(ROOT){
  return (PREFIX, ...args) => args.reduce(
    (set, ACTION)=>({
      ...set,
      [ACTION]: `${ROOT}/${PREFIX}.${ACTION}`,

    }),{
      ROOT: `${ROOT}/${PREFIX}`,
    },
  )
}
