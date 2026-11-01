package com.epsm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// standard api response
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Apires<T> {
    private boolean success;
    private String msg;
    private T data;
    private LocalDateTime time;

    // 1. success response
    public static <T> Apires<T> ok(String msg, T data) {
        return Apires.<T>builder()
                .success(true)
                .msg(msg)
                .data(data)
                .time(LocalDateTime.now())
                .build();
    }

    // 2. error response
    public static <T> Apires<T> err(String msg) {
        return Apires.<T>builder()
                .success(false)
                .msg(msg)
                .data(null)
                .time(LocalDateTime.now())
                .build();
    }
}
