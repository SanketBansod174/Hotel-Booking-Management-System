package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.RoomAvailability;
import com.app.dto.RoomDTO;
import com.app.dto.RoomDTO2;
import com.app.entities.Room;
import com.app.entities.RoomImage;

public interface IRoomService {

	List<RoomDTO2> getAllRoomDetails();

	Room saveRoomDetails(RoomDTO room);

	Optional<Room> getRoomDetailsById(int roomId);

	String deleteRoom(int roomId);

	Room updateRoomDetails(Room room);

	List<RoomDTO2> getAllRoomByHotel(int hotelId);
	
	String roomImages(int id,MultipartFile[] imageFile);
	
	List<RoomImage> getRoomImageByHotelId(int hotelid);
	
	Boolean checkRoomAvailability(RoomAvailability roomcheck);
}