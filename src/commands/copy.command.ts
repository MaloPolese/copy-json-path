import { env, window } from 'vscode';
import { LoggerService } from '../logger.service';
import getJsonPath from '../json.path';
import { Command } from '../decorators/command.decorator';

enum FileType {
  JSON = 'json',
}

@Command()
export class Copy {
  constructor(private loggerService: LoggerService) {
    this.loggerService = loggerService;
  }

  private canExecuteCommand(): boolean {
    let canExecuteCommand = true;
    if (window?.activeTextEditor?.document.languageId !== FileType.JSON) {
      this.loggerService.error(
        'You must be in a json file to execute this command',
      );
      canExecuteCommand = false;
    }
    return canExecuteCommand;
  }

  register() {
    if (this.canExecuteCommand()) {
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
}
