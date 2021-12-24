package com.github.kazuhitom.youkai.console.checkdigit;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class TestData {
    public final String expect;
    public final String param;

    protected static List<TestData> load() throws IOException {
        var dataList = new ArrayList<TestData>();
        try (var is = TestData.class.getResourceAsStream("passAndCheckDigits.tsv");
             var isr = new InputStreamReader(is);
             var br = new BufferedReader(isr)) {
            String line;
            while ((line = br.readLine()) != null) {
                var values = line.split("\t");
                var data = new TestData(values[0], values[1]);
                dataList.add(data);
            }
        }
        return dataList;
    }

    private TestData(String expect, String actual) {
        this.expect = expect;
        this.param = actual;
    }
}
