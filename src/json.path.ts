import * as jsonc from 'jsonc-parser';

export default function getJsonPath(jsonText: string, offsetPosition: number) {
  const location = jsonc.getLocation(jsonText, offsetPosition);
  const path: string = location.path.reduce(
    (
      accumulated: string,
      propertyName: jsonc.Segment,
      index: number,
    ): string => {
      const isFirst = index === 0;
      const propertyPath = getPropertyPath(propertyName, isFirst);
      if (!isFirst) {
        return accumulated + propertyPath;
      }
      return propertyPath;
    },
    '',
  );
  return path;
}

function getPropertyPath(
  propertyName: jsonc.Segment,
  isFirst: boolean,
): string {
  if (Number.isInteger(propertyName)) {
    return `[${propertyName}]`;
  }
  const requiresQuotes = propertyRequiresQuotes(propertyName);
  if (requiresQuotes) {
    return getPropertyPathWithQuotes(propertyName);
  }
  if (isFirst) {
    return propertyName.toString();
  }
  return '.' + propertyName;
}

export function getPropertyPathWithQuotes(propertyName: jsonc.Segment): string {
  const propertyNameJson = JSON.stringify(propertyName);
  return `[${propertyNameJson}]`;
}

export const nonQuotedCharacterRanges = ['A-Z', 'À-Ö', 'Ø-ö', 'ø-ÿ'];

export function propertyRequiresQuotes(propertyName: jsonc.Segment): boolean {
  // https://stackoverflow.com/questions/20690499/concrete-javascript-regular-expression-for-accented-characters-diacritics/26900132#26900132
  const allowedCharRanges = nonQuotedCharacterRanges.join('');
  const allowedCharactersWithoutEscaping = new RegExp(
    `^[${allowedCharRanges}_\$]+$`,
    'gi',
  );
  return !allowedCharactersWithoutEscaping.test(propertyName.toString());
}
