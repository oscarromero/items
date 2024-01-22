package com.services.items.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.services.items.exceptions.CoreException;
import com.services.items.exceptions.DescriptionAlreadyExistException;
import com.services.items.exceptions.NotFoundException;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerConfig {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> handleNotFoundException(CoreException exception) {
        return new ResponseEntity<>(ApiError.of(exception), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({
            DescriptionAlreadyExistException.class
    })
    public ResponseEntity<ApiError> handleResourceConflict(CoreException exception) {
        return new ResponseEntity<>(ApiError.of(exception), HttpStatus.CONFLICT);
    }

    @Value
    public static class ApiError {
        @JsonProperty("mensaje")
        String description;
        private ApiError(String description) {
            this.description = description;
        }

        static ApiError of(CoreException exception) {
            return new ApiError(exception.getMessage());
        }
    }

}
