import { env, window } from 'vscode';
import { LoggerService } from '../logger.service';
import getJsonPath from '../json.path';
import { Command } from '../decorators/command.decorator';

enum FileType {
  JSON = 'json',
  JSONC = 'jsonc',
}

@Command()
export class Copy {
  constructor(private loggerService: LoggerService) {
    this.loggerService = loggerService;
  }

  private canExecuteCommand(): boolean {
    const fileLanguage = window?.activeTextEditor?.document?.languageId;
    this.loggerService.debug(`File language: ${fileLanguage}`);

    const isJsonFile = Object.values(FileType).includes(
      fileLanguage as FileType,
    );

    if (!isJsonFile) {
      this.loggerService.error(
        'You must be in a json file to execute this command',
      );
    }

    return isJsonFile;
  }

  register() {
    if (!this.canExecuteCommand()) {
      return;
    }

    const editor = window.activeTextEditor;
    const text = editor?.document.getText();
    const offset = editor?.document.offsetAt(editor?.selection.start);

    if (offset && text) {
      const path: string = getJsonPath(text, offset);
      env.clipboard
        .writeText(path)
        .then(() => this.loggerService.log('Path copied'));
    } else {
      this.loggerService.error('Fail to copy path');
    }
  }
}
