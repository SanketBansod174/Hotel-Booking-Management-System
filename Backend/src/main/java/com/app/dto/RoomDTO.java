package com.app.dto;

import java.time.LocalDate;

import com.app.entities.BaseEntity;
import com.app.entities.RoomType;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter

@Setter

@NoArgsConstructor
@ToString
public class RoomDTO extends BaseEntity {
	@JsonProperty("hotelId")
	private int hotelId;
	@JsonProperty("roomType")

	private RoomType roomType;
	@JsonProperty("roomNumber")

	private int roomNumber;
	@JsonProperty("description")

	private String description;
//	@JsonProperty("bookDate")

//	private LocalDate bookDate;
	

	private boolean available;
	

	private int maxGuest;
	
	private int prices;
	private String title;
}
