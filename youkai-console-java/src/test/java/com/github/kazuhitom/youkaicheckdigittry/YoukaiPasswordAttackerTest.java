package com.github.kazuhitom.youkaicheckdigittry;

import com.github.kazuhitom.youkaicheckdigittry.checkdigit.YoukaiPasswordAttacker;
import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.A31F;
import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.AttackCharacters;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Disabled
class YoukaiPasswordAttackerTest {
    private final YoukaiPasswordAttacker sut = new YoukaiPasswordAttacker(true);

    @Test
    public void パスワード_KID_を突き止める事が出来る() {
        var targetCheckDigit = A31F.createFromHexStrings8("00", "51", "03", "3A", "E9", "08", "23", "07");
        var startPassword = AttackCharacters.initialize(3);

        var results = sut.execute(targetCheckDigit, startPassword);

        assertEquals(1, results.size());
        var actual = results.get(0).toString();
        assertEquals("KID", actual);
    }

    @Test
    public void パスワード_NAMCO_を突き止める事が出来る() {
        var targetCheckDigit = A31F.createFromHexStrings8("3B", "EA", "05", "6C", "D2", "0A", "D8", "08");
        var startPassword = AttackCharacters.initialize(5);

        var results = sut.execute(targetCheckDigit, startPassword);

        assertEquals(1, results.size());
        var actual = results.get(0).toString();
        assertEquals("NAMCO", actual);
    }

    @Test
    public void パスワード_KAWADA_を突き止める事が出来る() {
        var targetCheckDigit = A31F.createFromHexStrings8("54", "34", "06", "3C", "10", "0A", "9F", "08");
        var startPassword = AttackCharacters.initialize(6);

        var results = sut.execute(targetCheckDigit, startPassword);

        assertEquals(1, results.size());
        var actual = results.get(0).toString();
        assertEquals("KAWADA", actual);
    }

    @Test
    public void パスワード_NAUSICAA_をコンティニュー機能を使って突き止める事が出来る() {
        var targetCheckDigit = A31F.createFromHexStrings8("45", "D7", "08", "9F", "AD", "38", "92", "0B");
        var startPassword = new AttackCharacters(0, 0, 0, 0, 0, 16, 0, 0);

        var results = sut.execute(targetCheckDigit, startPassword);

        assertEquals(1, results.size());
        var actual = results.get(0).toString();
        assertEquals("NAUSICAA", actual);
    }
}