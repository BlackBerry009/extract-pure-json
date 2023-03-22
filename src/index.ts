const START_SIGN = '{';
const END_SIGN = '}';
const FORBIDDEN_SIGN = '[';

interface Options {
  retry?: number;
}

function extractPureJson(text: string, options?: Options): JSON | Boolean {
  let count = 0;
  const i = searchStartSign(text);
  let section = text.slice(i);
  while (section.lastIndexOf(END_SIGN) > 0) {
    const isJSON = checkIsJson(section);
    if (isJSON) {
      return JSON.parse(section);
    }
    section = section.slice(
      0,
      section.substring(0, section.length - 1).lastIndexOf(END_SIGN) + 1,
    );
    if (count === options?.retry) return false;
    count++;
  }
  return false;
}

function searchStartSign(text: string): number {
  const index = text.indexOf(START_SIGN);
  if (text[index - 1] !== FORBIDDEN_SIGN) {
    return index;
  } else {
    return searchStartSign(text.slice(index + 1));
  }
}

function checkIsJson(str: string): boolean {
  if (typeof str == 'string') {
    try {
      const result = JSON.parse(str);
      if (
        Object.prototype.toString.call(result) === '[object Object]' &&
        result
      ) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}

export default extractPureJson;
