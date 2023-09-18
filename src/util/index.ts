export class Util {
  public static objectToUint8Array(obj: object): Uint8Array {
    // Step 1: Serialize the object to a JSON string
    const jsonString = JSON.stringify(obj);
  
    // Step 2: Convert the JSON string to a Uint8Array (UTF-8 encoding)
    const encoder = new TextEncoder();
    return encoder.encode(jsonString);
  }

  public static getRandomZeroOrOne(): number {
    // Generate a random decimal number between 0 and 1
    const randomDecimal = Math.random();
  
    // Round the random decimal number to 0 or 1
    return Math.round(randomDecimal);
  }

  public static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}