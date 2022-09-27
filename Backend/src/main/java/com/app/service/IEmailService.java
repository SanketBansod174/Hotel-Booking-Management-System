package com.app.service;

import com.app.dto.BookingDTO;
import com.app.entities.Hotel;

public interface IEmailService {

	
	String sendBillEmail(String emailer,String name,double amount,Hotel hotel,BookingDTO book);
	String sendOTPEmail(String emailer);
}