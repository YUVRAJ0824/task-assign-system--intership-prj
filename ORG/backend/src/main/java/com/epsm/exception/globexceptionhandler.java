package com.epsm.exception;

import com.epsm.dto.Apires;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

// 1. global exception handler - handles all application errors
@RestControllerAdvice
public class globexceptionhandler {

    // 2. custom not found exception
    public static class Notfoundexception extends RuntimeException {
        public Notfoundexception(String msg) {
            super(msg);
        }
    }

    // 3. handle 404 not found
    @ExceptionHandler(Notfoundexception.class)
    public ResponseEntity<Apires<Void>> handleNotFound(Notfoundexception ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Apires.err(ex.getMessage()));
    }

    // 4. handle validation errors (from @Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Apires<Map<String, String>>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError err : ex.getBindingResult().getFieldErrors()) {
            errors.put(err.getField(), err.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new Apires<>(false, "Validation failed", errors));
    }

    // 5. handle all unexpected server errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Apires<Void>> handleGeneral(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Apires.err("Server error: " + ex.getMessage()));
    }
}
