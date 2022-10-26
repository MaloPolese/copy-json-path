import * as jsonc from 'jsonc-parser';

export default function getJsonPath(jsonText: string, offsetPosition: number) {
  const location = jsonc.getLocation(jsonText, offsetPosition);
  const path: string = location.path.reduce(
    (accumulated: string, propertyName: any, index: number): string => {
      var propertyPath = getJsonPathToProperty(propertyName);
      if (index !== 0) {
        return accumulated + propertyPath;
      } else {
        return propertyPath;
      }
    },
    '',
  );
  return path;
}

function getJsonPathToProperty(propertyName: any): string {
  if (Number.isInteger(propertyName)) {
    return `[${propertyName}]`;
  }
  const requiresQuotes = propertyRequiresQuotes(propertyName);
  if (requiresQuotes) {
    return escapePropertyPath(propertyName);
  }
  return '.' + propertyName;
}

export function escapePropertyPath(propertyName: any): string {
  const valEscaped = escapePropertyNameWithQuotes(propertyName);
  const valPropertyPath = `["${valEscaped}"]`;
  return valPropertyPath;
}

export function escapePropertyNameWithQuotes(propertyName: any): string {
  return propertyName.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

export function propertyRequiresQuotes(propertyName: any): boolean {
  // https://stackoverflow.com/questions/20690499/concrete-javascript-regular-expression-for-accented-characters-diacritics/26900132#26900132
  const allowedCharactersWithoutEscaping = /^[A-ZÀ-ÖØ-öø-ÿ_\$]+$/i;
  return !allowedCharactersWithoutEscaping.test(propertyName);
}
