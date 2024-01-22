package com.services.items.exceptions;

public class NotFoundException extends CoreException {
    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, Object... arguments) {
        super(String.format(message, arguments));
    }
}
