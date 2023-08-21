package com.onlinefood.custom_exceptions;

public class JwtVerificationException extends RuntimeException {
	
	public JwtVerificationException(String message, Throwable cause) {
		super(message, cause);
	}
}
