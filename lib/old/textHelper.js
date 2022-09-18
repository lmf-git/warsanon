export default class TextHelper {

    static titlecase(word) {
        const result = word[0].toUpperCase() + word.slice(1);
        return result;
    }

}
  