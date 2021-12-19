
export default class Serializer {
    /** シリアライズで復元する可能性のあるクラスのコンストラクタ。 */
    private readonly constructors: any[] = [];

    public cloningOf(source: any): any {
        return this.deserialize(this.serialize(source));
    }

    public serialize(target: any): string {
        this.addClassNameProperty(target);  // TODO 元のオブジェクトを上書きまくるのでなんとかしたい
        return JSON.stringify(target, null, 4);
    }

    public deserialize(json: string): any {
        const obj = JSON.parse(json);
        return this.toClassInstance(obj);
    }

    private addClassNameProperty(value: any): void {
        if (typeof value !== "object") return;
        if (Array.isArray(value)) {
            value.forEach(i => this.addClassNameProperty(i));
            return;
        }
        value.__CLASS_NAME = value.constructor.name;
        for (const key in value) {
            if (this.hasProperty(value, key)) {
                this.addClassNameProperty(value[key]);
            }
        }
    }

    private toClassInstance(value: any): any {
        if (typeof value !== "object") return value;
        if (Array.isArray(value)) return value.map(i => this.toClassInstance(i));
        if (!value.__CLASS_NAME) return value;
        if (value.__CLASS_NAME === "Object") return value;
        const obj = this.createInstanceOf(value.__CLASS_NAME);
        if (!obj) return obj;
        for (const key in value) {
            if (this.hasProperty(value, key)) {
                const inValue = value[key];
                obj[key] = this.toClassInstance(inValue);
            }
        }
        return obj;
    }

    private createInstanceOf(className: string): any {
        const FoundCons = this.constructors
            .find(cons => className === cons.name);
        if (!FoundCons) return null;
        return new FoundCons();
    }

    private hasProperty(value: any, key: string) {
        return !!(value) && Object.prototype.hasOwnProperty.call(value, key);
    }
}