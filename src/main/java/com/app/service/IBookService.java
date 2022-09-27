package com.app.service;

import java.util.List;

import com.app.dto.BookingDTO;
import com.app.entities.Booking;
import com.app.entities.Payment;

public interface IBookService {

	List<Booking> getAllBookingDetails();
	String saveBookingDetails(BookingDTO book);
	Payment savePaymentDetails(Payment pay);
	 List<Payment> getAllPaymentDetails();
}