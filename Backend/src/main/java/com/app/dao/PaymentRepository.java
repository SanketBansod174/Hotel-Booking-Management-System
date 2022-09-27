package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Booking;
import com.app.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment,Integer> {

}
