import * as assert from 'assert';
import getJsonPath, {
  propertyRequiresQuotes,
  getPropertyPathWithQuotes,
  nonQuotedCharacterRanges,
  Options,
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
    propertyRequiresQuotesTest('', true);
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
      let json = { [c]: 1 };
      test_json_path(json, 3, c, 1);
    }
  });

  test('getJsonPath test characters that require escaping', () => {
    for (let c of charactersWithEscapeRequired) {
      let json = { [c]: 1 };
      let expectedPath = `["${c}"]`;
      if (c === `"`) {
        expectedPath = `["\\""]`;
      }
      if (c === `\\`) {
        expectedPath = `["\\\\"]`;
      }
      test_json_path(json, 3, expectedPath, 1);
    }
  });

  test('getJsonPath test characters without escaping from allowed ranges', () => {
    for (let range of nonQuotedCharacterRanges) {
      for (
        let index = range.charCodeAt(0);
        index <= range.charCodeAt(2);
        index++
      ) {
        const c = String.fromCharCode(index);
        console.log(`Testing range '${range}' char: '${c}', index: ${index}`);

        let json = { [c]: 1 };
        if (c.toString().match(/^\d/)) {
          test_json_path(json, 3, `["${c}"]`, 1);
        } else {
          test_json_path(json, 3, c, 1);
        }
      }
    }
  });

  test('getJsonPath test specific use cases', () => {
    test_json_path({ '0165foo': 1 }, 3, `["0165foo"]`, 1);
    test_json_path({ foo115: 1 }, 3, `foo115`, 1);
    test_json_path({ '5454': 1 }, 3, `["5454"]`, 1);
  });

  test('getJsonPath test change quote type', () => {
    let json = { '+': 1 };
    test_json_path(json, 3, `['+']`, 1, { quote: 'Single' });
    test_json_path(json, 3, `["+"]`, 1, { quote: 'Double' });
  });

  function test_json_path(
    json: { [key: string]: any },
    keyOffset: number,
    expectedPath: string,
    expectPropertyValue: any,
    options?: Options,
  ) {
    const textJson = JSON.stringify(json);
    let jsonPath = getJsonPath(textJson, keyOffset, undefined, options);

    assert.strictEqual(jsonPath, expectedPath);

    if (jsonPath[0] !== '[') {
      jsonPath = '.' + jsonPath;
    }
    const actualPropertyValue = eval('json' + jsonPath);
    assert.strictEqual(actualPropertyValue, expectPropertyValue);
  }
});
