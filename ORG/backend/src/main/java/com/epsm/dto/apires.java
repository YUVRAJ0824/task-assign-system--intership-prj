package com.epsm.dto;

import java.time.LocalDateTime;

// 1. common api response wrapper for consistency
public class apires<T> {

    private boolean success;
    private String msg;
    private T data;
    private LocalDateTime time;

    public apires() {
        this.time = LocalDateTime.now();
    }

    public apires(boolean success, String msg, T data) {
        this.success = success;
        this.msg = msg;
        this.data = data;
        this.time = LocalDateTime.now();
    }

    // 2. static helpers for quick responses
    public static <T> apires<T> ok(String msg, T data) {
        return new apires<>(true, msg, data);
    }

    public static <T> apires<T> err(String msg) {
        return new apires<>(false, msg, null);
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
