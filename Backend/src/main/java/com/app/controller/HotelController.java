package com.app.controller;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.HotelDTO;
import com.app.dto.RoomDTO;
import com.app.entities.Hotel;
import com.app.service.IHotelService;
import com.app.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/hotel")
@CrossOrigin
@Validated
public class HotelController {

	@Autowired
	private IHotelService hotelService;
	@Autowired
	private ImageService imageService;

	public HotelController() {
		System.out.println("in ctor of " + getClass());
	}

	// Get all hotels details
	@GetMapping
	public ResponseEntity<?> listAllHotels() {
		System.out.println("in list hotel");
		List<HotelDTO> list = hotelService.getAllHotelDetails();
		if (list.isEmpty())
			return new ResponseEntity<>("Empty hotel List !!!!", HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	// add hotel details
	//@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public ResponseEntity<?> saveHotelDetails(@RequestParam(required = true, value = "file") MultipartFile imageFile,
			@RequestParam(required = true, value = "jsondata") String jsonhotel) throws IOException {
		ObjectMapper objectmap = new ObjectMapper();
		HotelDTO hotel = objectmap.readValue(jsonhotel, HotelDTO.class);
		hotel.setImagesPath(imageService.storeImage(imageFile));
		return new ResponseEntity<>(hotelService.saveHotelDetails(hotel), HttpStatus.CREATED);
	}

	// get particular hotel details
	@GetMapping("/{id}")
	public ResponseEntity<?> getHotelDetails(@PathVariable int id) {
		System.out.println("in get hotel " + id);
		HotelDTO hotel = hotelService.getHotelDetails(id);
		return ResponseEntity.ok(hotel);

	}

	// delete particular hotel details
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public String deleteHotel(@PathVariable int id) {
		System.out.println("in delete hotel " + id);

		return hotelService.deleteHotel(id);
	}

	// edit particular hotel details
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping
	public ResponseEntity<?> updateHotelDetail(@RequestParam(required = true, value = "jsondata") String jsonhotel,
			@RequestParam(value = "file") MultipartFile... imageFile) throws IOException {
		System.out.println("in update hotel details ");
		ObjectMapper objectmap = new ObjectMapper();
		HotelDTO hotel = objectmap.readValue(jsonhotel, HotelDTO.class);
		if(imageFile.length==0) {
			return ResponseEntity.ok(hotelService.updateHotelDetails(hotel));
		}else {
			hotel.setImagesPath(imageService.storeImage(imageFile[0]));
		}
		return ResponseEntity.ok(hotelService.updateHotelDetails(hotel));

	}

}
