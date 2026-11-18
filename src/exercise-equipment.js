// Stable values used by catalog, search filters and profile validation.
export const EQUIPMENT=Object.freeze({barbell:'Barbell',dumbbell:'Dumbbell',cable:'Cable',machine:'Machines (all)',bodyweight:'Bodyweight',smith:'Smith machine','plate-loaded':'Plate-loaded machine',selectorized:'Selectorized machine',kettlebell:'Kettlebell',band:'Resistance band','ez-bar':'EZ bar','trap-bar':'Trap bar','assisted-machine':'Assisted machine','weight-plate':'Weight plate'});
const machines=new Set(['machine','smith','plate-loaded','selectorized','assisted-machine']);
export const equipmentMatches=(actual,filter)=>!filter||actual===filter||filter==='machine'&&machines.has(actual);
export const equipmentAvailable=(exercise,selected)=>selected.some(type=>equipmentMatches(exercise.equipment,type));
