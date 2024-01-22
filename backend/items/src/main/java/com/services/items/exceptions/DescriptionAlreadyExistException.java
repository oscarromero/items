package com.services.items.exceptions;

public class DescriptionAlreadyExistException extends CoreException {
    public DescriptionAlreadyExistException() {
        super("Descripción ya existe.");
    }
}
