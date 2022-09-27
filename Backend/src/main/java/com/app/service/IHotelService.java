package com.app.service;

import java.util.List;

import com.app.dto.HotelDTO;
import com.app.entities.Hotel;

public interface IHotelService {

	List<HotelDTO> getAllHotelDetails();
	HotelDTO saveHotelDetails(HotelDTO hotel);
	HotelDTO getHotelDetails(int hotel);
	String deleteHotel(int hotel);
	HotelDTO	updateHotelDetails(HotelDTO hotel);
	
	
}