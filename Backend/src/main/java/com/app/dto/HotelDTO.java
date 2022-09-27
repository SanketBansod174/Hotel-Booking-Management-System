package com.app.dto;

import com.app.entities.HotelType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class HotelDTO  {


//	@NotEmpty(message = "First name must be supplied")
//	@Length(min = 4, max = 30, message = "Invalid  Name length")

	private Integer id;
	private String hotelName;
	private String city;
    private String state;
    private String phoneNumber;
	private String email;
    private HotelType type;
    private String description;
    private String title;
	private String imagesPath;
	private Integer rating ;
	private Integer prices;
	private boolean available; 
	private byte[] images;
	
	
}
