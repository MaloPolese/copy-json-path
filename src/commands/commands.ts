import { commands, Disposable, window } from 'vscode';
import { EXTENTION_NAME } from '../constants';
import { LoggerService } from '../logger.service';
import { Copy } from './copy.command';

const setCmdName = (name: string): string => {
  return `${EXTENTION_NAME}.${name.toLowerCase()}`;
};

export const registerCommands = (): Disposable[] => {
  const loggerService = new LoggerService();

  return [
    commands.registerCommand('copy-json-path.copy', () =>
      new Copy(loggerService).register(),
    ),
  ];
};
