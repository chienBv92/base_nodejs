/* eslint-disable  @typescript-eslint/no-explicit-any */

export default class AppError extends Error {
  public status: number;
  public message: string;
  public detail: Record<string, any> | Record<string, any>[];

  public constructor(
    status: number,
    message: string,
    detail: Record<string, any> | Record<string, any>[],
  ) {
    super(message);

    this.status = status;
    this.message = message;
    this.detail = detail;
  }
}
