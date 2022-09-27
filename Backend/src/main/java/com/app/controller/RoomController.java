package com.app.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

import com.app.dto.RoomAvailability;
import com.app.dto.RoomDTO;
import com.app.dto.RoomDTO2;
import com.app.dto.UserDTO;
import com.app.entities.Room;
import com.app.entities.RoomImage;
import com.app.service.IRoomService;
import com.app.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/room")
@CrossOrigin
@Validated
public class RoomController {

	@Autowired
	private IRoomService roomService;

	public RoomController() {
		System.out.println("in ctor of " + getClass());
	}

	// Get all room details
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<?> listAllRooms() {
		System.out.println("in list room");
		List<RoomDTO2> list = roomService.getAllRoomDetails();
		if (list.isEmpty()) {
			return new ResponseEntity<>("Empty room List !!!!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(roomService.getAllRoomDetails(), HttpStatus.OK);
	}

	// add room details
//	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public ResponseEntity<?> saveRoomDetails(@RequestBody @Valid RoomDTO room) throws IOException {
		return new ResponseEntity<>(roomService.saveRoomDetails(room), HttpStatus.CREATED);
	}

	// get particular hotel details
	@GetMapping("/{id}")
	public ResponseEntity<?> getRoomDetails(@PathVariable int id) {
		Optional<Room> room = roomService.getRoomDetailsById(id);
		System.out.println(room);

		return ResponseEntity.ok(room);

	}

	// delete particular hotel details
//	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public String deleteRoom(@PathVariable int id) {
		System.out.println("in delete room " + id);
		return roomService.deleteRoom(id);
	}

	// edit particular room details
//	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping
	public ResponseEntity<?> updateRoomDetail(@RequestBody @Valid Room room) {
		System.out.println("in update room details ");
		return ResponseEntity.ok(roomService.updateRoomDetails(room));
	}

	// get all room by hotel
	@GetMapping("/hotel/{id}")
	public ResponseEntity<?> listAllRoomsByHotel(@PathVariable int id) {
		System.out.println("in list By Hotel room");
		List<RoomDTO2> list = roomService.getAllRoomByHotel(id);
		if (list.isEmpty()) {
			return new ResponseEntity<>("Empty room List !!!!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	// add room images details @RequestParam(required = true, value = "file")
	//@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/images/{hotelId}")
	public ResponseEntity<?> saveRoomImages(@PathVariable int hotelId, @RequestParam MultipartFile[] file)
			throws IOException {
		return new ResponseEntity<>(roomService.roomImages(hotelId, file), HttpStatus.CREATED);
	}

	// get particular hotel details
	@GetMapping("/images/{hotelId}")
	public ResponseEntity<?> getRoomImagesByHotelId(@PathVariable int hotelId) {
		List<RoomImage> list = roomService.getRoomImageByHotelId(hotelId);
		return ResponseEntity.ok(list);

	}

	@PostMapping("/check")
	public ResponseEntity<?> roomAvaibilitycheck(@RequestBody RoomAvailability roomcheck) {

		return ResponseEntity.ok(roomService.checkRoomAvailability(roomcheck));

	}

}
