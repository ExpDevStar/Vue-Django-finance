//Method to generate array of options for b-form-select
function getTargets(rawTargets) {
  const targets = [{ value: null, text: '--Select item--'}, ]
  if (rawTargets) {
    if (rawTargets.every(object => {
      return 'name' in object
    })) {
          rawTargets.forEach((rawTarget) => {
            const target = {
              value: rawTarget.id,
              text: rawTarget.name
            }
            targets.push(target);
          })
        } else {
            rawTargets.forEach((rawTarget) => {
              const target = {
                value: rawTarget.id,
                text: `${rawTarget.title}, ${rawTarget.amount} ${rawTarget.currency}`
              }
              targets.push(target);
          })
      }
  }
  return targets;
}

export {
  getTargets,
};