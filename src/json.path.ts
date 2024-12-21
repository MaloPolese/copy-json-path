import * as jsonc from 'jsonc-parser';
import { TextEditor } from 'vscode';

enum QuoteType {
  Single = 'Single',
  Double = 'Double',
}

export interface Options {
  includeFileName?: boolean;
  useBracketNotation?: boolean;
  quote?: String;
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
    return getPropertyPathWithQuotes(propertyName, options);
  }
  if (isFirst) {
    return propertyName.toString();
  }
  return '.' + propertyName;
}

export function getPropertyPathWithQuotes(
  propertyName: jsonc.Segment,
  options?: Options,
): string {
  let propertyNameJson: String = JSON.stringify(propertyName);

  let escapeChar = '"';
  if (options?.quote === QuoteType.Single) {
    escapeChar = "'";
  } else if (options?.quote === QuoteType.Double) {
    escapeChar = '"';
  }

  propertyNameJson = propertyNameJson.replace(/^"|"$/g, escapeChar);

  return `[${propertyNameJson}]`;
}

export const nonQuotedCharacterRanges = ['A-Z', 'À-Ö', 'Ø-ö', 'ø-ÿ', '0-9'];

export function propertyRequiresQuotes(propertyName: jsonc.Segment): boolean {
  // If the property start with a numbrer we are forced to require quotes
  if (propertyName.toString().match(/^\d/)) {
    return true;
  }

  // https://stackoverflow.com/questions/20690499/concrete-javascript-regular-expression-for-accented-characters-diacritics/26900132#26900132
  const allowedCharRanges = nonQuotedCharacterRanges.join('');
  const allowedCharactersWithoutEscaping = new RegExp(
    `^[${allowedCharRanges}_\$]+$`,
    'gi',
  );
  return !allowedCharactersWithoutEscaping.test(propertyName.toString());
}
