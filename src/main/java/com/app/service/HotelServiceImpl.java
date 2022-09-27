package com.app.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.HotelRepository;
import com.app.dto.HotelDTO;
import com.app.entities.Hotel;

@Service
@Transactional
public class HotelServiceImpl implements IHotelService {
	@Autowired
	private HotelRepository hotelRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private ImageService imageService;

	@Override
	public List<HotelDTO> getAllHotelDetails() {

		List<Hotel> list = hotelRepo.findAll();
		ArrayList<HotelDTO> UpdatedList = new ArrayList<HotelDTO>();
		for (Hotel hotel2 : list) {
			UpdatedList.add(getHotelDetails(hotel2.getId()));
		}

		return UpdatedList;
	}

	@Override
	public HotelDTO saveHotelDetails(HotelDTO hoteldto) {

		Hotel hotel = mapper.map(hoteldto, Hotel.class);

		Hotel persistanceHotel = hotelRepo.save(hotel);

		return mapper.map(persistanceHotel, HotelDTO.class);
	}

	@Override
	public HotelDTO getHotelDetails(int hotel) {

		Hotel persistanceHotel = hotelRepo.getReferenceById(hotel);
		HotelDTO hotel1 = mapper.map(persistanceHotel, HotelDTO.class);
		try {
			hotel1.setImages(imageService.restoreImage(hotel1.getImagesPath()));
		} catch (IOException e) {
			System.out.println("Image Not Found");
		}

		return hotel1;

	}

	@Override
	public String deleteHotel(int hotelId) {
		String mesg = "Deletion of hotel failed";

		if (hotelRepo.existsById(hotelId)) {
			hotelRepo.deleteById(hotelId);
			mesg = "hotel  deleted successfully";
		}

		return mesg;
	}

	@Override
	public HotelDTO updateHotelDetails(HotelDTO hoteldto) {
		Hotel hotel1 = mapper.map(hoteldto, Hotel.class);
		Hotel hotel2 = hotelRepo.getReferenceById(hotel1.getId());
		if (hotel2 != null) {
			imageService.deleteOnDifferent(hotel2.getImagesPath(), hotel1.getImagesPath());
			Hotel updatedHotel = hotelRepo.save(hotel1);
			return mapper.map(updatedHotel, HotelDTO.class);
		}
		return null;
	}

}
