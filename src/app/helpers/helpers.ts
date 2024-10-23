export class entityHelper {
  static getClonedData(data: unknown) {
    return JSON.parse(JSON.stringify(data));
  }
}
