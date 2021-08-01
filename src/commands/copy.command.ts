import { env, window, workspace } from 'vscode';
import { LoggerService } from '../logger.service';

export const COPY_NAME: string = 'copy';

export class Copy {
  constructor(private loggerService: LoggerService) {
    this.loggerService = loggerService;
  }

  private canExecuteCommand(): boolean {
    this.loggerService.log(JSON.stringify(window.activeTextEditor, null, 2));
    if (!window.activeTextEditor) {
      this.loggerService.error(
        'You must be in a json file to execute this command',
      );
      return false;
    }
    if (window.activeTextEditor.document.languageId !== 'json') {
      this.loggerService.error(
        'You must be in a json file to execute this command',
      );
      window.showErrorMessage(
        'You must be in a json file to execute this command',
      );
      return false;
    }
    return true;
  }

  private findPaths(object: any, key: string): string[] {
    return Object.keys(object).reduce((path: string[], k: string) => {
      let currentKey = Array.isArray(object) ? `[${k}]` : `${k}`;
      if (k === key) {
        path.push(currentKey);
      }
      if (object[k] && typeof object[k] === 'object') {
        path.push(
          ...this.findPaths(object[k], key).map(
            (p: string) => currentKey + (p[0] === '[' ? '' : '.') + p,
          ),
        );
      }
      return path;
    }, []);
  }

  register() {
    if (this.canExecuteCommand()) {
      const currentDoc = workspace.textDocuments.find(
        (textDocuments) =>
          textDocuments.fileName === window.activeTextEditor?.document.fileName,
      );
      const editor = window.activeTextEditor;
      if (currentDoc && !editor?.selection.isEmpty) {
        const fileObject = JSON.parse(currentDoc?.getText());
        const key = currentDoc?.getText(editor?.selection);

        const paths = this.findPaths(fileObject, key);

        env.clipboard
          .writeText(paths[0])
          .then(() => window.showInformationMessage('Copy'))
          .then(() => window.showErrorMessage('Fail to copy path'));
      }
    }
  }
}
