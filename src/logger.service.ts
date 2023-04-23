import { window } from 'vscode';

enum LoggerType {
  LOG = 'LOG',
  DEBUG = 'DEBUG',
  WARN = 'WARN',
  ERROR = 'ERROR',
}
export class LoggerService {
  private outputChannel = window.createOutputChannel('Copy Json Path');

  debug(message: string): void {
    this.execute(message, LoggerType.DEBUG);
  }

  log(message: string): void {
    this.execute(message, LoggerType.LOG);
    window.showInformationMessage(message);
  }

  warning(message: string): void {
    this.execute(message, LoggerType.ERROR);
  }

  error(message: string): void {
    this.execute(message, LoggerType.ERROR);
    window.showErrorMessage(message);
  }

  private execute(message: string, type: LoggerType): void {
    const now = new Date().toLocaleTimeString();
    this.outputChannel.appendLine(`[${type}] [${now}] - ${message}`);
  }
}
