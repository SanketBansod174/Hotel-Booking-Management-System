package com.app.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.HotelRepository;
import com.app.dao.RoomImageRepository;
import com.app.dao.RoomRepository;
import com.app.dto.HotelDTO;
import com.app.dto.RoomAvailability;
import com.app.dto.RoomDTO;
import com.app.dto.RoomDTO2;
import com.app.entities.Hotel;
import com.app.entities.Room;
import com.app.entities.RoomImage;

@Service
@Transactional
public class RoomServiceImpl implements IRoomService {
	@Autowired
	private RoomRepository roomRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private HotelRepository hotelRepo;
	@Autowired
	private RoomImageRepository roomImageRepo;

	@Autowired
	private ImageService imageService;

	@Override
	public List<RoomDTO2> getAllRoomDetails() {
//	List<Room> list = roomRepo.findAll();
//		return list;
		List<RoomDTO2> list = roomRepo.findAll().stream().map(i -> mapper.map(i, RoomDTO2.class))
				.collect(Collectors.toList());
		return list;

	}

	@Override
	public Room saveRoomDetails(@Valid RoomDTO roomdto) {

		Room room = mapper.map(roomdto, Room.class);
		System.out.println(room);

		Hotel photel = hotelRepo.getReferenceById(roomdto.getHotelId());

		System.out.println(photel);
		room.setHotelId(photel);

//		room.setBookDate(LocalDate.now());
		System.out.println(room);
		Room persistanceRoom = roomRepo.save(room);

		return persistanceRoom;

	}

	@Override
	public Optional<Room> getRoomDetailsById(int roomId) {
		// Room persistanceRoom = roomRepo.getReferenceById(roomId);
		Optional<Room> room = roomRepo.findById(roomId);
		if (room.isPresent()) {
			return room;
		}

		return null;
	}

	@Override
	public String deleteRoom(int roomId) {
		String mesg = "Deletion of room failed";

		if (roomRepo.existsById(roomId)) {
			roomRepo.deleteById(roomId);
			mesg = "room  deleted successfully";
		}

		return mesg;
	}

	@Override
	public Room updateRoomDetails(Room roomdto) {
		//Room room = mapper.map(roomdto, Room.class);
//		Optional<Room> rooms = roomRepo.findById(room.getId());
//		if (rooms.isPresent()) {
//			Hotel photel = hotelRepo.getReferenceById(roomdto.getHotelId());
//			room.setHotelId(photel);
//			Room updatedRoom = roomRepo.save(room);
//
//			return updatedRoom;
//		}
		Room updatedRoom = roomRepo.save(roomdto);
		return updatedRoom;
	}

	@Override
	public List<RoomDTO2> getAllRoomByHotel(int hotelId) {
		Hotel photel = hotelRepo.getReferenceById(hotelId);
//		System.out.println("============>" + photel);
//		return roomRepo.findByHotelId(photel);

		List<RoomDTO2> list = roomRepo.findByHotelId(photel).stream().map(i -> mapper.map(i, RoomDTO2.class))
				.collect(Collectors.toList());
		return list;
	}

	@Override
	public String roomImages(int id, MultipartFile[] imageFile) {
		for (MultipartFile newFile : imageFile) {

			try {
				String path = imageService.storeImage(newFile);
				RoomImage ri = new RoomImage(id, path);
				roomImageRepo.save(ri);
			} catch (IOException e) {
				System.out.println("Failed to Store Image");
			}
		}

		return "Successfull";
	}

	@Override
	public List<RoomImage> getRoomImageByHotelId(int hotelid) {
		List<RoomImage> list = roomImageRepo.findByhotelId(hotelid);
		ArrayList<RoomImage> updatedList = new ArrayList<RoomImage>();
		for (RoomImage roomImage : list) {

			try {
				roomImage.setImage(imageService.restoreImage(roomImage.getImagePath()));
			} catch (IOException e) {
				System.out.println("Failed to load image");
			}
			updatedList.add(roomImage);

		}

		return updatedList;
	}

	@Override
	public Boolean checkRoomAvailability(RoomAvailability roomcheck) {

		boolean flag = roomRepo.checkRoomAvailability(roomcheck.getDateFrom(), roomcheck.getDateTo(),
				roomcheck.getHotelId(), roomcheck.getRoomId());

		System.out.println("=============" + flag);
		return flag;
	}

}
