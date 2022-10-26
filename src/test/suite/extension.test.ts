import * as assert from 'assert';
import getJsonPath, {
  propertyRequiresQuotes,
  escapePropertyPath,
  escapePropertyNameWithQuotes,
} from '../../json.path';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  const charactersWithoutEscaping = 'azAZ$_ñÑçÇáÁÀÖØöøÿ';
  const charactersWithEscapeRequired = ' *+%×÷<>^"\'.,~:@+!|¿?(){}[]/\\';

  test('propertyRequiresQuotes test characters without escaping', () => {
    for (let c of charactersWithoutEscaping) {
      propertyRequiresQuotesTest(c, false);
    }
  });

  test('propertyRequiresQuotes test characters that require escaping', () => {
    for (let c of charactersWithEscapeRequired) {
      propertyRequiresQuotesTest(`_${c}_`, true);
    }
  });

  function propertyRequiresQuotesTest(propertyName: string, expected: boolean) {
    const requiresQuotes = propertyRequiresQuotes(propertyName);
    assert.strictEqual(
      requiresQuotes,
      expected,
      `Property name "${propertyName}" expectation to be escaped: ${expected}.`,
    );
  }

  test('getJsonPath test characters without escaping', () => {
    for (let c of charactersWithoutEscaping) {
      test_getJsonPath(c, false);
    }
  });

  test('getJsonPath test characters that require escaping', () => {
    for (let c of charactersWithEscapeRequired) {
      test_getJsonPath(`_${c}_`, true);
    }
  });

  function test_getJsonPath(
    propertyName: string,
    expectQuoted: boolean,
    propertyValue: any = 1,
  ) {
    const propertyNameEscaped = escapePropertyPath(propertyName);
    const expectedPropertyPath = expectQuoted
      ? propertyNameEscaped
      : '.' + propertyName;
    test_getJsonPath_expected_path(
      propertyName,
      expectedPropertyPath,
      propertyValue,
    );
  }

  function test_getJsonPath_expected_path(
    propertyName: string,
    expectedPropertyPath: string,
    propertyValue: any = 1,
  ) {
    const jsonText = generateJson(propertyName, propertyValue);
    JSON.parse(jsonText);
    const propertyCharPosition = 3;
    test_getJsonPath_name(jsonText, propertyCharPosition, expectedPropertyPath);
    test_getJsonPath_value(jsonText, propertyCharPosition, propertyValue);
  }

  function generateJson(propertyName: string, propertyValue: any = 1) {
    var propertyNameEscaped = escapePropertyNameWithQuotes(propertyName);
    return `{ "${propertyNameEscaped}": ${propertyValue} }`;
  }

  function test_getJsonPath_name(
    jsonText: string,
    offsetPosition: number,
    expectedPropertyPath: any,
  ) {
    var jsonPath = getJsonPath(jsonText, offsetPosition);
    assert.strictEqual(
      jsonPath,
      expectedPropertyPath,
      `jsonPath: ${jsonPath} expected to be ${expectedPropertyPath} from json: ${offsetPosition} ${jsonText}`,
    );
  }

  function test_getJsonPath_value(
    jsonText: string,
    offsetPosition: number,
    expectedValue: any,
  ) {
    var jsonPath = getJsonPath(jsonText, offsetPosition);
    var parsedJson = JSON.parse(jsonText);
    const actualValue = eval('parsedJson' + jsonPath);
    assert.strictEqual(
      actualValue,
      expectedValue,
      `Value retrieved was '${actualValue}' instead of '${expectedValue}' in json ${offsetPosition} ${jsonText}.`,
    );
  }
});
