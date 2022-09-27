package com.app.dao;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import com.app.entities.Booking;

public interface BookRepository extends JpaRepository<Booking, Integer> {

	@Procedure("bookRoom")
	int bookingEntry(LocalDate dateFrom, LocalDate dateTo, int hotelId, int paymentId, int roomId, int userId);
}
