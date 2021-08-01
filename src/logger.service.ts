import { window } from 'vscode';
import { EXTENTION_NAME } from './constants';

enum LoggerType {
  LOG = 'LOG',
  DEBUG = 'DEBUG',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class LoggerService {
  private outputChannel = window.createOutputChannel('Copy Json Path - Log');

  debug(message: string): void {
    this.execute(message, LoggerType.DEBUG);
  }

  log(message: string): void {
    this.execute(message, LoggerType.LOG);
  }

  warning(message: string): void {
    this.execute(message, LoggerType.ERROR);
  }

  error(message: string): void {
    this.execute(message, LoggerType.ERROR);
  }

  private execute(message: string, type: LoggerType): void {
    const now = new Date().toLocaleTimeString();
    this.outputChannel.appendLine(`[${type}] [${now}] - ${message}`);
  }
}
