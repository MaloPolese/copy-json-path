import * as jsonc from 'jsonc-parser';

export default function getJsonPath(jsonText: string, offsetPosition: number) {
  const location = jsonc.getLocation(jsonText, offsetPosition);
  const path: string = location.path.reduce(
    (accumulated: string, propertyName: any, index: number): string => {
      var propertyPath = getPropertyPath(propertyName);
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

function getPropertyPath(propertyName: any): string {
  if (Number.isInteger(propertyName)) {
    return `[${propertyName}]`;
  }
  const requiresQuotes = propertyRequiresQuotes(propertyName);
  if (requiresQuotes) {
    return getPropertyPathWithQuotes(propertyName);
  }
  return '.' + propertyName;
}

export function getPropertyPathWithQuotes(propertyName: any): string {
  const propertyNameJson = JSON.stringify(propertyName);
  return `[${propertyNameJson}]`;
}

export function propertyRequiresQuotes(propertyName: any): boolean {
  // https://stackoverflow.com/questions/20690499/concrete-javascript-regular-expression-for-accented-characters-diacritics/26900132#26900132
  const allowedCharactersWithoutEscaping = /^[A-ZÀ-ÖØ-öø-ÿ_\$]+$/i;
  return !allowedCharactersWithoutEscaping.test(propertyName);
}
