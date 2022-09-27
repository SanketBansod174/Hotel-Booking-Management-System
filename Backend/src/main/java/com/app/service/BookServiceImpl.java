package com.app.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.BookRepository;
import com.app.dao.HotelRepository;
import com.app.dao.PaymentRepository;
import com.app.dao.RoomRepository;
import com.app.dao.UserRepository;
import com.app.dto.BookingDTO;
import com.app.entities.Booking;
import com.app.entities.Hotel;
import com.app.entities.Payment;
import com.app.entities.Room;
import com.app.entities.User;

@Service
@Transactional
public class BookServiceImpl implements IBookService {
	@Autowired
	private HotelRepository hotelRepo;
	@Autowired
	private ModelMapper mapper;

	@Autowired
	private BookRepository bookRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoomRepository roomRepo;

	@Autowired
	private PaymentRepository payRepo;

	@Autowired
	private IEmailService sendEmail;

	@Override
	public List<Booking> getAllBookingDetails() {

		return bookRepo.findAll();
	}

	@Override
	public List<Payment> getAllPaymentDetails() {

		return payRepo.findAll();
	}
	
	
	@Override
	public String saveBookingDetails(BookingDTO book) {
		Payment pay=new Payment();
		double amount=book.getTotal();
		pay.setAmount(book.getTotal());
		pay.setCardHolderName(book.getCardHolderName());
		pay.setCardNumber(book.getCardNumber());
		pay.setDate(LocalDate.now());
		pay.setPaymentType("Card");
		Payment persistPay=savePaymentDetails(pay);
		
		for (int roomNum : book.getRoomNumber()) {
			 bookRepo.bookingEntry(book.getDateForm(), book.getDateTo(), book.getHotelId(), persistPay.getId(),
					 roomNum, book.getUserId());
		}
		
		
		Hotel hotel=hotelRepo.getReferenceById(book.getHotelId());
		User puser = userRepo.getReferenceById(book.getUserId());
		if (amount > 0) {
			
			try {
				sendEmail.sendBillEmail(puser.getMail(), puser.getName(), amount,hotel,book);
			} catch (Exception e) {
				return "Failed to Send Email";
			}
			
			return "Successfully Booking Emailed Send ";
		}

		return "Booking Failed";
	}

	@Override
	public Payment savePaymentDetails(Payment pay) {

		return payRepo.save(pay);
	}

}
