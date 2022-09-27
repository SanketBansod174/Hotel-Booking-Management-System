package com.app;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.app.dao.BookRepository;
import com.app.dao.HotelRepository;
import com.app.dao.PaymentRepository;
import com.app.dao.RoomRepository;
import com.app.dao.UserRepository;
import com.app.dto.RoomDTO2;
import com.app.dto.UserDTO;
import com.app.entities.Booking;
import com.app.entities.Hotel;
import com.app.entities.Payment;
import com.app.entities.User;
import com.app.service.IUserService;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class HotelBooking1ApplicationTests {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private HotelRepository hotelRepo;

	@Autowired
	private RoomRepository roomRepo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private BookRepository bookRepo;

	@Autowired
	private PaymentRepository payRepo;

	@Autowired
	private IUserService userService;

	

	@Test
	@Order(1)
	public void testUserCreate() {
		UserDTO user = new UserDTO();
		user.setCity("tcity");
		user.setCountry("tcountry");
		user.setMail("tmail@gmail.com");
		user.setName("tname");
		user.setPassword("12345");
		user.setState("tstate");
		user.setPhoneNumber("9876543210");
		user.setZipcode(444602);
		UserDTO persistUser = userService.saveUserDetails(user);

		assertNotNull(userRepo.findByName("tname"));

	}

	@Test
	@Order(2)
	public void testReadSingleUser() {
		UserDTO user = userService.getUserDetails(4);
		assertEquals(444444, user.getZipcode());
	}

	@Test
	@Order(3)
	public void testUpdateUser() {
		UserDTO user = userService.getUserDetails(4);
		user.setZipcode(444444);
		userService.saveUserDetails(user);
		assertNotEquals(444604, userRepo.getById(4).getZipcode());
	}

	@Test
	@Order(4)
	public void testUserDelete() {
		userService.deleteUser(18);
		assertThat(userRepo.existsById(18)).isFalse();
		
	}
	
	
	@Test
	@Order(5)
	public void testReadAllUser() {
		List<User> list = userRepo.findAll();
		assertThat(list).size().isGreaterThan(0);
	}

	@Test
	@Order(6)
	public void testReadAllHotel() {
		List<Hotel> list = hotelRepo.findAll();
		assertThat(list).size().isGreaterThan(0);
	}

	@Test
	@Order(7)
	public void testReadAllRoom() {
		List<RoomDTO2> list = roomRepo.findAll().stream().map(i -> mapper.map(i, RoomDTO2.class))
				.collect(Collectors.toList());
		assertThat(list).size().isGreaterThan(0);
	}

	@Test
	@Order(8)
	public void testReadAllBooking() {
		List<Booking> list = bookRepo.findAll();
		assertThat(list).size().isGreaterThan(0);
	}

	@Test
	@Order(9)
	public void testReadAllPayment() {
		List<Payment> list = payRepo.findAll();
		assertThat(list).size().isGreaterThan(0);
	}

}
