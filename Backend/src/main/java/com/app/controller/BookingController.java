package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookingDTO;
import com.app.dto.UserDTO;
import com.app.entities.Booking;
import com.app.entities.Payment;
import com.app.entities.User;
import com.app.service.IBookService;
import com.app.service.IUserService;
import com.app.service.ImageService;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin
@Validated
public class BookingController {
	@Autowired
	private IBookService bookService;
	
	
	
   
	public BookingController() {
		System.out.println("in ctor of " + getClass());

	}

	// return all booking
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<?> listAllBooking() {
		System.out.println("in list Booking");
		List<Booking> list = bookService.getAllBookingDetails();
		if (list.isEmpty())
			return new ResponseEntity<>("Empty Book List !!!!", HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	// add Booking details
	@PostMapping
	public ResponseEntity<?> saveBookDetails(@RequestBody @Valid BookingDTO book) {
		System.out.println("in save Booking " + book);

		return new ResponseEntity<>(bookService.saveBookingDetails(book), HttpStatus.CREATED);
	}
	
//	// save payment details
//	@PostMapping("/payment")
//	public ResponseEntity<?> savePaymentDetails(@RequestBody  BookingDTO book) {
//		System.out.println("in save Booking " + book);
//
//		return new ResponseEntity<>(bookService.saveBookingDetails(book), HttpStatus.CREATED);
//	//	return new ResponseEntity<>(book, HttpStatus.CREATED);
//	}

}
