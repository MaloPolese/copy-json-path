<h1 align="center">Copy Json Path </h1>

<div align="center">

[![Super Linter](https://img.shields.io/github/actions/workflow/status/MaloPolese/copy-json-path/main.yml?branch=main)](https://github.com/MaloPolese/copy-json-path/tree/main)
[![Last Commit](https://img.shields.io/github/repo-size/MaloPolese/copy-json-path?style=flat-square&label=Repo&color=4F98CA)](https://github.com/MaloPolese/copy-json-path/tree/main)
[![Last Commit](https://img.shields.io/github/license/MaloPolese/copy-json-path?style=flat-square&logo=GNU&label=License)](https://github.com/MaloPolese/copy-json-path/tree/main)
[![GitHub Issues](https://img.shields.io/github/issues/MaloPolese/copy-json-path.svg?style=flat-square&label=Issues&color=FF70A7)](https://github.com/MaloPolese/copy-json-path/issues)
[![Last Commit](https://img.shields.io/github/last-commit/MaloPolese/copy-json-path.svg?style=flat-square&label=Last%20Commit&color=A06EE1)](https://github.com/MaloPolese/copy-json-path/tree/main)

[![GitHub Issues](https://img.shields.io/visual-studio-marketplace/stars/malo.copy-json-path?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=Malo.copy-json-path)
[![GitHub](https://img.shields.io/visual-studio-marketplace/v/malo.copy-json-path?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=Malo.copy-json-path&ssr=false#version-history)
[![GitHub](https://img.shields.io/visual-studio-marketplace/d/malo.copy-json-path)](https://marketplace.visualstudio.com/items?itemName=Malo.copy-json-path&ssr=false#review-details)

</div>

This extension allows you to copy and paste a jsonpath

# Install

1. Install extension from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Malo.copy-json-path) or [Open VSX Registry](https://open-vsx.org/extension/Malo/copy-json-path)
2. Enjoy

# Usage

1. Open a json file
2. Click on any key in the file
3. <kbd>Ctrl</kbd>+<kbd>Maj</kbd>+<kbd>p</kbd> write `Copy json path` and <kbd>Enter</kbd>

# Showcase

![Showcase 1](assets/showcase-1.gif 'How to copy')

# Configuration

## Bracket notation

If you want to use bracket notation instead of dot notation, you can set the `copy-json-path.bracketNotation` setting to `true`.

![Bracket notation setting](assets/settings-bracket-notation.png 'bracket notation')

## File name

If you want to add the file name at the beginning of the path, you can set the `copy-json-path.includeFileName` setting to `true`.

![File name setting](assets/settings-file-name.png 'file name')

## Quotes

When you use the bracket notation the key is surrounded by quotes. With the `copy-json-path.quote` setting you can choose the type of quotes to use `Single` or `Double`.
The default value is `Double`.

![Quote setting](assets/settings-quote.png 'Quote')

## Output

If you want to change the output format, you can change the `copy-json-path.output` setting.

![Output setting](assets/settings-output.png 'Output')

The default output is only the json path represented by the %PATH% variable.

For example, you can change it as follows:
![Output html](assets/settings-output-html.png 'Output html')

and the result in your clipboard will be :
`<TMPL_VAR NAME="path.to.key">`
