import * as jsonc from 'jsonc-parser';
import { TextEditor } from 'vscode';

interface Options {
  includeFileName?: boolean;
  useBracketNotation?: boolean;
}

export default function getJsonPath(
  jsonText: string,
  offsetPosition: number,
  editor: TextEditor | undefined,
  options?: Options,
) {
  const location = jsonc.getLocation(jsonText, offsetPosition);

  const locationPath = location.path;
  if (options?.includeFileName) {
    includeTitle(locationPath, editor);
  }

  const path: string = locationPath.reduce(
    (
      accumulated: string,
      propertyName: jsonc.Segment,
      index: number,
    ): string => {
      const isFirst = index === 0;
      const propertyPath = getPropertyPath(propertyName, isFirst, options);
      if (!isFirst) {
        return accumulated + propertyPath;
      }
      return propertyPath;
    },
    '',
  );
  return path;
}

function includeTitle(path: jsonc.JSONPath, editor: TextEditor | undefined) {
  const fileName = editor?.document.fileName.split('/').pop()?.split('.')[0];

  if (fileName) {
    const a: jsonc.Segment = fileName;
    path.unshift(fileName);
  }
}

function getPropertyPath(
  propertyName: jsonc.Segment,
  isFirst: boolean,
  options?: Options,
): string {
  if (Number.isInteger(propertyName)) {
    return `[${propertyName}]`;
  }
  const requiresQuotes = propertyRequiresQuotes(propertyName);
  if (requiresQuotes || options?.useBracketNotation) {
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
