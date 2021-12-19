export default class MessageBox {
    public prompt(message: string, defaultText: string, validation: (inputText: string) => boolean): string {
        let result = this.promptWithTrim(message, defaultText);
        if (!validation) return result;
        while (!validation(result)) {
            result = this.promptWithTrim(message, result);
        }
        return result;
    }

    public promptWith255Limit(message: string, defaultText: string, validation: (inputText: string) => boolean): string {
        return this.prompt(message, defaultText, (inputText) => {
            if (inputText.length > 255) {
                alert("255文字以内で入力してください。");
                return false;
            }
            return validation(inputText);
        });
    }

    private promptWithTrim(message: string, defaultText: string): string {
        const inputText = prompt(message, defaultText);
        const trimed = inputText ? inputText.trim() : "";
        return trimed;
    }
}