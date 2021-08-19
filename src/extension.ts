import * as vscode from 'vscode';
import { Disposable } from 'vscode';
import { registerCommands } from './commands/commands.index';

export function activate(context: vscode.ExtensionContext) {
  const disposables: Disposable[] = registerCommands();
  context.subscriptions.push(...disposables);
}

export function deactivate() {}
