package com.epsm.dto;

import java.time.LocalDateTime;

// 1. api response wrapper - standard json structure
public class Apires<T> {
    private boolean success;
    private String msg;
    private T data;
    private LocalDateTime time = LocalDateTime.now();

    public Apires() {}

    public Apires(boolean success, String msg, T data) {
        this.success = success;
        this.msg = msg;
        this.data = data;
        this.time = LocalDateTime.now();
    }

    // 2. helper for success responses
    public static <T> Apires<T> ok(String msg, T data) {
        return new Apires<>(true, msg, data);
    }

    // 3. helper for error responses
    public static <T> Apires<T> err(String msg) {
        return new Apires<>(false, msg, null);
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMsg() { return msg; }
    public void setMsg(String msg) { this.msg = msg; }

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }

    public LocalDateTime getTime() { return time; }
    public void setTime(LocalDateTime time) { this.time = time; }
}
