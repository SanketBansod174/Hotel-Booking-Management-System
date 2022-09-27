package com.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import com.app.entities.Hotel;
import com.app.entities.Room;

public interface RoomRepository extends JpaRepository<Room, Integer> {

	List<Room> findByHotelId(Hotel photel);

	@Procedure
	boolean checkRoomAvailability(LocalDate dateFrom, LocalDate dateTo, int hotelId, int roomId);

}
