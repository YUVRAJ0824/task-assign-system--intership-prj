package com.epsm.exception;

import com.epsm.dto.Apires;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

// global exception handler for all api errors
@RestControllerAdvice
public class globexceptionhandler {

    // 1. not found error class
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public static class Notfoundexception extends RuntimeException {
        public Notfoundexception(String msg) {
            super(msg);
        }
    }

    // 2. handle 404 not found
    @ExceptionHandler(Notfoundexception.class)
    public ResponseEntity<Apires<String>> handleNotFound(Notfoundexception ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Apires.err(ex.getMessage()));
    }

    // 3. handle 400 validation error
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Apires<Map<String, String>>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errs = new HashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            errs.put(fe.getField(), fe.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Apires.ok("Validation failed", errs));
    }

    // 4. handle 500 server error
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Apires<String>> handleAll(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Apires.err(ex.getMessage()));
    }
}
