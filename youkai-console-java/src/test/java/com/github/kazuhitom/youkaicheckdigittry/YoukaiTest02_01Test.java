package com.github.kazuhitom.youkaicheckdigittry;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class YoukaiTest02_01Test {
    @Test
    public void とりあえず動かせる() {
        YoukaiTest02_01.main(new String[]{"KID"});
    }

    @Test
    public void 単体でチェックディジットをチェックできる() {
        assertEquals("00 51 03 3A E9 08 23 07", YoukaiTest02_01.execute("KID"));
    }
}