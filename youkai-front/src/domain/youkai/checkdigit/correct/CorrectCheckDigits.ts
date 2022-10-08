import CorrectCheckDigit from "./CorrectCheckDigit";
import CheckDigitCalculator from "@/domain/youkai/checkdigit/CheckDigitCalculator";
import A31F from "@/domain/youkai/checkdigit/state/A31F";
import Password from "~/domain/youkai/checkdigit/state/Password";

export default class CorrectCheckDigits {
    constructor(
        private readonly calculator: CheckDigitCalculator,
    ) { }

    public static readonly 無敵 = CorrectCheckDigits.of("534-030.565.81", "もう　これで　こわいもの　なんか　ありません", "無敵効果(体力ゼロで満タンにループ)を得られる14文字です。");

    private static readonly CORRECTS = [
        CorrectCheckDigits.of("SPEED-UP", "こまい かずひこ な がめんに なりました。", "リセット後、画面4分割&高速プレイできるものです。"),
        CorrectCheckDigits.of("OHAYOUKAWADA", "いつでも ３めんから すたーと します", "リセット後、3面からスタートできるものです。"),
        CorrectCheckDigits.of("UDADAGAWA", "いつでも ４めんから すたーと します", "リセット後、４面からスタートできるものです。"),
        CorrectCheckDigits.of("S.62.08.22", "いつでも ５めんから すたーと します", "リセット後、５面からスタートできるものです。"),
        CorrectCheckDigits.of("KOBAYASHI", "ぼくは みゅーじっくの ぷろぐらむを つくったのだ", "メッセージが出るのみです。"),
        CorrectCheckDigits.of("KAWADA", "このきょくは とっても くろうして つくりました", "メッセージが出るのみです。"),
        CorrectCheckDigits.of("PC-ENGINE", "ＭＡＤＥ　ＩＮ　ＪＡＰＡＮ", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("NEC", "(空文字)", "メッセージが出るだけ…なのだが、18文字の皮肉がリリース前に消されたらしい。"),
        CorrectCheckDigits.of("MIZUNO", "わたしの　きかくした　このげーむ　いかがですか？", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("6809", "ＰＬＥＡＳＥ　ＩＮＳＥＲＴ　６８０９　ＣＡＲＤ", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("MONITOR", "２Ｄ８８　５１　６２　０Ｅ　ＦＤ　３９　０３　ＣＢ　２６", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("YAMASHITA", "わたしは　かようきょくが　だいきらい", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("MICHIYO", "３めんが　くりあ　できないよー！", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("YAGI", "そこのかのじょ つうりんぐ いこうよー", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("YUKIHIKO", "ばいくを あんかで ゆずってください", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("KOMAI", "たっきゅう しようよー", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("KAZUHIKO", "えんちゃん みてるーっ", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("756-2311", "はい．なむこです", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("NAMCO", "げーむせんたーでも あそんでくださいね", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("NAMCOT", "なむこっと じょうほうきょく いつもきいてくれてるかな？", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("NAGAMATSU", "ぼくは でぃふぇんだーが すきなんだ", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("AKIRA", "えへ えへっ", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("NAUSICAA", "らぴゅたも はいっています さがしてください", "おそらくメッセージが出るだけです。('EXEUICAA'というパスでもOK)"),
        CorrectCheckDigits.of("LAPUTA", "ほうとうに あるとおもった？ あんたも ひまだねー", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("68000", "ＢＲＥＡＫ　ＡＷＡＹ　ＦＲＯＭ　ＴＨＥ　ＰＡＳＴ", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("6502", "６８０９なんかに まけませんよ", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("HAL", "ぼくは　ＦＣのＧＡＬＡＸＩＡＮも　つくりました。", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("KID", "ぼくの つくる ドラゴンスピリット かってね！", "おそらくメッセージが出るだけです。"),
        CorrectCheckDigits.of("KUMI.HANAOKA", "(空文字)", "おそらくリリース前に消されたメッセージ。"),
        CorrectCheckDigits.of("HARUHISA.UDAGAWA", "(空文字)", "おそらくリリース前に消されたメッセージ。"),
        CorrectCheckDigits.of("HENTAIOSUGI", "いつでも ２めんから すたーと します", "ステージ2へワープできる11文字です。"),
        CorrectCheckDigits.of("818-6104", "この ぷろぐらむの しつもんには おこたえできません", "効果が謎の8文字です。"),
        CorrectCheckDigits.無敵,
    ];

    public hitTest(checkDigit: A31F): boolean {
        const correct = this.pickUpCorrectDigitOf(checkDigit);
        return !correct.isEmpty();
    }

    public pickUpCorrectDigitOf(checkDigit: A31F): CorrectCheckDigit {
        for (const correct of CorrectCheckDigits.CORRECTS) {
            const correctDigit = this.calculator.calculate(correct.typicalPassowrd);
            if (correctDigit.equals(checkDigit)) return correct;
        }
        return CorrectCheckDigit.empty();
    }

    public static randomPickUpCorrectCheckDigit(): CorrectCheckDigit {
        const corrects = CorrectCheckDigits.CORRECTS;
        const randomIndex = Math.round(Math.random() * corrects.length);
        return corrects[randomIndex];
    }

    public static passwordMaxCharLength(): number {
        return CorrectCheckDigits.CORRECTS
            .map(cd => cd.typicalPassowrd.charLength())
            .reduce((left, right) => Math.max(left, right));
    }

    private static of(
        typicalPassowrdText: string,
        originalMessage: string,
        description: string

    ): CorrectCheckDigit {
        return new CorrectCheckDigit(
            Password.withText(typicalPassowrdText),
            originalMessage,
            description
        );
    }
}
