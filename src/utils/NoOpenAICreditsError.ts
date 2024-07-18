export class NoOpenAICreditsError extends Error {
  // write an error message that will be displayed when the error is thrown
  constructor(message: string) {
    super(message);
    this.name = "NoOpenAICreditsError";
  }
}
