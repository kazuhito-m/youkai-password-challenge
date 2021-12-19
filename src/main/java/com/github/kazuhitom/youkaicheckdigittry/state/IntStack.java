package com.github.kazuhitom.youkaicheckdigittry.state;

public class IntStack {
    private final int[] values = new int[1024];
    private int stackSize = 0;

    public void push(int value) {
        values[stackSize++] = value;
    }

    public int pop() {
        return values[--stackSize];
    }
}
