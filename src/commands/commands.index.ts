import { commands, Disposable } from 'vscode';
import { LoggerService } from '../logger.service';
import { Copy } from './copy.command';

export const registerCommands = (): Disposable[] => {
  const loggerService = new LoggerService();

  return [
    commands.registerCommand(Copy.name, () =>
      new Copy(loggerService).register(),
    ),
  ];
};
