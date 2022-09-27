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
public class RoomAvailability {

	private LocalDate dateFrom;
	private LocalDate dateTo;
	private int hotelId;
	private int roomId;

}
